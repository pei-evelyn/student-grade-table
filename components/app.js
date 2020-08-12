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
  }
  handleGetGradesError(error) {
   console.error('handlegetgradeerror', error)
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades)
    var total = 0;
    for (var i = 0; i < grades.length; i++) {
      total += grades[i].grade
    }
    var average = total / grades.length
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
  start() {
    this.getGrades()
    this.gradeForm.onSubmit(this.createGrade)
  }
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
}
