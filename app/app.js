"use strict";

var $ = require('jquery');
var _ = require('lodash');

// Initialize variable for receiving list data
var jeopardyList;

// Fetch list data from URI into the variable and render to page
$.get("https://api.myjson.com/bins/4ukwu", function (data) {
	jeopardyList = data;
	render();
});

// Given an item generate table row HTML using template literals
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
function rowHTML(item) {
	return `<tr>
				<td>${item.air_date}</td>
				<td>${item.show_number}</td>
				<td>${item.round}</td>
				<td>${item.category}</td>
				<td>${item.value}</td>
				<td>${item.question}</td>
				<td>${item.answer}</td>
			</tr>`;
}

// The render method:
// Append generated row markup within the DOM table body.
function render() {
	_.forEach(jeopardyList, function(item) {
		$('tbody').append(rowHTML(item));
	})
}
