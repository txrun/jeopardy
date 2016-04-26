"use strict";

var $ = require('jquery');
var _ = require('lodash');

var jeopardyListChunks = [];
var rowsPerPage = 50;

downloadListing(initializeAndRender);

function downloadListing(callbackFn) {
	$.get('https://api.myjson.com/bins/4ukwu', callbackFn);
}

function initializeAndRender(list) {
	jeopardyListChunks = _.chunk(list, rowsPerPage);
	render();
}

function render(event = null) {
	let pageNo = _.isEmpty(event) ? 1 : event.data.pageNo;

	let appRoot = $("#Jeopardy-App");
	appRoot.html('');

	renderHeader(appRoot);
	renderTable(appRoot, pageNo);
	renderPaginator(appRoot, pageNo);
}

function renderHeader(target) {
	target.append($('<h1>Jeopardy</h1>'));
}

function renderTable(target, pageNo = 1) {
	let table = $('<table></table>');
	table.append(tableHeader());
	table.append(tableBody(pageNo));
	target.append(table);
}

function tableHeader() {
	return (
		`<thead>
			<tr>
				<th>Air Date</th>
				<th>Show No.</th>
				<th>Round</th>
				<th>Category</th>
				<th>Value</th>
				<th>Question</th>
				<th>Answer</th>
			</tr>
		</thead>`
	);
}

function tableBody(pageNo = 1) {
	let tbody = $('<tbody></tbody>');
	_.forEach(tableRows(pageNo), function(tr) {
		tbody.append(tr);
	});
	return tbody;
}

function tableRows(pageNo = 1) {
	let chunkIndex = pageNo - 1;
	return _.map(jeopardyListChunks[chunkIndex], tableRowHTML);
}

function tableRowHTML(item) {
	return $(
		`<tr>
			<td>${item.air_date}</td>
			<td>${item.show_number}</td>
			<td>${item.round}</td>
			<td>${item.category}</td>
			<td>${item.value}</td>
			<td>${item.question}</td>
			<td>${item.answer}</td>
		</tr>`);
}

function renderPaginator(target, activePage = 1) {
	let container = $('<div class="Jeopardy-Paginator"></div>');
	container.append(pageNumbersList(activePage));
	target.append(container);
}

function pageNumbersList(activePage = 1) {
	let ol = $('<ol></ol>');
	let pageCount = jeopardyListChunks.length;
	let pageNumbers = _.range(1,  pageCount + 1);

	let pagesListHTML = _.map(pageNumbers, listHTML);
	_.forEach(pagesListHTML, function(li) {
		ol.append(li);
	});

	return ol;
}

function listHTML(pageNo) {
	let li = $('<li></li>');

	let link = $(`<a href="javascript:void(0);">${pageNo}</a>`)
	li.append(link);
	link.click({pageNo: pageNo}, render);

	return li;
}
