function parseTime(timeStamp){
    let dateObj = new Date(Number(timeStamp));
    let year=dateObj.getFullYear();
    let month=dateObj.getMonth()+1;
    let day = dateObj.getDate();
    return `${year}-${month}-${day}`
}

module.exports=parseTime;