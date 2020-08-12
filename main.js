var table = document.querySelector(".table");
var header = document.querySelector(".header")
var form = document.querySelector(".form")

var gradeTable = new GradeTable(table);
var pageHeader = new PageHeader(header);
var gradeForm = new GradeForm(form);

var app = new App(gradeTable, pageHeader);

app.start()
