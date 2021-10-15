var locale = 'ko-KO';
var clock = {
	hours: document.querySelector('.m-clock .hours').firstChild,
	minutes: document.querySelector('.m-clock .minutes').firstChild,
	seconds: document.querySelector('.m-clock .seconds').firstChild,
	date: document.querySelector('.m-date').firstChild
};
render();

function padZero(number) {
	var str = number.toString();
	return str.length < 2 ? '0' + str : str;
}

function render() {
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	setTimeout(render, 1000 - now.getMilliseconds());

	clock.hours.data = padZero(hours);
	clock.minutes.data = padZero(minutes);
	clock.seconds.data = padZero(seconds);
	clock.date.data = now.toLocaleString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}
