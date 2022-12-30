const fs = require('fs');
const axios = require('axios');
const utils = require('./utils');
const config = require('config');
const env = process.env.NODE_ENV || 'test';
let consulToken = "ojbkkkkkkkkkkkkkkkkkkkkkkkkkk"


const register = async (body) => {
    const url = `${initConsulUrl()}/v1/agent/service/register`;
    console.log(`register into consul ${url}`);
    await axios.put(url, body,{headers:{"X-Consul-Token":consulToken}});
};
const checkRegister = async(ip,port,env,name)=>{
    const url = `${initConsulUrl()}/v1/health/service/${env}-${name}?dc=${dc}`;
    const res = await axios.get(url,{headers:{"X-Consul-Token":consulToken}});
    if(res.data.length>0){
        for(let item of res.data){
            if(item.Service.Address == ip && item.Service.Port == port){
                return true;
            }
        }
    }
    return false;
}
const getValue = async (key) => {
    const url = `${initConsulUrl()}/v1/kv/${key}?raw`;
    const res = await axios.get(url,{headers:{"X-Consul-Token":consulToken}});
    return res.data;
};

const convertConfig = async (template = {}, prefix = '') => {
    const ret = {};
    for (const key of Object.keys(template)) {
        if (typeof template[key] === 'object') {
            // 嵌套的配置
            console.log(`${prefix}--${key}`);
            ret[key] = await convertConfig(template[key], `${prefix}  `);
        } else if (typeof template[key] === 'string') {
            // 字符串直接获取配置
            ret[key] = await getValue(`yuejuan/${env}/${template[key].replace(/\./g, '/')}`);
            console.log(`${prefix}--${key}: ${ret[key]}`);
        }
    }
    return ret;
};

module.exports = {
    /**
     * 服务注册
     * @param {string} name - 服务名
     * @param {string} checkUrl - 健康检查的链接
     */
    async register(name, port) {
        try {
            if(env == 'production' && parseInt(port)<9500){
                return;
            }
            let config = require('config');
            let registerInterval = config.registerInterval || 60000;
            console.log(registerInterval);
            const ip = utils.getIpAddress() || '';
            const body = {
                name: `${env}-${name}`,
                ID: `${name}_${ip}_${port}_0`,
                Tags: [
                    env,
                    name,
                ],
                Address: ip,
                port: Number(port),
                check: {
                    Name: name,
                    DeregisterCriticalServiceAfter: '10s',
                    HTTP: `http://${ip}:${port}/healthCheck`,
                    Method: 'GET',
                    Interval: '3s',
                    Timeout: '3s',
                },
            };
            await register(body);
            console.log('consul register service success');
            setInterval(async ()=>{
                let result = await checkRegister(ip,port,env,name);
                if(!result){
                    console.log(result);
                    await register(body);
                }
            },registerInterval);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to register service');
        }
    },

    /**
     * 获取服务的配置
     * @param {string} key - 配置模板的 key
     */
    async getConfig(key) {
        try {
            console.log('----- convert config -----');
            const configTemplate = await getValue(key);
            const ret = await convertConfig(configTemplate);
            fs.writeFileSync('./config/index.json', JSON.stringify(ret, null, 2));
            config.util.extendDeep(config, ret);
            console.log('###################################');
            console.log('## get consul config successfully ###');
            console.log('###################################');
        } catch (e) {
            console.error(e);
            try {
                fs.accessSync('./config/index.json');
                const ret = JSON.parse(fs.readFileSync('./config/index.json'));
                config.util.extendDeep(config, ret);
                console.log('Read local config file successfully');
            } catch (err) {
                // 文件不存在报无法读取配置文件
                console.error(e);
                throw new Error('Failed to get the configuration template');
            }
        }
    }
};