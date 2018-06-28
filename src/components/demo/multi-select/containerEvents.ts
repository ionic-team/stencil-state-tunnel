import { DemoMultiSelect } from './demo-multi-select';

export function mouseDown(this: DemoMultiSelect) {
  if (this.isDisabled) {
    return;
  }

  this.showingResults = true;
}

export function mouseUp(this: DemoMultiSelect, ev: MouseEvent) {
  // Selection was made reset.
  if (!this.isDisabled && (ev.target as HTMLElement).nodeName === "ABBR") {
    this.showingResults = false;
  }
}

export function mouseEnter(this: DemoMultiSelect) {
  this.mouseOnContainer = true;
}

export function mouseLeave(this: DemoMultiSelect) {
  this.mouseOnContainer = false;
}
