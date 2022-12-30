
const schedule = require('node-schedule');

const scheduleCronstyle = () => {
    schedule.scheduleJob('10 * * * * *', () => {
        console.log('schedule cron style ：' + new Date());
    });
}
scheduleCronstyle();