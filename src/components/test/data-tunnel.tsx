import { createProviderConsumer } from '../../utils/state-tunnel';

export type MessageQueue = Array<{ [key: string]: any }>;
export interface State {
  message: string,
  listOfReceivers: string[],
  messageQueue: MessageQueue,
  increment?: () => void
}

export default createProviderConsumer<State>({
    message: 'Hello!',
    listOfReceivers: [],
    messageQueue: [],
    increment: () => {},
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
