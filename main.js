var table = document.querySelector(".table");
var header = document.querySelector(".header")
var form = document.querySelector(".form")
var noGrades = document.querySelector(".no-grades")
var titleSpan = document.querySelector(".title-span")

var gradeTable = new GradeTable(table, noGrades);
var pageHeader = new PageHeader(header);
var gradeForm = new GradeForm(form, titleSpan);

var app = new App(gradeTable, pageHeader, gradeForm);

app.start()
