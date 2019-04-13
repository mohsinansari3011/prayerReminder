var calenderBody = document.getElementById("calenderBody");
var todayTableEl = document.getElementById("today");




var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var prayerNameEl = document.getElementById("prayer-name");
var remainingTimeEl = document.getElementById("remaining-time");

var nextPrayer;
var remainingTime;

var bottomBarEl = document.getElementById("bottom-bar");
var isRamzan = false;
var isDayPassed = false;


var brand = document.getElementById("brand");
var searchImg = document.getElementById("search-img");
var closeBtn = document.getElementById("close-btn");
var userInputEl = document.getElementById("user-input");
var inputGroup = document.querySelector('.input-group');







function fetchToday(){


    var int = setInterval(()=>{
        
        cityOnload();

        var today = new Date();
        var todayDate = `${today.getDate()} ${months[today.getMonth()]} 2019`;
        var todayObject;
        var tomorrowObject;
        var todaySeconds = (3600*today.getHours()) + (60 * today.getMinutes());
        var remainingDayTime;
        // Decide day
        for(var i = 0; i < prayersTiming.length; i++){
    
            if(prayersTiming[i].date.indexOf(todayDate) !== -1){
                todayObject = prayersTiming[i];
                //console.log('todayObject', todayObject);
                tomorrowObject = prayersTiming[i+1];
                //console.log('tomorrowObject', tomorrowObject);
                break;
            }
    
        }
    
      

        // if( (today.getDate() >= 9 && today.getMonth() === 3) || (today.getDate() <= 31 && today.getMonth() === 4)){
        //     isRamzan = true;
        // }
    
        let ramzanObject;
        if (ramzanCalender){
            //console.log('ramzanCalender',ramzanCalender);
            for(var i = 0; i < ramzanCalender.length; i++){

                // console.log("ramzanCalender[i].date", ramzanCalender[i].date);
                // console.log("todayDate", todayDate);
                if(ramzanCalender[i].date.indexOf(todayDate) !== -1){
                    ramzanObject = ramzanCalender[i];
                    break;
                }
            }
            
            //console.log(ramzanObject.sehri);

            if (ramzanObject) {
                bottomBarEl.innerHTML = `
                <div class="text-left inner-div">SEHR ${ramzanObject.sehri}</div>
                <div class="text-right inner-div">IFTAR ${ramzanObject.aftari}</div>
            `;
                todayTableEl.innerHTML = `
                <tr>
                    <td>${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}</td>
                    <td class="text-center">${ramzanObject.ramzan}</td>
                    <td>${days[today.getDay()]}</td>
                </tr>
            `;
            }
            
    
        }
        else{
            
            bottomBarEl.innerText = `Ramzan is coming in ${35 - today.getDate()} days`;
            todayTableEl.innerHTML = `
                <tr>
                    <td>${today.getDate()} - ${months[today.getMonth()]}</td>
                    <td class="text-center">-</td>
                    <td>${days[today.getDay()]}</td>
                </tr>
            `;
        }
    

        // Decide next prayer
        
        // if data not found
        if(todayObject === undefined){
            nextPrayer = 'Data for this day not found';
            remainingTime = 'Data for this day not found';
            prayerNameEl.innerText = nextPrayer;
            remainingTimeEl.innerText = remainingTime;
            return false;  
        }
        // if data found
        if( todaySeconds < makePrayerTime(todayObject.fajar) ){
            nextPrayer = 'Fajr';
            remainingTime = todayObject.fajar;
            // remainingTime = todayObject.fajar.seconds - todaySeconds;        
        }
        else if(todaySeconds < makePrayerTime(todayObject.zohar)){
            nextPrayer = 'Dhuhr';
            remainingTime = todayObject.zohar;
            
        }
        else if(todaySeconds < makePrayerTime(todayObject.asar)){
            nextPrayer = 'Asr';
            remainingTime = todayObject.asar;            
        }
        else if(todaySeconds < makePrayerTime(todayObject.magrib)){
            nextPrayer = 'Maghrib';
            remainingTime = todayObject.magrib;
        }
        else if(todaySeconds < makePrayerTime(todayObject.isha)){
            nextPrayer = 'Isha';
            remainingTime = todayObject.isha;            
        }
        else{
            isDayPassed = true;
            var ishaTime = makePrayerTime(todayObject.isha);
            remainingDayTime = 86400 - todaySeconds;
            
            nextPrayer = 'Fajr';
            remainingTime = tomorrowObject.fajar;
        }

        var prayerTime = makePrayerTime(remainingTime);
        
        if(isDayPassed){
            remainingTime = remainingDayTime + prayerTime;
        }else{
            remainingTime = prayerTime - todaySeconds;
        }
        remainingTime = makeTime(remainingTime);
        prayerNameEl.innerText = nextPrayer;
        remainingTimeEl.innerHTML = remainingTime;
    },1000);
}




//Convert seconds to hours and minutes
function makeTime(seconds){
    //console.log(seconds);
    seconds = ((seconds/60)/60);
    let TimeArr = (seconds).toString().split('.');
    let hours = parseInt(TimeArr[0]);
    let minutes = parseFloat('.' + TimeArr[1]);
    let min = Math.round(minutes * 60);
    //console.log(hours, min);

    if (hours == "0" && min == "0") {
        console.log('alert;');
    }

    return hours + ' <small>hr</small> ' + min + ' <small>min</small>';
}

// Calculate seconds of prayers time
function makePrayerTime(prayerTime){
    prayerTime = (prayerTime.toString()).split(":")
    let firstPart = parseInt(prayerTime[0]);
    let secondPart = parseInt(prayerTime[1]);
    return (firstPart*3600) + (secondPart*60);
}

function fetchcalender(){
    var today = new Date();
    var todayDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
    var index =0;
    var tr;
    for (var  i = 0; i < ramzanCalender.length; i++){
        calenderBody.innerHTML += `
            <tr>
                <td>${ramzanCalender[i].ramzan}</td>
                <td>${ramzanCalender[i].date}</td>
                <td>${ramzanCalender[i].day}</td>
                <td>${ramzanCalender[i].sehri}</td>
                <td>${ramzanCalender[i].aftari}</td>                
            </tr>
        `
    }
    tr = calenderBody.getElementsByTagName('tr');

    //if((today.getDate() >= 9 && today.getMonth() === 3) || (today.getDate() <= 31 && today.getMonth() === 4)){
    if (ramzanCalender){  
        for(var i = 0; i < ramzanCalender.length; i++){
            if(ramzanCalender[i].date.indexOf(todayDate) !== -1){
                index = i;
                break;
            }
        }
        for(var i=0; i < index; i++){
           tr[i].style.opacity = '0.7';            
           tr[i].style.backgroundColor = '#8395a7';
        }
        tr[index].style.backgroundColor = '#3C3C3D';
        tr[index].style.color = '#fff';
    }
}





if (searchImg) {

    searchImg.addEventListener("click",()=>{
    brand.style.display = 'none';
    searchImg.style.display = 'none';
    inputGroup.style.display = 'flex';
});

}

if (closeBtn) {
closeBtn.addEventListener("click",()=>{
    brand.style.display = 'block';
    searchImg.style.display = 'block';
    inputGroup.style.display = 'none';

});
}

if (userInputEl) {
userInputEl.addEventListener("keyup",()=>{
    var userInput = userInputEl.value;
    var index;
    var tr;
    tr = calenderBody.getElementsByTagName('tr');
    
    for(var i=0; i<ramzanCalender.length; i++){

        if (ramzanCalender[i].ramzan.indexOf(userInput) !== -1) {
            tr[i].style.display = 'table-row';
            continue;
        }else{
            tr[i].style.display = 'none';
        }
        // if(userInput === ramzanCalender[i].ramzan){ 
        //     index = i;
        //     break;
        // }
    }
    
    // for(var i=0 ; i<tr.length; i++){
    //     if(i === index){
    //         tr[i].style.display = 'table-row';            
    //         continue;
    //     }
    //     tr[i].style.display = 'none';
    // }


    if(userInput === ''){
        for(var i=0 ; i<tr.length; i++){
            tr[i].style.display = 'table-row';
        } 
    }
});
}


function cityOnload() {

    var currentcity = localStorage.getItem("currentcity");
    if (!currentcity) {
        currentcity = "Karachi";
        localStorage.setItem("currentcity", currentcity);

    }
    document.getElementById('currentcity').innerHTML = currentcity + ', Pakistan';

}

function changecity(e) {

    if (e !== "select") {
        localStorage.setItem("currentcity", e);
        document.getElementById('currentcity').innerHTML = e + ', Pakistan';
        location.reload();
    }
   
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
}

