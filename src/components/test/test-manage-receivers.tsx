import { Component, Prop } from '@stencil/core';
import Tunnel, { MessageQueue } from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-manage-receivers',
})
export class TestManageReceivers {
  @Prop() listOfReceivers: string[];
  @Prop() addReceiver: (receiverName: string) => void;
  @Prop() removeReceiver: (receiverName: string) => void;

  render() {
    return (
      <div>
        <ul>
        {this.listOfReceivers.map((receiver) => (
          <li key={receiver}>{receiver} <button onClick={() => this.removeReceiver(receiver)}>&times;</button></li>
        ))}
        </ul>
      </div>
    );
  }
}

Tunnel.injectProps(TestManageReceivers, ['listOfReceivers', 'addReceiver', 'removeReceiver']);