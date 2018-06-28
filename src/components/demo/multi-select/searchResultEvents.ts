import { DemoMultiSelect } from './demo-multi-select';

export function mouseUp(this: DemoMultiSelect, ev: MouseEvent) {
  const target = ev.target as HTMLElement;

  if (target) {
    this.resultHighlight = target;
    this.selectedOptions = this.selectedOptions.concat(target.dataset.value);
    this.searchField.focus();
  }
}

export function mouseOver(this: DemoMultiSelect, ev: MouseEvent) {
  const target = ev.target as HTMLElement;

  if (target) {
    this.highlightedResultOption = target.dataset.value;
  }
}

export function mouseOut(ev: MouseEvent) {
  if ((ev.target as HTMLElement).classList.contains("active-result") || (ev.target as HTMLElement).closest('.active-result')) {
    this.highlightedResultOption = null;
  }
}

export function mouseWheel(ev: WheelEvent) {
  let delta = ev.deltaY || -ev.wheelDelta || ev.detail
  if (delta) {
    ev.preventDefault();

    if (ev.type === 'DOMMouseScroll') {
      delta = delta * 40;
    }
    this.searchResults.scrollTop = delta + this.searchResults.scrollTop;
  }
}

export function touchStart(this: DemoMultiSelect, ev: TouchEvent) {
  this.touchStarted = true;
  mouseOver.call(this, ev);
}

export function touchMove(this: DemoMultiSelect, ev: TouchEvent) {
  this.touchStarted = false;
  mouseOut.call(this, ev)
}

export function touchEnd(this: DemoMultiSelect, ev: TouchEvent) {
  if (this.touchStarted) {
    mouseUp.call(this, ev);
  }
}
