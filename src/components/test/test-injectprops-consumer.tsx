import { Component, Prop } from '@stencil/core';
import Tunnel, { MessageQueue } from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-injectprops-consumer',
})
export class WayDownChild {
  @Prop() listOfReceivers: string[];
  @Prop() messageQueue: MessageQueue;

  render() {
    return (
      <div class='app-profile'>
      </div>
    );
  }
}

Tunnel.injectProps(WayDownChild, ['listOfReceivers', 'messageQueue']);
