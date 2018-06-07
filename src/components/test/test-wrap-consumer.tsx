import { Component, Prop } from '@stencil/core';
import Tunnel, { MessageQueue } from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-wrap-consumer',
})
export class WayDownChild {
  @Prop() message: string;
  @Prop() listOfReceivers: string[];
  @Prop() messageQueue: MessageQueue;
  @Prop() increment: () => void;

  render() {
    return (
      <div class='app-profile'>
        <button onClick={this.increment}>Increment Num</button>
        <p>{this.message}</p>
      </div>
    );
  }
}

export const WayDownChildFn = Tunnel.wrapConsumer(WayDownChild, ['message', 'listOfReceivers', 'messageQueue', 'increment']);
