import { createProviderConsumer } from '@stencil/state-tunnel';

export interface MessageItem {
  id: string,
  timeStamp: Date,
  message: string,
  recipients: Recipient[]
}

export interface Recipient {
  id: string,
  name: string
}


export interface State {
  messageLog: MessageItem[],
  availableReceivers: Recipient[],
  sendMessage: (msg: string, recipients: Recipient[]) => Promise<void>,
  getReceiverList: () => Promise<Recipient[]>,
  creatingMessage: boolean
  setCreatingMessage: (creatingMessage: boolean) => void
}

export default createProviderConsumer<State>({
    messageLog: [],
    sendMessage: () => Promise.resolve(),
    getReceiverList: () => Promise.resolve([]),
    availableReceivers: [],
    creatingMessage: false,
    setCreatingMessage: () => {}
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
