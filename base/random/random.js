
const fs = require('fs');

let data = "";
for (let i = 0; i < 1000000; i++) {
	if (i % 1000 === 0) {
		console.log("fishKillNum:", i);
	}
	
    let rand = Math.random();

	data += rand;
	data += '\r\n';
}

let date = new Date();
let datestr = ''+date.getHours()+date.getMinutes();
fs.writeFile('randomData-'+datestr+'.csv', data, function(err){
	if (err) {
		console.log(err);
	} else {
		console.log("finished");
	}
});


