class GradeForm {
  constructor(formElement, titleSpan) {
    this.formElement = formElement;
    this.titleSpan = titleSpan;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.repopulateForm = this.repopulateForm.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade
  }
  // onFormEdit(editGrade) {
  //   this.editGrade = editGrade
  // }
  handleSubmit(event) {
    event.preventDefault()
    console.log(event.submitter)
    var formData = new FormData(event.target)
    var studentName = formData.get("name")
    var studentCourse = formData.get("course")
    var studentGrade = formData.get("grade")
    this.createGrade(studentName, studentCourse, studentGrade)
    event.target.reset()
  }
  repopulateForm(oldData) {
    this.formElement[0].value = oldData.name
    this.formElement[1].value = oldData.course
    this.formElement[2].value = oldData.grade
    this.formElement[3].value = "edit"
    this.formElement[3].textContent = "Edit"
    this.titleSpan.textContent = "Edit"
    console.log("I work", oldData)

  }
}
