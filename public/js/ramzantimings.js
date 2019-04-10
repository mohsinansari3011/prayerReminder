
var ramzanCalender = [];
var prayersTiming = [];

var currentcity = localStorage.getItem("currentcity");
if (!currentcity){
    currentcity = "Karachi";
    localStorage.setItem("currentcity", currentcity);
    
}

console.log(currentcity);
fetch(`http://api.aladhan.com/v1/timingsByCity?city=${currentcity}&country=Pakistan&method=8`)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        //console.log(JSON.stringify(myJson));
         console.log(myJson);
        // console.log(myJson.data.date.gregorian.weekday.en);
        var cal_today = {
            ramzan: myJson.data.date.hijri.date.substring(0, 2) + ' ' + myJson.data.date.hijri.month.en + ' ' + myJson.data.date.hijri.date.substring(6),
            date: myJson.data.date.gregorian.date.substring(0, 2) + ' ' + myJson.data.date.gregorian.month.en + ' ' + myJson.data.date.gregorian.date.substring(6) ,
            day: myJson.data.date.gregorian.weekday.en,
            sehri: myJson.data.timings.Fajr,
            aftari: myJson.data.timings.Maghrib,
        }

        var pray_timing = {

            date: myJson.data.date.gregorian.date.substring(0, 2) + ' ' + myJson.data.date.gregorian.month.en + ' ' + myJson.data.date.gregorian.date.substring(6),
            fajar: myJson.data.timings.Fajr,
            zohar: myJson.data.timings.Dhuhr,
            asar: myJson.data.timings.Asr,
            magrib: myJson.data.timings.Maghrib,
            isha: myJson.data.timings.Isha,
            }
        
         console.log(cal_today);
        // console.log(pray_timing);


        ramzanCalender.push(cal_today);
        prayersTiming.push(pray_timing);

    });