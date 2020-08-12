class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }
  updateAverage(newAverage) {
    var averageBadge = document.querySelector('.average-grade')
    if (!newAverage) {
      averageBadge.textContent = "N/A"
    } else {
      averageBadge.textContent = newAverage
    }
  }
}
