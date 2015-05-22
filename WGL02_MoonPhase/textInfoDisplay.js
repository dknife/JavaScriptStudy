var today = new Date();

var phase = moonPhase();

document.write("오늘은 " + today.getFullYear() +"년 "+(today.getMonth()+1)+"월 "+today.getDate()+"일 <br><br>");
document.write('달님 상태는 <b><span id="moonPhase">'+phase+'</span></b><br>');

