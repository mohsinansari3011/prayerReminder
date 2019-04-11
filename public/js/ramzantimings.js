
let ramzanCalender = [];
let prayersTiming = [];

let currentcity = localStorage.getItem("currentcity");
if (!currentcity){
    currentcity = "Karachi";
    localStorage.setItem("currentcity", currentcity);
    
}

//console.log(currentcity);
// fetch(`http://api.aladhan.com/v1/timingsByCity?city=${currentcity}&country=Pakistan&method=8`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (myJson) {
//         //console.log(JSON.stringify(myJson));
//         // console.log(myJson);
//         // console.log(myJson.data.date.gregorian.weekday.en);
//         var cal_today = {
//             ramzan: myJson.data.date.hijri.date.substring(0, 2) + ' ' + myJson.data.date.hijri.month.en + ' ' + myJson.data.date.hijri.date.substring(6),
//             date: myJson.data.date.gregorian.date.substring(0, 2) + ' ' + myJson.data.date.gregorian.month.en + ' ' + myJson.data.date.gregorian.date.substring(6) ,
//             day: myJson.data.date.gregorian.weekday.en,
//             sehri: myJson.data.timings.Fajr,
//             aftari: myJson.data.timings.Maghrib,
//         }

//         var pray_timing = {

//             date: myJson.data.date.gregorian.date.substring(0, 2) + ' ' + myJson.data.date.gregorian.month.en + ' ' + myJson.data.date.gregorian.date.substring(6),
//             fajar: myJson.data.timings.Fajr,
//             zohar: myJson.data.timings.Dhuhr,
//             asar: myJson.data.timings.Asr,
//             magrib: myJson.data.timings.Maghrib,
//             isha: myJson.data.timings.Isha,
//             }
        
//          //console.log(cal_today);
//         // console.log(pray_timing);


//         ramzanCalender.push(cal_today);
//         prayersTiming.push(pray_timing);

//     });


fetch(`http://api.aladhan.com/v1/calendarByCity?city=${currentcity}&country=pakistan&method=2&month=04&year=2019`)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
       //console.log(myJson);
        arrRamzan = myJson.data;
        for (let index = 0; index < arrRamzan.length; index++) {

            //console.log(arrRamzan[index]);
            
            let cal_today = {
                ramzan: arrRamzan[index].date.hijri.date.substring(0, 2) + ' ' + arrRamzan[index].date.hijri.month.en + ' ' + arrRamzan[index].date.hijri.date.substring(6),
                date: arrRamzan[index].date.gregorian.date.substring(0, 2) + ' ' + arrRamzan[index].date.gregorian.month.en + ' ' + arrRamzan[index].date.gregorian.date.substring(6),
                day: arrRamzan[index].date.gregorian.weekday.en,
                sehri: arrRamzan[index].timings.Fajr,
                aftari: arrRamzan[index].timings.Maghrib,
            }

            let pray_timing = {

                date: arrRamzan[index].date.gregorian.date.substring(0, 2) + ' ' + arrRamzan[index].date.gregorian.month.en + ' ' + arrRamzan[index].date.gregorian.date.substring(6),
                fajar: arrRamzan[index].timings.Fajr,
                zohar: arrRamzan[index].timings.Dhuhr,
                asar: arrRamzan[index].timings.Asr,
                magrib: arrRamzan[index].timings.Maghrib,
                isha: arrRamzan[index].timings.Isha,
            }

            //console.log(cal_today);
            // console.log(pray_timing);


            ramzanCalender.push(cal_today);
            prayersTiming.push(pray_timing);


            
           
       }
        localStorage.setItem("ramzanCalender", JSON.stringify(ramzanCalender));
        localStorage.setItem("prayersTiming", JSON.stringify(prayersTiming));
        //console.log(ramzanCalender);
    });