
// corporation name slideshow

var slideshows = Array.from(
	document.getElementsByClassName('company-slideshow')
),
	corporations = [
		'Google',
		'Microsoft',
		'Facebook',
		'Apple',
		'Amazon'
	],
	index = 0;

setInterval(function () {
	index++;
	if (index === corporations.length) index = 0;
	for (var i = 0; i < slideshows.length; i++) {
		slideshows[i].innerText = corporations[index];
	}
}, 2000);
