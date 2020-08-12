class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    console.log(grades)
    var tbody = document.querySelector(".tbody")
    var noGradesText = document.querySelector(".no-grades")
    tbody.innerHTML = "";

    if (!grades[0]) {
      noGradesText.classList.remove("d-none")
    } else {
      noGradesText.classList.add("d-none")
    }

    for (var i = 0; i < grades.length; i++) {
      var tableRow = this.renderGradeRow(grades[i], this.deleteGrade)
      tbody.appendChild(tableRow)
    }
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade
  }
  renderGradeRow(data, deleteGrade) {
    var tr = document.createElement("tr")
    var tdName = document.createElement("td")
    var tdCourse = document.createElement("td")
    var tdGrade = document.createElement("td")
    var tdDeleteBtn = document.createElement("td")
    var deleteBtn = document.createElement("button")

    tdName.textContent = data.name
    tdCourse.textContent = data.course
    tdGrade.textContent = data.grade
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "btn btn-danger btn-sm"
    deleteBtn.addEventListener("click", function() {
      deleteGrade(data.id)
    })

    tdDeleteBtn.appendChild(deleteBtn)
    tr.append(tdName, tdCourse, tdGrade, tdDeleteBtn)

    return tr
  }
}
