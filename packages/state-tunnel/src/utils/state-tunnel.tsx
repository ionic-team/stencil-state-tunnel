import { FunctionalComponent } from "@stencil/core";
import { SubscribeCallback } from '../declarations';

function defaultConsumerRender(subscribe: SubscribeCallback<string>, renderer: Function) {
  return <context-consumer
    subscribe={subscribe}
    renderer={renderer}
  />;
}

export function createProviderConsumer<T extends object>(defaultState: T, consumerRender = defaultConsumerRender) {
  type PropList = Extract<keyof T, string>[];

  let listeners: Map<HTMLStencilElement, PropList> = new Map();
  let currentState: T = defaultState;

  function notifyConsumers() {
    listeners.forEach(updateListener)
  }

  function updateListener(fields: PropList, listener: HTMLStencilElement) {
    if (Array.isArray(fields)) {
      [...fields].forEach(fieldName => {
        (listener as any)[fieldName] = currentState[fieldName];
      });
    } else {
      (listener as any)[fields] = {
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

  const Provider: FunctionalComponent<{state: T}> = ({ state }, children) => {
    currentState = state;
    notifyConsumers();
    return children;
  }

  const Consumer: FunctionalComponent<{}> = (props, children) => {
    // The casting on subscribe is to allow for crossover through the stencil compiler
    // In the future we should allow for generics in components.
    return consumerRender(subscribe as SubscribeCallback<string>, children[0] as Function);
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

  function injectProps(childComponent: any, fieldList: PropList) {
    let unsubscribe: any = null;

    const elementRefName = Object.keys(childComponent.properties).find(propName => {
      return childComponent.properties[propName].elementRef == true;
    });
    if (elementRefName == undefined) {
      throw new Error(`Please ensure that your Component ${childComponent.is} has an attribtue with "@Element" decorator. ` +
        `This is required to be able to inject properties.`);
    }

    const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
    childComponent.prototype.componentWillLoad = function() {
      unsubscribe = subscribe(this[elementRefName], fieldList);
      if (prevComponentWillLoad) {
        return prevComponentWillLoad.bind(this)();
      }
    }

    const prevComponentDidUnload = childComponent.prototype.componentDidUnload;
    childComponent.prototype.componentDidUnload = function() {
      unsubscribe();
      if (prevComponentDidUnload) {
        return prevComponentDidUnload.bind(this)();
      }
    }
  }

  return {
    Provider,
    Consumer,
    wrapConsumer,
    injectProps
  }
}
