class GradeForm {
  constructor(formElement, titleSpan) {
    this.formElement = formElement;
    this.titleSpan = titleSpan;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.repopulateForm = this.repopulateForm.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }
  onAdd(createGrade) {
    this.createGrade = createGrade
  }
  onEdit(editGrade) {
    this.editGrade = editGrade
  }
  getId(id) {
    this.id = id
  }
  handleSubmit(event) {
    event.preventDefault()
    var formData = new FormData(event.target)
    var studentName = formData.get("name")
    var studentCourse = formData.get("course")
    var studentGrade = formData.get("grade")
    if (event.submitter.value === "edit") {
      this.editGrade(studentName, studentCourse, studentGrade, this.id)
      event.submitter.value = "add"
      event.submitter.textContent = "Add"
      this.titleSpan.textContent = "Add"
    } else if (event.submitter.value === "add") {
      this.createGrade(studentName, studentCourse, studentGrade)
    }
    event.target.reset()
  }
  repopulateForm(oldData, getId) {
    this.id = oldData.id
    this.formElement[0].value = oldData.name
    this.formElement[1].value = oldData.course
    this.formElement[2].value = oldData.grade
    this.formElement[3].value = "edit"
    this.formElement[3].textContent = "Edit"
    this.titleSpan.textContent = "Edit"
    console.log("I work", oldData)
  }
}
