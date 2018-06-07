import { Component, Prop } from '@stencil/core';
import Tunnel, { MessageQueue } from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-injectprops-consumer',
})
export class WayDownChild {
  @Prop() message: string;
  @Prop() listOfReceivers: string[];
  @Prop() increment: () => void;
  @Prop() messageQueue: MessageQueue;

  render() {
    return (
      <div class='app-profile'>
        <button onClick={this.increment}>Increment Num</button>
        <p>{this.message}</p>
      </div>
    );
  }
}

Tunnel.injectProps(WayDownChild, ['message', 'listOfReceivers', 'messageQueue', 'increment']);
