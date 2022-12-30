// await page.evaluate(async () => {
//     Object.defineProperty(navigator, 'webdriver', { get: () => false })
//   })
var puppeteer = require('puppeteer');

  const action = (async () => {
    // 定义浏览器无头模式、分辨率以及关闭沙盒模式等等。
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1300,
            height: 900
        },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    // 新建页面
    var page = await browser.newPage();
    
    // 设定浏览器UserAgent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    // 跳转淘宝登录页
    await page.goto('https://login.taobao.com/member/login.jhtml?redirectURL=https%3A%2F%2Fwww.taobao.com%2F');
    // 这一步十分重要，因为大部分大型网站都会对selenium机制进行检测，例如navigator.webdriver，navigator.languages等等。
    // 这一步就是把navigator的一些属性方法等等注入到浏览器中，绕过这些检测机制。
    await page.evaluate(async () => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false })
    })
    // 等待登录按钮加载完毕
    await page.$('.password-login');
    // 自动输入账号，间隔频率随机数300毫秒内
    await page.type('input[id=fm-login-id]', 'cyberexp', { delay: (parseInt(Math.random() * 300)) });
    // 自动输入密码，间隔频率随机数300毫秒内
    await page.type('input[id=fm-login-password]', '***', { delay: (parseInt(Math.random() * 300)) })
    // 点击登录按钮
    await page.click('.password-login');

    console.log('登录成功！')

    // 获取cookies
    // cookies = await page.evaluate(() => document.cookie);
    // console.log(cookies);

    // 等待页面加载完毕
    await page.waitForNavigation()

    // 搜索关键字
    var keyName = '连衣裙';
    // 等待输入框加载完毕
    await page.$('#q');
    // 输入关键字
    await page.type('input[id=q]', keyName, { delay: 300 });
    // 点击搜索按钮
    await page.click('.btn-search');

    // 等待5秒后进入采集方法
    await page.waitFor(5000);

    console.log('采集开始...');
    gather(page);
})();

const gather = async (page) => {
    await page.waitFor(5000);

    // 等待下一页的按钮
    var nextBtn = await page.waitForSelector('#mainsrp-pager .next:not(.next-disabled)');

    // 数据对象
    console.log(`进行第${nowPage}页数据采集...`)
    // 执行JS方法，将获取到的结果返回
    var content = await page.evaluate(() => {
        // 这里的:not(.item-ad)是指不需要推广的商品，如果需要则直接去掉即可。
        var itemList = document.querySelectorAll('#mainsrp-itemlist .J_MouserOnverReq:not(.item-ad)');
        var dataList = [];
        for (var i = 0; i < itemList.length; i++) {
            var data = {};
            var item = itemList[i];
            // 商品名称
            data.name = item.querySelector('.title .J_ClickStat').innerText;
            // 价格
            data.price = item.querySelector('.price strong').innerText;
            // 地区
            data.area = item.querySelector('.location').innerText;
            // 店铺名称
            data.shopName = item.querySelector('.shopname').innerText;
            // 月销量
            data.sellerMonth = item.querySelector('.deal-cnt').innerText || 0;
            if (data.sellerMonth) {
                data.sellerMonth = data.sellerMonth.replace('人付款', '');
            }
            dataList.push(data);
        }
        return dataList;
    });
    console.log(`采集到${content.length}条数据！`);
    content.map(item => {
        // 这里本应是数据库操作，但是篇幅有限就直接写在日志里。
        logger.debug(JSON.stringify(item));
        resultList.push(item);
    })
    // 判断页码是否小于定义的采集最大页码，并且存在下一页按钮。
    if (nowPage < maxPage && nextBtn) {
        nowPage++;
        page.click('#mainsrp-pager .next');
        gather(page);
    }
    else {
        console.log(`采集完毕，一共采集${maxPage}页，${resultList.length}条数据！`);
    }
}