/* -------------------     Students    ---------------------- */
//List of all Students
var allStudents = document.getElementsByClassName('student-item');
// Assign an ID to every student
for (var i = 0; i < allStudents.length; i++) {
	allStudents[i].id = "student" + i;
}
var studentsToDisplay = allStudents;
// Track Current Page.
var currentPage = 1;
// Total Number of Pages Needed if max students per page is 10
var pagesTotal;
// //Turn off display of all students
var displayNone = function() {
	for (var i = 0; i < allStudents.length; i++) {
		allStudents[i].style.display = 'none';
	}
}
/* -------------------     Pagination    ---------------------- */
// Active Class function to pagination
var addClassActive = function() {
	$('#page' + currentPage).addClass('active');
}
// Remove Class Active function
var removeClassActive = function() {
	// Removing 'active' from all paginations
	for (var i = 1; i <= pagesTotal; i++) {
		$('#page' + i).removeClass('active');
	}
	// Remove active class before reassigning active to new page
	addClassActive();
}
// Page first loads to first 10 students
var loadPage = function() {
	displayNone(); // Turn off display of all students
	var tenOrLess;
	if (studentsToDisplay.length >= 10) {
		tenOrLess = 10;
	} else {
		tenOrLess = studentsToDisplay.length;
	}
	for (var i = 0; i < tenOrLess; i++) {
		studentsToDisplay[i].style.display = 'block'; // Then display first 10
	}
	// Remove Active Class of other pages
	removeClassActive();
}
/* -------------------- Setting up number of Paginations ------------------ */
var pageCountInitial = function() {
	// Figure out how many pages need to display 10 Students/page max.
	pagesTotal = Math.ceil(studentsToDisplay.length / 10);
	if (pagesTotal > 1) {
		// Add previous button
		$('.pagination').append('<li><a href="#" aria-label="Previous" id="prev"><span aria-hidden="true">&laquo;</span></a></li>');
		// Append pagination buttons
		for (var i = 1; i < pagesTotal + 1; i++) {
			$('.pagination').append('<li><a href="#" id="page' + i + '">' + i + '</a></li>');
		}
		// Next Button
		$('.pagination').append('<li><a href="#" aria-label="Next" id="next"><span aria-hidden="true">&raquo;</span></a></li>');
	}
	loadPage();
}
var pageCount = function() {
	// Figure out how many pages need to display 10 Students/page max.
	pagesTotal = Math.ceil(studentsToDisplay.length / 10);
	console.log(pagesTotal);
	$('.pagination li a').css('display', 'none');
	if (pagesTotal > 1) {
		$('#prev').css('display', 'block');
		$('#next').css('display', 'block');
		for (var i = 1; i < pagesTotal + 1; i++) {
			$('#page' + i).css('display','block');
		}
	}
	
	loadPage();
}
// Function displays 10 or fewer students
var pageDisplay = function(page) {
	// Turn off display of all students
	displayNone();
	// Index of last Student to display
	var highNumber = parseInt(String(page) + '0');
	// Index of first student to display
	var lowNumber = highNumber - 10;
	// If there are less than 10 students to display
	if (studentsToDisplay[highNumber] === undefined) {
		highNumber = studentsToDisplay.length;
	}
	// Turn on display of students lowNumber to highNumber
	for (var i = lowNumber; i < highNumber; i++) {
		studentsToDisplay[i].style.display = 'block';
	}
	// Reassign active page
	removeClassActive();
}
/* -------------------     Search Bar    ---------------------- */
//Search Function
var searchButton = function() {
	currentPage = 1;
	// Remove all students from list
	displayNone();
	// Retrieve value from search bar
	var find = $('.student-search input').val().toLowerCase();
	console.log(find);
	// Number of student matches
	studentsToDisplay = [];
	console.log(studentsToDisplay);
	// Cycle through students
	for (var i = 0; i < allStudents.length; i++) {
		var student = $('#student' + i + ' h3').text();
		// If there is a match
		if (student.indexOf(find) > -1) {
			// Turn on Student display
			studentsToDisplay.push(allStudents[i]);
			console.log(allStudents[i]);
		}
	}
	// Clear Search Bar
	$('.student-search input').val("");
	// If there are 0 matches
	if (studentsToDisplay.length === 0) {
		// If no students are found then display "No Students Found"
		$('#noMatch').css('display', 'block');
	} else { // If there are students found
		$('#noMatch').css('display', 'none');
	}
	// Load Students and count pages needed
	pageCount();
}
// Click on Search Button
$('.student-search button').on('click', function() {
	// If no entry in search bar then load default page
	if ($('.student-search input').val() === "" || $('.student-search input').val().length === 0) {
		currentPage = 1;
		// Load Default page
		studentsToDisplay = allStudents;
		pageCount();
		return;
	} else {
		searchButton(); // Otherwise trigger the button
		return;
	}
})
// Enter button triggers Search Button
$(".student-search input").keyup(function(event){
    if(event.keyCode === 13){
        $(".student-search button").click();
    }
});
// Pagination Click
var pageClick = function () {
	// Grab ID of pagination
	var page = this.id;
	console.log(page);
	// Pagination options you may click on
	if (page === "prev") { // Previous button
		if (currentPage !== 1) {
			currentPage = currentPage - 1; // If the current page is not one it can go backwards
		}
	} else if (page === "next") { // Next button
		if (currentPage !== pagesTotal) {
			currentPage = currentPage + 1; // If the current page is not the max page it can move forward
		}
	} else {
		// Grab solely the number of page id
		currentPage = parseInt(page.substring(4,5));
	}
	// Pass Number to function
	pageDisplay(currentPage);
}
$(document).ready(function() {
	$('.pagination li a').on('click', pageClick);
});
// Onload Functions
pageCountInitial(); // Loads Default page with 54 students

