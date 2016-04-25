"use strict";

var $ = require('jquery');
var _ = require('lodash');

var jeopardyList;
var listingsCount = 100;

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

function renderJeopardyList(pageNo) {
	let chunk = _.chunk(jeopardyList, listingsCount)[pageNo - 1];

	_.forEach(chunk, function(item) {
		$('tbody').append(rowHTML(item));
	})
}

function pageLink(pageNo) {
	return `<li><a href="javascript:void(0);">${pageNo}</a></li>`;
}

function paginatorHTML() {
	let pageCount = Math.ceil(jeopardyList.length / listingsCount);
	let pageNumbers = _.range(1, pageCount + 1);
	let pageNumbersListHTML = _.map(pageNumbers, pageLink).join('\n');

	return `<ol>${pageNumbersListHTML}</ol>`;
}

function renderJeopardyPaginator() {
	$('.Jeopardy-paginator').append(paginatorHTML());
}

function render() {
	renderJeopardyList(1);
	renderJeopardyPaginator();
}
