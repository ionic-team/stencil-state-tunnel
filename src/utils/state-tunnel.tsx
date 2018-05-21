
function defaultConsumerRender(subscribe, child) {
  return <context-consumer
    subscribe={subscribe}
    renderer={child}
  />;
}

export function createProviderConsumer<T extends object>(defaultState: T, consumerRender = defaultConsumerRender) {
  type PropList = (keyof T)[] | string;

  let listeners: Map<any, PropList> = new Map();
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
    return (el: any) => {
      if (listeners.has(el)) {
        return;
      }
      listeners.set(el, propList);
      updateListener(propList, el);
    }
  }

  function subscribe(el: any, propList: PropList) {
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
    return consumerRender(subscribe, children[0]);
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

    const prevComponentWillLoad = childComponent.prototype.componentWillLoad;
    childComponent.prototype.componentWillLoad = function() {
      unsubscribe = subscribe(this, fieldList);
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
  };
}
