import { Component, Prop, Element } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'demo-manage-receivers',
  styles: `
    ul.receiver-list {
      list-style: none;
      padding-left: 10px;
    }
    ul.receiver-list li {
      padding: 5px 0;
    }
    button.add-receiver {
      margin-right: 5px;
    }
  `
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
        <ul class="receiver-list">
        {this.listOfReceivers.map((receiver) => (
          <li key={receiver}>
            <button class="add-receiver" onClick={() => this.removeReceiver(receiver)}>&times;</button>
            {receiver}
          </li>
        ))}
        </ul>
        }
      </div>
    );
  }
}

Tunnel.injectProps(DemoManageReceivers, ['listOfReceivers', 'addReceiver', 'removeReceiver']);
