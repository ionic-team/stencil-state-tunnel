import { FunctionalComponent } from '@stencil/core';
import { SubscribeCallback, ConsumerRenderer, PropList } from '../declarations';

export const createProviderConsumer = <T extends {[key: string]: any}>(defaultState: T, consumerRender: ConsumerRenderer<T>) => {

  let listeners: Map<any, PropList<T>> = new Map();
  let currentState: T = defaultState;

  const updateListener = (fields: PropList<T>, listener: any) => {
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

  const subscribe: SubscribeCallback<T> = (el: any, propList: PropList<T>) => {
    if (listeners.has(el)) {
      return () => {};
    }
    listeners.set(el, propList);
    updateListener(propList, el);

    return () => {
      listeners.delete(el);
    }
  }

  const Provider: FunctionalComponent<{state: T}> = ({ state }, children) => {
    currentState = state;
    listeners.forEach(updateListener);
    return children;
  }

  const Consumer: FunctionalComponent<{}> = (props, children) => {
    // The casting on subscribe is to allow for crossover through the stencil compiler
    // In the future we should allow for generics in components.
    return consumerRender(subscribe, children[0] as any);
  }

  const injectProps = (childComponent: any, fieldList: PropList<T>) => {
    let unsubscribe: any = null;

    const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
    childComponent.prototype.componentWillLoad = function() {
      unsubscribe = subscribe(null, fieldList);
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
    injectProps
  }
}
