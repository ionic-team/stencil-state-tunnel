import { createProviderConsumer } from '../../utils/state-tunnel';

export interface MessageItem {
  id: string,
  timeStamp: Date,
  message: string,
  recipients: string[]
}
export type MessageLog = MessageItem[];

export interface State {
  listOfReceivers: string[],
  messageLog: MessageLog,
  sendMessage: (msg: string) => void,
  addReceiver: (receiverName: string) => void,
  removeReceiver: (receiverName: string) => void,
}

export default createProviderConsumer<State>({
    listOfReceivers: [],
    messageLog: [],
    sendMessage: () => {},
    addReceiver: () => {},
    removeReceiver: () => {},
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
