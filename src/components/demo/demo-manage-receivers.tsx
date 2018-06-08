import { Component, Prop, Element } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'demo-manage-receivers',
})
export class DemoManageReceivers {
  @Element() el: HTMLStencilElement;
  @Prop() listOfReceivers: string[];
  @Prop() addReceiver: (receiverName: string) => void;
  @Prop() removeReceiver: (receiverName: string) => void;

  render() {
    return (
      <div>
        <demo-add-receiver addReceiver={this.addReceiver} listOfReceivers={this.listOfReceivers}/>
        {(this.listOfReceivers.length === 0) ?
        <p>No Receivers</p> :
        <ul>
        {this.listOfReceivers.map((receiver) => (
          <li key={receiver}>{receiver} <button onClick={() => this.removeReceiver(receiver)}>&times;</button></li>
        ))}
        </ul>
        }
      </div>
    );
  }
}

Tunnel.injectProps(DemoManageReceivers, ['listOfReceivers', 'addReceiver', 'removeReceiver']);
