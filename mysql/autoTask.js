const mysql = require('mysql')
var sd = require('silly-datetime');

//建立连接
const db = mysql.createPool({
    host: '192.168.10.3',
    user: 'root',
    password: '*****',
    database: '*-*',
})

//测试mysql模块
// db.query('select 1',(err,results) =>{
//     if(err) return console.log(err.message)
//     console.log(results)
// })

//应用 查询users表中所有数据
// const sqStr = 'select *from users'
// db.query(sqStr,(err,results)=>{
//     if (err) return err.message
//     //查询成功
//     console.log(results)
// })
function mockData() {
    function fackData() {
        var arr = [{
            type: "creative_list",
            name: "查询自定义创意列表",
            req_url: "https://ad.e.kuaishou.com/rest/openapi/v1/creative/list",
            url_md5: "010b7f303214509d5d4287e4c43c972b",
            req_method: "POST"
        }, {
            type: "account_budget_get",
            name: "账户日预算查询",
            req_url: "https://ad.e.kuaishou.com/rest/openapi/v1/advertiser/budget/get",
            url_md5: "e10adc3949ba59abbe56e057f20f883e",
            req_method: "GET"
        }, {
            type: "image_upload",
            name: "上传图片接口",
            req_url: "https://ad.e.kuaishou.com/rest/openapi/v1/file/ad/image/upload",
            url_md5: "14e1b600b1fd579f47433b88e8d85291",
            req_method: "POST"
        },]
        var num = randomNum(0, arr.length - 1);
        return arr[num];
    }


    //生成从minNum到maxNum的随机数
    function randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }

    var specl = fackData();
    //向ad_tasks表中新增一条数据
    const ad_tasks = {
        create_at: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        req_daliytop: '100',
        req_totallimit: '8000',
        req_ratelimit: '500',
        req_timeout: '60000',
        req_data: '{"advertiser_id": 12495150}',
        req_data_type: 'JSON',
        req_token_expires_time: '1661327570',
        req_header: '{"Access-Token": "b7261f1b895a1627f88cc71e8fd4a49f", "Content-Type": "application/json"}',
        req_method: specl.req_method,
        req_md5: specl.url_md5,
        req_url: specl.req_url,
        req_priority: '5',
        name: specl.name,
        type: specl.type,
        status: '0',
        advertiser_id: '12495150',
        media_id: '2',
        task_id: ''
    }
    //定义待执行sql语句
    const sqlStr = 'insert into tasks (created_at,req_daliytop,req_totallimit,req_ratelimit,req_timeout,req_data,req_data_type,'
        + 'req_token_expires_time,req_header,req_method,url_md5,req_url,req_priority,type,name,status,advertiser_id,media_id,id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    //执行sql语句
    db.query(sqlStr, [
        ad_tasks.create_at,
        ad_tasks.req_daliytop,
        ad_tasks.req_totallimit,
        ad_tasks.req_ratelimit,
        ad_tasks.req_timeout,
        ad_tasks.req_data,
        ad_tasks.req_data_type,
        ad_tasks.req_token_expires_time,
        ad_tasks.req_header,
        ad_tasks.req_method,
        ad_tasks.req_md5,
        ad_tasks.req_url,
        ad_tasks.req_priority,
        ad_tasks.type,
        ad_tasks.name,
        ad_tasks.status,
        ad_tasks.advertiser_id,
        ad_tasks.media_id,
        ad_tasks.task_id], (err, results) => {
            //执行失败
            if (err) return err.message
            //如果执行insert into 插入语句，则results是一个对象
            //可以通过affectedRows 属性，来判断是否插入数据成功
            if (results.affectedRows === 1) {
                return console.log("succ ")
            }
        });
}

    setInterval(mockData,5000);
    console.log("mock Data:");
// const user= {username:'李七',password:'123'}
// //定义待执行sql语句
// const sqlStr = 'insert into users set ?'
// //执行sql语句
// db.query(sqlStr,user,(err,results)=>{
//     //执行失败
//     if(err) return console.log(err.message)
//     //如果执行insert into 插入语句，则results是一个对象
//     //可以通过affectedRows 属性，来判断是否插入数据成功
//     if(results.affectedRows ===1) return console.log(" 插入成功 ")
// })

// //更新数据
// const user = {id:6,username :'xxs',password:'1234'}
// const sqlStr = 'update users set username=?,password=? where id=6'

// //执行sql语句
// db.query(sqlStr,[ad_tasks.username,ad_tasks.password,ad_tasks.id],(err,results)=>{
//     if(err) return console.log(err.message)
//     if(results.affectedRows ===1) return console.log('更新成功')
// })

// 简单更新数据
// const user = {id:6,username :'xxss',password:'123'}
// const sqlStr = 'update users set ? where id=?'

// //执行sql语句
// db.query(sqlStr,[user,ad_tasks.id],(err,results)=>{
//     if(err) return console.log(err.message)
//     if(results.affectedRows ===1) return console.log('更新成功')
// })


//删除操作
//要执行的sql
// const sqlStr = 'DELETE FROM users where id=?'
// //调用db.query()执行sql语句的同时，为占位符指定具体的值
// //注意如果sql语句中有多个占位符，则必须使用数组为每个占位符制定具体的值
// //如果sql语句只有一个占位符，则可以省略数组
// db.query(sqlStr,4,(err,results)=>{
//     if(err) return console.log(err.message)
//     if(results.affectedRows ===1) return console.log("删除成功")

// })

// //标记删除
// const sqlStr = 'update users set status=? where id=?'
// db.query(sqlStr,[1,5],(err,results)=>{
//     if(err) return console.log(err.message)
//     if(results.affectedRows ===1) return console.log("删除成功")
// })