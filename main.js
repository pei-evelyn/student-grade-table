var table = document.querySelector(".table");
var header = document.querySelector(".header")

var gradeTable = new GradeTable(table);
var pageHeader = new PageHeader(header);
var app = new App(gradeTable, pageHeader);

app.start()
