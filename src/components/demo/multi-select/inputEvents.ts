import { DemoMultiSelect } from './demo-multi-select';

enum Key {
  Backspace = 8,
  Enter = 13,
  Escape = 27,
  Tab = 9,
  Shift = 16,
  Ctrl = 17,
  Alt = 18,
  UpArrow = 38,
  DownArrow = 40,
  LeftWindowKey = 91,
  Space = 32,
}

export function keyUpChecker(this: DemoMultiSelect, ev: KeyboardEvent) {
  const stroke = ev.which || ev.keyCode;

  switch(stroke) {
  case Key.Enter: // enter
    ev.preventDefault()
    if (this.showingResults && this.resultHighlight) {
      this.selectedOptions = this.selectedOptions.concat(this.resultHighlight.dataset.value);
    }
    break;
  case Key.Escape:
    this.showingResults = false;
    break;
  case Key.Tab:
  case Key.Shift:
  case Key.Ctrl:
  case Key.Alt:
  case Key.UpArrow:
  case Key.DownArrow:
  case Key.LeftWindowKey:
    break;
  default:
    this.inputValue = this.searchField.value;
  }
}
export function keyDownChecker(this: DemoMultiSelect, ev: KeyboardEvent) {
  const stroke = ev.which || ev.keyCode;

  switch(stroke) {
  case Key.Tab:
    this.mouseOnContainer = false;
    break;
  case Key.Enter:
  case Key.Escape:
    if (this.showingResults) {
      ev.preventDefault();
    }
    break;
  case Key.UpArrow:
    ev.preventDefault();
    keyUpArrow.call(this);
    break;
  case Key.DownArrow:
    keyDownArrow.call(this);
    break;
  }
}
export function inputFocus(this: DemoMultiSelect) {
  if (!this.activeField) {
    return;
  }
  setTimeout(() => this.hostEvents.onMouseDown(), 50);
}

export function inputBlur(this: DemoMultiSelect) {
  if (!this.mouseOnContainer) {
    this.activeField = false;
  }
  setTimeout(() => blurTest.call(this), 100);
}

export function clipboardEventChecker(this: DemoMultiSelect) {
  if (this.isDisabled) {
    return;
  }
  setTimeout(() => this.inputValue = this.searchField.value, 50);
}

function blurTest(this: DemoMultiSelect) {
  this.showingResults = false;
}

function keyUpArrow(this: DemoMultiSelect) {
  if (!this.showingResults) {
    return this.showingResults = true;
  }
  if (this.highlightedResultOption) {
    const currentHighlightOptionIndex = this.searchResultOptions.findIndex(sro => sro[1] === this.highlightedResultOption);
    let highlightIndex = currentHighlightOptionIndex - 1;
    highlightIndex = (highlightIndex > 0) ? highlightIndex : 0;

    this.highlightedResultOption = this.searchResultOptions[highlightIndex][1];
  }
}

function keyDownArrow(this: DemoMultiSelect) {

  if (this.showingResults && this.highlightedResultOption) {
    const currentHighlightOptionIndex = this.searchResultOptions.findIndex(sro => sro[1] === this.highlightedResultOption);
    let highlightIndex = currentHighlightOptionIndex + 1;
    highlightIndex = (this.searchResultOptions.length > highlightIndex) ? highlightIndex : currentHighlightOptionIndex;

    this.highlightedResultOption = this.searchResultOptions[highlightIndex][1];
  } else {
    this.showingResults = true;
  }
}
