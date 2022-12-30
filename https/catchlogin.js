const puppeteer = require("puppeteer");

async autoLogin =(url)=>{
     const browser = await puppeteer.launch();
     const page =await browser.newPage();
     await page.goto(url);
     await page.waitForNavigation();

     //登录
     await page.type('#username',"用户提供的用户名");
     await page.type('#password','用户提供的密码');

     await page.click('#btn_login');

    //页面登录成功后，需要保证redirect 跳转到请求的页面
     await page.waitForNavigation();

     return await page.content();
}