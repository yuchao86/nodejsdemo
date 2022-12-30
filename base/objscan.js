const goldboxFishConfig = {
    '1001': {
      id: 1001,
    },
    '1002': {
      id: 1002,
    },
    '1003': {
      id: 1003,
    },
    '2001': {
      id: 2001,
    }
  };

 var goldFishArray = [];
  
  for(let key in goldboxFishConfig){
      console.log(key);
      console.log(goldboxFishConfig[key]);
      var goldboxCount = goldboxFishConfig[key].sceneCount;
      console.log("----",goldboxCount);
      for(var i = 0;i<goldboxCount;i++){
        var goldFish = {};
          goldFish['id'] = getNumberUniqid();
          goldFish['excelId'] = key;
          goldFish['name'] = goldboxFishConfig[key].name;
          goldFish['score'] = goldboxFishConfig[key].score;
          goldFishArray.push(goldFish);
      }
      
  }
  console.log("goldFish::",goldFishArray);
  
  let random = Math.floor(Math.random() * (goldFishArray.length))
  console.log("ssss",random);
            console.log("tempSceneArr:",goldFishArray[random]);

/**
* 获取一个唯一的不重复的数字
*/
function getNumberUniqid(precision=1000){
    const rawPre = (Date.now() - new Date(1672036924000).getTime()) / precision;
    const preNumber = Number(rawPre.toFixed()) * precision;
    const randam = Math.floor(Math.random() * precision);
    return preNumber + randam;
}

