var today = new Date();
var start = new Date();
start.setFullYear(1900, 0, 31);

var milliSecPerDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

var diffDays = Math.round(Math.abs((today.getTime() - start.getTime())/(milliSecPerDay)));
var phase = diffDays / 29.530588853;
phase -= Math.floor(phase);

document.write("오늘은" + today.getFullYear() +"년 "+(today.getMonth()+1)+"월 "+today.getDate()+"일 <br><br>");
document.write("<b>"+diffDays+" days</b> since Jan. 31 1900<br><br>");
document.write("달님 상태는 <b>"+phase+"</b><br>");
