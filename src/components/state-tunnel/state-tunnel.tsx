import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: any = (props: any ) => {
    props;
    return null;
  };
  @Prop() subscribe: (el: any, props: string[] | string) => () => void
  @State() unsubscribe: () => void;

  componentWillLoad() {
    this.unsubscribe = this.subscribe(this, 'context');
  }

  componentDidUnload() {
    this.unsubscribe();
  }

  render() {
    return this.renderer({
      ...this.context
    });
  }
}
