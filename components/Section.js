export class Section {
  constructor ({items, renderer}, section) {
    this._section = section;
    this._rendererCards = renderer;
    this._cardDataArray = items;
  }

  renderCards = () => {
    this._cardDataArray.forEach((cardElement) => {
      this._rendererCards(cardElement);
    });
  }

  addItem = (element) => {
    this._section.prepend(element);
  }
}

