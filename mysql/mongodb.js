var MongoClient = require('mongodb').MongoClient;
const ExcelJS = require('exceljs');

var url = "mongodb://****:27017/***";

(async () => {
    let videoList = new Array();

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(__dirname + "/../excel/video.xlsx");

    const sheet = workbook.worksheets[0];

    console.log(sheet.rowCount)

    sheet.eachRow(function (row, rowNumber) {

        // console.log(row.values.length)

        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));

        let video = { setId: row.values[1], videoId: row.values[2], name: row.values[3],
            designer: row.values[4], designerId: row.values[5], coverImageUrl: row.values[6],
            createTime: row.values[7], videoUrl: row.values[8], projectInfo: row.values[9],
            cost: row.values[10], impression: row.values[11], click: row.values[12],
            ctr: row.values[13], cpm: row.values[14], cpc: row.values[15],
            play3sRate: row.values[16], playEndRate: row.values[17], width: row.values[18],
            height: row.values[19], videoSize: row.values[20], dirName: row.values[21],
            status: '0'
         };
        videoList.push(video);

    });
    console.log('shift1',videoList.shift())
    console.log('shift2',videoList.shift())



    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db("intelligent_adsense");
        // dbase.createCollection('videoSync', function (err, res) {
        //     if (err) throw err;
        //     console.log("创建集合!");
        //     db.close();
        // });
        
        dbase.collection("videoSync").insertMany(videoList, function(err, res) {
            if (err) throw err;
            console.log("插入的文档数量为: " + res.insertedCount);
            db.close();
        });
    });

})();

