'use strict';

import Section from './Section';
let navigationBar = require('./NavigationBar');

// To allow other modules to access variables 
window.Inout = {};

// All The sections
var sections = {
	home: new Section('home', '#6C9DE1'),
	about: new Section('about', '#6C9DE1'),
	faq: new Section('faq', '#5E729C'),
	schedule: new Section('schedule', '#34495e'),
	sponsors: new Section('sponsors', '#6C9DE1')
};

window.Inout.sections = sections;

let navigationBarHeight = 90;
let navigationBarInitialPos = sections.home.height() - navigationBarHeight;

navigationBar.positionAtIntialPos(navigationBarInitialPos);
initSectionStartPositions();

// Functions 
function initSectionStartPositions() {
	sections.home.startPos = 0;
	sections.about.startPos = sections.home.height() - navigationBarHeight;
	sections.faq.startPos = sections.about.startPos + sections.about.height();
	sections.schedule.startPos = sections.faq.startPos + sections.faq.height() 
	sections.sponsors.startPos = sections.schedule.startPos + sections.schedule.height(); 
}

function highlightNavBlock() {

	if( inSection('home')) {
		navigationBar.highlightNav('home');
		navigationBar.changeColor(sections.home.navColor);
	}

	if ( inSection('about') ) {
		navigationBar.highlightNav('about');
		navigationBar.changeColor(sections.about.navColor);
	} 

	if( inSection('faq') ) {
		navigationBar.highlightNav('faq');
		navigationBar.changeColor(sections.faq.navColor);
	}

	if( inSection('schedule') ) {
		navigationBar.highlightNav('schedule');
		navigationBar.changeColor(sections.schedule.navColor);
	}

	if( inSection('sponsors') ) {
		navigationBar.highlightNav('sponsors');
		navigationBar.changeColor(sections.sponsors.navColor);
	}


}

function inSection(section) {
	var scrollPos = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop);
	var lowerLimit = sections[section].startPos;
	var upperLimit = lowerLimit + sections[section].height();

	return scrollPos >= lowerLimit && scrollPos < upperLimit;
}


// Event Listeners 

window.addEventListener('resize', function() {
	initSectionStartPositions();

	if( !navigationBar.stuckAtTop ) {
		navigationBarInitialPos = sections.home.height() - navigationBarHeight;
		navigationBar.positionAtIntialPos(navigationBarInitialPos);
	}
	
});

window.addEventListener('scroll', function() {

	if( navigationBar.shouldStick() ) {
		navigationBar.sitckToTop();
	} else if ( navigationBar.shouldNotStick() ) {
		navigationBar.unstick();
	}

	highlightNavBlock();

});

