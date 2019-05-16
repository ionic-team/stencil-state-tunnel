import { h, Component, Prop, State, Element } from '@stencil/core';
import { SubscribeCallback } from '../declarations';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Element() el!: any;

  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: Function = () => null;
  @Prop() subscribe?: SubscribeCallback<any>;

  @State() unsubscribe?: () => void;

  connectedCallback() {
    this.unsubscribe = () => {
      if (this.subscribe != null) {
        this.subscribe(this.el, 'context');
      }
    }
  }

  disconnectedCallback() {
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
