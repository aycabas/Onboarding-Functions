let month = undefined;
let day = undefined;
let hour = undefined;
let minute = undefined;
let second = undefined;
const date = new Date();
const year = date.getFullYear();
let expiryAsync = undefined;
async function getDateTimeAsync(){

    if(date.getMonth() + 1 < 10){
        let currentMonth = date.getMonth() + 1;
        month = '0' + currentMonth;
    }
    else{
        month = date.getMonth() + 1;  
    }
    if(date.getDate() < 10){
        day = '0' + date.getDate();
    }
    else{
        day = date.getDate();
    }
    if(date.getHours() + 1 < 10){
        let hourlater = date.getHours() + 1;
        hour = '0' + hourlater;
    }
    else{
       hour = date.getHours() + 1;  
    }
    if(date.getMinutes() < 10){
        minute = '0' + date.getMinutes();
    }
    else{
        minute = date.getMinutes();
    }
    if(date.getSeconds() < 10){
        second = '0' + date.getSeconds();
    }
    else{
        second = date.getSeconds();
    }
   
    expiryAsync = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z'; 
    return expiryAsync;
}

module.exports.getDateTimeAsync = getDateTimeAsync;
