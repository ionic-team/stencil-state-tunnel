import { createProviderConsumer } from '../../utils/state-tunnel';

export interface MessageItem {
  id: string,
  timeStamp: Date
  message: string
}
export type MessageQueue = MessageItem[];

export interface State {
  listOfReceivers: string[],
  messageQueue: MessageQueue,
  addMessage: (msg: string) => void,
  removeMessage: (msgId: string) => void,
  addReceiver: (receiverName: string) => void,
  removeReceiver: (receiverName: string) => void,
}

export default createProviderConsumer<State>({
    listOfReceivers: [],
    messageQueue: [],
    addMessage: () => {},
    removeMessage: () => {},
    addReceiver: () => {},
    removeReceiver: () => {},
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
