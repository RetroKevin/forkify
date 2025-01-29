import View from './View'
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  addHandlerClick (handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return
      const goToPage = +btn.dataset.goto
      handler(goToPage)
    })
  }

  _generateMarkup () {
    const curtPage = this._data.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )
    // Page 1 of many
    if (curtPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curtPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curtPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `
    }

    // Last Page
    if (curtPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curtPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curtPage - 1}</span>
      </button>
      `
    }
    // Other Page
    if (curtPage < numPages) {
      return `
      <button data-goto="${
        curtPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curtPage - 1}</span>
      </button>
      <button data-goto="${
        curtPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curtPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `
    }
    // Page 1 of 1
    return ''
  }
}

export default new PaginationView()
