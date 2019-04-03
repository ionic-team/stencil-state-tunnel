import { Component, HTMLStencilElement, Prop, State, Element } from '@stencil/core';
import { SubscribeCallback } from '../declarations';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Element() el!: HTMLStencilElement;

  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: Function = () => null;
  @Prop() subscribe?: SubscribeCallback<any>;

  @State() unsubscribe?: () => void;

  componentWillLoad() {
    this.unsubscribe = () => {
      if (this.subscribe != null) {
        this.subscribe(this.el, 'context');
      }
    }
  }

  componentDidUnload() {
    if (this.unsubscribe != null) {
      this.unsubscribe();
    }
  }

  render() {
    return this.renderer({
      ...this.context
    });
  }
}
