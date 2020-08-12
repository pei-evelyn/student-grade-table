class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade
  }
  handleSubmit(event) {
    console.log(event.target)
    event.preventDefault()
    var formData = new FormData(event.target)
    var studentName = formData.get("name")
    var studentCourse = formData.get("course")
    var studentGrade = formData.get("grade")
    this.createGrade(studentName, studentCourse, studentGrade)
    event.target.reset()
  }
}
