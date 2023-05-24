export class Section {
  constructor (renderer, sectionSelector) {
    this._section = document.querySelector(sectionSelector);;
    this._rendererCards = renderer;
  }

  renderCards = (items) => {
    items.forEach((cardElement) => {
      this._rendererCards(cardElement);
    });
  }

  addItem = (element) => {
    this._section.prepend(element);
  }
}

