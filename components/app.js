// Handles the sending and recieving of data to and from the Student API

class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;

    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);

    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);

    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);

    // this.editGrade = this.editGrade.bind(this);
    // this.handleEditGradeError = this.handleEditGradeError.bind(this);
    // this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);
  }

  // Gets the grade data from the API (AJAX GET Request, Success Method, Error Method) TWO

  handleGetGradesError(error) {
   console.error('handlegetgradeerror', error)
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades)
    var total = 0;
    for (var i = 0; i < grades.length; i++) {
      total += grades[i].grade
    }
    var average = Math.round(total / grades.length * 10) / 10
    this.pageHeader.updateAverage(average)
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

  // Runs after instantiation of App class in main.js ONE

  start() {
    this.getGrades()
    this.gradeForm.onSubmit(this.createGrade)
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
    console.log(name, course, grade)
  }
  handleCreateGradeError(error) {
    console.error('handleCreategradeerror' + error)
  }
  handleCreateGradeSuccess() {
    this.getGrades()
  }

  // Sends deletion request to Student API (AJAX Delete Request, Success Method, Error Method)

  deleteGrade(id) {
    console.log(id)
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
    this.getGrades()
  }

  // Sends edit requet to Student API (AJAX PATCH Request, Success Method, Error Method)

  // editGrade(oldData) {
  //   console.log("App", oldData)
  // }
  // handleEditGradeError(error) {
  //   console.error(error)
  // }
  // handleEditGradeSuccess() {
  //   this.getGrades()
  // }

  //Getting individual grade to populate form

//   getIndivdualGrade(id) {
//     console.log(id)
//   }
//   handleGetIndivdualGradeError(error) {
//     console.error(error)
//   }
//   handleGetIndivdualGradeSuccess() {
//     this.editGrade("name", "course", "grade")
//   }
//   repopulateGradeForm(oldData) {
//     console.log("App", oldData)
//   }
}
