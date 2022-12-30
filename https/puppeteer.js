const puppeteer = require('puppeteer')


url = "https://adv.martechlab.cn/dashboard";
 
(async (url) => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: false, // 默认是无头模式，这里为了示范所以使用正常模式
    })
 
    // 控制浏览器打开新标签页面
    const page = await browser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto(url)
 
    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
    let data = await page.evaluate(() => {
        let list = document.querySelectorAll('.s_position_list .item_con_list li')
        let res = []
        for (let i = 0; i < list.length; i++) {
            res.push({
                name: list[i].getAttribute('data-positionname'),
                company: list[i].getAttribute('data-company'),
                salary: list[i].getAttribute('data-salary'),
                require: list[i].querySelector('.li_b_l').childNodes[4].textContent.replace(/ |n/g, ''),
            })
        }
        return res
    })
    console.log(data)
})(url)