import { createProviderConsumer } from '../state-tunnel';

describe('createProviderConsumer', () => {
  let Tunnel;
  const mockCallback = jest.fn();

  interface State {
    messageLog: string[],
    creatingMessage: boolean,
    setCreatingMessage: () => void
  }

  beforeEach(() => {
    Tunnel = createProviderConsumer<State>({
      messageLog: [],
      creatingMessage: false,
      setCreatingMessage: () => {}
    }, mockCallback);
  });

  it('should have a provider and consumer', () => {
    expect(Tunnel.Provider).toBeDefined();
    expect(Tunnel.Consumer).toBeDefined();
  });

  it('should call Tunnel ConsumerRender when Consumer called', () => {
    Tunnel.Consumer({}, ['a']);

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][1]).toBe('a');
  })
});
