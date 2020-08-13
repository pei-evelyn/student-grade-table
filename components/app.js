// Handles the sending and recieving of data to and from the Student API

class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.gradesArr = [];
    this.deleteId = 0;

    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);

    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);

    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);

    this.editGrade = this.editGrade.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);

    this.handleAverage = this.handleAverage.bind(this);
  }

  // Gets the grade data from the API (AJAX GET Request, Success Method, Error Method) ONLY RUNS AT START

  handleGetGradesError(error) {
   console.error('handlegetgradeerror', error)
  }
  handleGetGradesSuccess(grades) {
    this.gradesArr = grades
    this.gradeTable.updateGrades(grades)
    this.handleAverage()
  }

  getGrades() {
    $.ajax({
      method:"GET",
      headers: {
        "X-Access-Token": "YoXvyx07"
      },
      url: "https://sgt.lfzprototypes.com/api/grades",
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError
    })
  }

  // Runs after instantiation of App class in main.js

  start() {
    this.getGrades()
    this.gradeForm.onAdd(this.createGrade)
    this.gradeForm.onEdit(this.editGrade)
    this.gradeTable.onDeleteClick(this.deleteGrade)
    this.gradeTable.onEditClick(this.gradeForm.repopulateForm)
  }

  // Gets info from Grade form and sends to Student API (AJAX POST Request, Success Method, Error Method)

  createGrade(name, course, grade) {
    $.ajax({
      method:"POST",
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      headers: {
        "X-Access-Token": "YoXvyx07"
      },
      url: "https://sgt.lfzprototypes.com/api/grades",
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError
    })
  }
  handleCreateGradeError(error) {
    console.error('handleCreategradeerror' + error)
  }
  handleCreateGradeSuccess(data) {
    this.gradesArr.push(data)
    this.gradeTable.updateGrades(this.gradesArr)
    this.handleAverage()
  }

  // Sends deletion request to Student API (AJAX Delete Request, Success Method, Error Method)

  deleteGrade(id) {
    this.deleteId = id

    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "YoXvyx07"
      },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    })
  }
  handleDeleteGradeError(error) {
    console.error("Delete error"+ error)
  }
  handleDeleteGradeSuccess() {
    for (var i = 0; i < this.gradesArr.length; i++) {
      if (this.gradesArr[i].id === this.deleteId) {
        this.gradesArr.splice(i, 1);
      }
    }
    this.gradeTable.updateGrades(this.gradesArr)
    this.handleAverage()
  }

  // Sends edit requet to Student API (AJAX PATCH Request, Success Method, Error Method)

  editGrade(studentName, studentCourse, studentGrade, id) {
    $.ajax({
      method: "PATCH",
      data: {
        "name": studentName,
        "course": studentCourse,
        "grade": studentGrade
      },
      headers: {
        "X-Access-Token": "YoXvyx07"
      },
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      success: this.handleEditGradeSuccess,
      error: this.handleEditGradeError
    })
  }
  handleEditGradeError(error) {
    console.error(error)
  }
  handleEditGradeSuccess(data) {
    var editedData = data
    for (var i = 0; i < this.gradesArr.length; i++) {
      if (this.gradesArr[i].id === editedData.id) {
        this.gradesArr[i] = editedData
      }
    }
    console.log(this.gradesArr)
    this.gradeTable.updateGrades(this.gradesArr)
    this.handleAverage()
  }

  // Handles calculating and updating the average

  handleAverage() {
    var total = 0
    var arrLength = this.gradesArr.length
    for (var i = 0; i < arrLength; i++) {
      total += this.gradesArr[i].grade
    }
    var average = Math.round(total / arrLength * 10) / 10
    this.pageHeader.updateAverage(average)
  }
}
