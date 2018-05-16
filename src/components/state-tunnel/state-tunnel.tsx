import { Component, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Element() el: HTMLStencilElement;

  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: any = (props: any ) => {
    props;
    return null;
  };
  @Prop() subscribe: (el: HTMLStencilElement, props: string[] | string) => () => void
  @State() unsubscribe: () => void;

  componentWillLoad() {
    this.unsubscribe = this.subscribe(this.el, 'context');
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

export function createProviderConsumer<T extends object>(defaultState: T) {
  type PropList = (keyof T)[] | string;

  let listeners: Map<HTMLStencilElement, PropList> = new Map();
  let currentState: T = defaultState;

  function notifyConsumers() {
    listeners.forEach(updateListener)
  }

  function updateListener(fields: PropList, listener) {
    if (Array.isArray(fields)) {
      [...fields].forEach(fieldName => {
        listener[fieldName] = currentState[fieldName];
      });
    } else {
      listener[fields] = {
        ...currentState as object
      } as T;
    }
    listener.forceUpdate();
  }

  function attachListener(propList: PropList) {
    return (el: HTMLStencilElement) => {
      if (listeners.has(el)) {
        return;
      }
      listeners.set(el, propList);
      updateListener(propList, el);
    }
  }

  function subscribe(el: HTMLStencilElement, propList: PropList) {
    attachListener(propList)(el);
    return function() {
      listeners.delete(el);
    }
  }

  function Provider({ state, children }: { state: T, children?: any[]}) {
    currentState = state;
    notifyConsumers();
    return children;
  }

  function Consumer({ children }: any) {
    return (
      <context-consumer
        subscribe={subscribe}
        renderer={children[0]}
      />
    );
  }

  function wrapConsumer(childComponent: any, fieldList: PropList) {
    const Child = childComponent.is;

    return ({ children, ...props}: any ) => {
      return (
        <Child ref={attachListener(fieldList)} {...props}>
          { children }
        </Child>
      );
    };
  }

  return {
    Provider,
    Consumer,
    wrapConsumer,
    subscribe
  }
}
