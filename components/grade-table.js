// creates Class to handle the physical grade table

class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  // Updates the grade table on webpage

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
      var tableRow = this.renderGradeRow(grades[i], this.deleteGrade, this.repopulateForm)
      tbody.appendChild(tableRow)
    }
  }

  // Passes in the Methods grabbing data from the Student API and attaches onto
  // the Delete and Edit buttons

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade
  }
  onEditClick(repopulateForm) {
    this.repopulateForm = repopulateForm
  }
  renderGradeRow(data, deleteGrade, repopulateForm) {
    var tr = document.createElement("tr")
    var tdName = document.createElement("td")
    var tdCourse = document.createElement("td")
    var tdGrade = document.createElement("td")
    var tdOperations = document.createElement("td")
    var deleteAnchor = document.createElement("a")
    var editAnchor = document.createElement("a")
    var deleteIcon = document.createElement("i")
    var editIcon = document.createElement("i")

    tdName.textContent = data.name
    tdCourse.textContent = data.course
    tdGrade.textContent = data.grade

    deleteIcon.className = "fas fa-trash"
    editIcon.className = "fas fa-edit"
    deleteAnchor.className = "ml-3 text-danger"
    editAnchor.className = "ml-1 text-info"

    deleteAnchor.appendChild(deleteIcon)
    editAnchor.appendChild(editIcon)

    deleteAnchor.addEventListener("click", function() {
      deleteGrade(data.id)
    })

    editAnchor.addEventListener("click", function() {
      repopulateForm(data)
    })

    tdOperations.append(editAnchor, deleteAnchor)
    tr.append(tdName, tdCourse, tdGrade, tdOperations)

    return tr
  }
}
