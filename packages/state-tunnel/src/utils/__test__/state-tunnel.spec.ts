import { createProviderConsumer } from '../state-tunnel';

describe('createProviderConsumer', () => {
  let Tunnel: any;
  let createTunnelCallback: any;
  let stencilElement: HTMLElement;
  let subscribe: any;

  interface State {
    messageLog: string[],
    creatingMessage: boolean,
    setCreatingMessage: () => void
  }

  beforeEach(() => {
    stencilElement = document.createElement('div');
    (stencilElement as any).forceUpdate = jest.fn();

    createTunnelCallback = jest.fn((subscribeFn) => {
      subscribe = subscribeFn;
    });
    Tunnel = createProviderConsumer<State>({
      messageLog: [],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }, createTunnelCallback);
  });

  it('should have a provider and consumer', () => {
    expect(Tunnel.Provider).toBeDefined();
    expect(Tunnel.Consumer).toBeDefined();
  });

  it('should call Tunnel consumerRender when Consumer created', () => {
    const props = {};
    const childAsFunction = jest.fn();
    Tunnel.Consumer(props, [childAsFunction]);
    subscribe(stencilElement, 'all');

    expect(createTunnelCallback.mock.calls.length).toBe(1);
    expect(createTunnelCallback.mock.calls[0][1]).toBe(childAsFunction);
    expect((stencilElement as any).forceUpdate.mock.calls.length).toBe(1);
  });

  it('should set element prop as copy of state when only a string is passed', () => {
    Tunnel.Consumer({}, [jest.fn()]);
    subscribe(stencilElement, 'all');

    const newState = {
      messageLog: ['a'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect((stencilElement as any).forceUpdate.mock.calls.length).toBe(2);
    expect((stencilElement as any).all).toEqual(newState);
  });

  it('should set element props array of strings', () => {
    Tunnel.Consumer({}, [jest.fn()]);
    subscribe(stencilElement, ['messageLog', 'creatingMessage']);

    const newState = {
      messageLog: ['a'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect((stencilElement as any).forceUpdate.mock.calls.length).toBe(2);
    expect((stencilElement as any).messageLog).toEqual(['a']);
    expect((stencilElement as any).creatingMessage).toEqual(false);
    expect((stencilElement as any).setCreatingMessage).toBeUndefined();
  });


  it('should set element props array of strings', () => {
    const ElementClass = {
      properties: {
        messageLog: {},
        createingMessage: {},
        item: {
          elementRef: true
        }
      },
      prototype: {}
    };
    Tunnel.injectProps(ElementClass, ['messageLog', 'creatingMessage']);

    expect((ElementClass.prototype as any).componentWillLoad).toBeDefined();
    expect((ElementClass.prototype as any).componentDidUnload).toBeDefined();
    (ElementClass.prototype as any).componentWillLoad.call({
      item: stencilElement
    });

    let newState = {
      messageLog: ['a'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect((stencilElement as any).forceUpdate.mock.calls.length).toBe(2);
    expect((stencilElement as any).messageLog).toEqual(['a']);
    expect((stencilElement as any).creatingMessage).toEqual(false);
    expect((stencilElement as any).setCreatingMessage).toBeUndefined();

    // Unsubscribing removes from all further updates
    (ElementClass.prototype as any).componentDidUnload.call({
      item: stencilElement
    });

    newState = {
      messageLog: ['b'],
      creatingMessage: true,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect((stencilElement as any).forceUpdate.mock.calls.length).toBe(2);
    expect((stencilElement as any).messageLog).toEqual(['a']);
    expect((stencilElement as any).creatingMessage).toEqual(false);
    expect((stencilElement as any).setCreatingMessage).toBeUndefined();
  });
});
