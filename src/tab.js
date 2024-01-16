var locale = 'ko-KO';
var clock = {
	hours: document.querySelector('.m-clock .hours').firstChild,
	minutes: document.querySelector('.m-clock .minutes').firstChild,
	seconds: document.querySelector('.m-clock .seconds').firstChild,
	date: document.querySelector('.m-date').firstChild
};
render();

function padZero(number, len = 2) {
	var str = number.toString();
	while (str.length < len) {
		str = '0' + str;
	}
	return str;
}

// https://stackoverflow.com/a/39502645
function toTimeScopeId(d0) {
	// Clone the Date object, since we modify it for math reasons
	d = new Date(d0);

	var dayOfWeek = (d.getDay() + 6) % 7 + 1;

	d.setDate(d.getDate() - dayOfWeek + 3);
	var thursdayOfWeek = d.valueOf();

	d.setMonth(0, 1);
	if (d.getDay() !== 4) {
		d.setMonth(0, 1 + ((4 - d.getDay()) + 7) % 7);
	}
	var weekOfYear = 1 + Math.ceil((thursdayOfWeek - d) / 604800000);
	if (weekOfYear < 10) {
		// add leading "0" in the most manual way possible
		weekOfYear = `0${weekOfYear}`
	}

	return `${d.getFullYear()}-ww${weekOfYear}.${dayOfWeek}`
}

function render() {
	var now = new Date();
	// This re-renders the frame at the top of each second
	// setTimeout(render, 1000 - now.getMilliseconds());
	// This would re-render the frame every frame
	// window.requestAnimationFrame(render)
	// Re-render at the top of every 10th of a second, for the sub-second string(s)
	setTimeout(render, 100 - (now.getMilliseconds() % 100));

	var hours_str = padZero(now.getHours());
	var minutes_str = padZero(now.getMinutes());
	var seconds_str = padZero(now.getSeconds());

	clock.hours.data = hours_str;
	clock.minutes.data = minutes_str;
	clock.seconds.data = seconds_str;

	// extended date/time info, in english
	month = now.toLocaleString('en-US', {
		month: 'short'
	});
	subsecond_str = Math.round(now.getMilliseconds() / 100)

	clock.date.data = toTimeScopeId(now) +
		`-${month}-${padZero(now.getDate())}` +
		` ${hours_str}:${minutes_str}:${seconds_str}` +
		`.${subsecond_str}`
}
