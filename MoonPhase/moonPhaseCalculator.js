function moonPhase() {
	var today = new Date();
	var start = new Date();
	start.setFullYear(1900, 0, 31);
	
	var milliSecPerDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	
	var diffDays = Math.round(Math.abs((today.getTime() - start.getTime())/(milliSecPerDay)));
	var phase = diffDays / 29.530588853;
	phase -= Math.floor(phase);
	return phase;
}