
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

var highlighted = 0;

function setHash (hash) {
	if(history.pushState) {
		history.pushState(null, null, '#'+hash);
	} else {
		location.hash = '#'+hash;
	}
}
setHash('/proprietary-software/');
document.querySelector('header nav a').classList.add('active');

document.addEventListener('scroll', function () {
	if (document.getElementById('/more-info/').getBoundingClientRect().y < 100) {
		highlighted = 3;
		setHash('/more-info/');
	} else if (document.getElementById('/free-software-library/').getBoundingClientRect().y < 100) {
		highlighted = 2;
		setHash('/free-software-library/');
	} else if (document.getElementById('/open-source/').getBoundingClientRect().y < 100) {
		highlighted = 1;
		setHash('/open-source/');
	} else if (document.getElementById('/proprietary-software/').getBoundingClientRect().y < 100) {
		highlighted = 0;
		setHash('/proprietary-software/');
	}

	for (el of Array.from(document.querySelectorAll('header nav a'))) {
		el.classList.remove('active');
	}
	document.querySelectorAll('header nav a')[highlighted].classList.add('active');
})
