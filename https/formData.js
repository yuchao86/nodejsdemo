/**
 * curl -X POST \
 -H 'Access-Token: fad14af0004837c62aa5cb81c14f60c7' \
 -H 'Content-Type: multipart/form-data' \
 -F "advertiser_id=12495150" \
 -F "file=@C:\Users\1\Work\queue_server\test\111111.mp4" \
 -F "photo_tag=剧情" \
 -F "photo_name=IronMan.3227168" \
 -F "signature=272e42098fd30f4bdcbda5a1013d7c1b" \
 -L https://ad.e.kuaishou.com/rest/openapi/v2/file/ad/video/upload
 
 */

const axios = require('axios');
const FormData = require('form-data');
const path = require('path');
const fs = require('fs');

const form = new FormData();
form.append('advertiser_id', 12495150);
form.append('photo_tag', '剧情');
form.append('photo_name', '1111');
form.append('signature', '272e42098fd30f4bdcbda5a1013d7c1b');
form.append('file', fs.createReadStream(path.resolve(__dirname, '../www/111111.mp4')));
console.log("PATH=",path.resolve(__dirname, '../www/111111.mp4'));

console.log("FORM：",form);

axios({
    url: 'https://ad.e.kuaishou.com/rest/openapi/v2/file/ad/video/upload',
    method: 'POST',
    data: form,
    headers: {
        //...form.getHeaders(),
        'Access-Token': 'fad14af0004837c62aa5cb81c14f60c7',
        'Content-Type': 'multipart/form-data'
    }
}).then(
    res => {
        console.log('==>res', res.data)
    }).catch(
        err => {
            console.log('err', err)
        })
