import { Component, Prop } from '@stencil/core';
import Tunnel, { MessageQueue } from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-wrap-consumer',
})
export class WayDownChild {
  @Prop() listOfReceivers: string[];
  @Prop() messageQueue: MessageQueue;
  @Prop() addMessage: () => void;

  render() {
    return (
      <div class='app-profile'>
        <button onClick={this.addMessage}>Add Message</button>
      </div>
    );
  }
}

export const WayDownChildFn = Tunnel.wrapConsumer(WayDownChild, ['listOfReceivers', 'messageQueue', 'addMessage']);
