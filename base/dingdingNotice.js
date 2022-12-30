'use strict';

const DingTalk = require("dingtalk-robot-sdk")


const dingtalk = new DingTalk({
    accessToken: '**',
    secret: '**',
});


// 钉小蜜的webhook
let message = '这是一条测试信息, 忽略报警信息';
let phone = '138*******';

async function testDingding(type,message,phone) {

    const Text = DingTalk.Text;
    const text = new Text(message);
    text.atPhone(phone)
    dingtalk.send(text);

    

    // const ActionCard = Robot.ActionCard;
    // const actionCard = new ActionCard();

    // actionCard.setTitle("乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身")
    // .setText(`![screenshot](@lADOpwk3K80C0M0FoA)
    // ### 乔布斯 20 年前想打造的苹果咖啡厅
    // Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`)
    // .setHideAvatar(1).setBtnOrientation(1)
    // .setSingleTitle("阅读全文")
    // .setSingleURL("https://www.dingtalk.com/");

    // robot.send(actionCard);


    // const ActionCard = Robot.ActionCard;
    // const actionCard = new ActionCard();
    // actionCard.setTitle("乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身")
    // .setText(`![screenshot](@lADOpwk3K80C0M0FoA)
    // ### 乔布斯 20 年前想打造的苹果咖啡厅
    // Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`)
    // .setHideAvatar(1).setBtnOrientation(1)
    // .setBtns([
    //     {
    //     "title": "内容不错",
    //     "actionURL": "https://www.dingtalk.com/"
    //     },
    //     {
    //     "title": "不感兴趣",
    //     "actionURL": "https://www.dingtalk.com/"
    //     }
    // ]);
    // robot.send(actionCard);
    

    // const FeedCard = Robot.FeedCard;

    // const feedCard = new FeedCard([{
    // "title": "时代的火车向前开",
    // "messageURL": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
    // "picURL": "https://www.dingtalk.com/"
    // },
    // {
    //     "title": "时代的火车向前开2",
    //     "messageURL": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
    //     "picURL": "https://www.dingtalk.com/"
    // }]);

    // robot.send(feedCard);

    

};

testDingding(apiHooks,message,phone);