class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }
  updateAverage(newAverage) {
    var averageBadge = document.querySelector('.average-grade')
    averageBadge.textContent = newAverage
    console.log(newAverage);
  }
}
