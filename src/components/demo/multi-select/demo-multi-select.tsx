import { Component, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import * as container from './containerEvents';
import * as searchResults from './searchResultEvents';
import * as inputEvents from './inputEvents';
import { VNodeData } from '../../../../../stencil/dist/declarations';


export interface Options {
  [name: string]: any
}

@Component({
  tag: 'demo-multi-select',
  styles: `
  `
})
export class DemoMultiSelect {
  @Prop() options: Options;
  @Prop() isDisabled = false;
  @State() selectedOptions: string[] = [];
  @State() inputValue: string = '';
  @State() showingResults: boolean = false;
  @State() highlightedResultOption: number | string;
  @State() highlightedItemOption: number | string;

  @Event() selectionMade: EventEmitter<string[]>;

  activeField = false;
  touchStarted = false;
  mouseOnContainer = false;
  searchField: HTMLInputElement;
  searchResults: HTMLElement;
  resultHighlight: HTMLElement;
  searchResultOptions: [string, any][];

  hostEvents = {
    onTouchStart: container.mouseDown.bind(this),
    onTouchEnd: container.mouseUp.bind(this),
    onMouseDown: container.mouseDown.bind(this),
    onMouseUp: container.mouseUp.bind(this),
    onMouseEnter: container.mouseEnter.bind(this),
    onMouseLeave: container.mouseLeave.bind(this)
  }

  searchResultEvents = {
    onMouseUp: searchResults.mouseUp.bind(this),
    onMouseOver: searchResults.mouseOver.bind(this),
    onMouseOut: searchResults.mouseOut.bind(this),
    onMouseWheel: searchResults.mouseWheel.bind(this),
    onScroll: searchResults.mouseWheel.bind(this),
    onTouchStart: searchResults.touchStart.bind(this),
    onTouchMove: searchResults.touchMove.bind(this),
    onTouchEnd: searchResults.touchEnd.bind(this)
  }

  inputEvents = {
    onBlur: inputEvents.inputBlur.bind(this),
    onKeyUp: inputEvents.keyUpChecker.bind(this),
    onKeyDown: inputEvents.keyDownChecker.bind(this),
    onFocus: inputEvents.inputFocus.bind(this),
    onCut: inputEvents.clipboardEventChecker.bind(this),
    onPaste: inputEvents.clipboardEventChecker.bind(this)
  }

  @Watch('selectedOptions')
  updatedSelection() {
    this.selectionMade.emit(this.selectedOptions);
  }

  hostData(): VNodeData {
    return this.hostEvents;
  }

  componentWillUpdate() {
    this.searchResultOptions = Object.keys(this.options)
      .filter((optionName) => (
        !!this.inputValue || optionName.includes(this.inputValue)
      ))
      .map(optionName => [optionName, this.options[optionName]] as [string, any]);
  }

  render() {
    let searchResults = null;
    let selectedResults = null;

    if (this.showingResults) {
      searchResults = (
        <div ref={(el) => searchResults = el} {...this.searchResultEvents}>
          <ul>
            {
              this.searchResultOptions.map(([optionName, optionValue]) =>
                <li
                  class={{ 'highlighted': optionValue === this.highlightedResultOption }}
                  data-value={optionValue}
                  key={optionValue}>{optionName}</li>)
            }
          </ul>
        </div>
      )
    }

    if (this.selectedOptions.length > 0) {
      selectedResults = (
        <div>
          {Object.keys(this.options)
            .filter(ok => this.selectedOptions.indexOf(this.options[ok]) !== -1)
            .map(ok => <span>{ok}</span>)}
        </div>
      )
    }
    return (
      <div>
        {searchResults}
        {selectedResults}
        <input
          {...this.inputEvents}
          ref={(el: HTMLInputElement) => this.searchField = el}
          type="text"
          autocomplete="off"
          value=""
        />
      </div>
    );
  }
}
