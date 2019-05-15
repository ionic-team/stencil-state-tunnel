import { Component, Prop } from '@stencil/core';
import { newSpecPage, mockDocument } from '@stencil/core/testing';
import { createProviderConsumer } from '../state-tunnel';

describe('createProviderConsumer', () => {
  let Tunnel: any;
  let createTunnelCallback: any;
  let subscribe: any;
  let elm: any;
  let doc = mockDocument();

  interface State {
    messageLog: string[],
    creatingMessage: boolean,
    setCreatingMessage: () => void
  }

  beforeEach(() => {
    elm = doc.createElement('stencil-element');

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
    subscribe(elm, 'all');

    expect(createTunnelCallback.mock.calls.length).toBe(1);
    expect(createTunnelCallback.mock.calls[0][1]).toBe(childAsFunction);
  });

  it('should set element prop as copy of state when only a string is passed', () => {
    Tunnel.Consumer({}, [jest.fn()]);
    subscribe(elm, 'all');

    const newState = {
      messageLog: ['a'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect(elm.all).toEqual(newState);
  });

  it('should set element props array of strings', () => {
    Tunnel.Consumer({}, [jest.fn()]);
    subscribe(elm, ['messageLog', 'creatingMessage']);

    const newState = {
      messageLog: ['a'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });
    expect(elm.messageLog).toEqual(['a']);
    expect(elm.creatingMessage).toEqual(false);
    expect(elm.setCreatingMessage).toBeUndefined();
  });

  it('should set element props array of strings', async () => {
    @Component({ tag: 'cmp-a' })
    class CmpA {
      @Prop() messageLog: string[];
      @Prop() creatingMessage: boolean;
      connectedCallback() {}
      disconnectedCallback() {}
    }

    Tunnel.injectProps(CmpA, ['messageLog', 'creatingMessage']);

    const { root } = await newSpecPage({
      components: [CmpA],
      html: `<cmp-a></cmp-a>`
    });

    expect(root.messageLog).toEqual([]);
    expect(root.creatingMessage).toEqual(false);

    let newState = {
      messageLog: ['a'],
      creatingMessage: true,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });

    expect(root.messageLog).toEqual(['a']);
    expect(root.creatingMessage).toEqual(true);
    expect(root.setCreatingMessage).toBeUndefined();

    newState = {
      messageLog: ['b'],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }

    Tunnel.Provider({ state: newState });

    expect(root.messageLog).toEqual(['b']);
    expect(root.creatingMessage).toEqual(false);
    expect(root.setCreatingMessage).toBeUndefined();
  });

});
