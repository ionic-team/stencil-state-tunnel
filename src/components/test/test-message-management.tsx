import { Component, State } from '@stencil/core';
import Tunnel, { State as TunnelState, MessageQueue } from './data-tunnel'; // Import the Tunnel

// Unique enough for a demo
function getUniqueId() {
  return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
}

@Component({
  tag: 'test-message-management',
})
export class TestMessageManagement {

  @State() listOfReceivers = [];
  @State() messageQueue: MessageQueue = [];

  sendMessage = (msgText: string) => {
    this.messageQueue = [
      ...this.messageQueue,
      {
        id: getUniqueId(),
        timeStamp: new Date(),
        message: msgText,
        recipients: this.listOfReceivers
      }
    ];
  }

  addReceiver = (receiverName: string) => {
    this.listOfReceivers = [
      ...this.listOfReceivers,
      receiverName
    ];
  }

  removeReceiver = (receiverName: string) => {
    this.listOfReceivers = this.listOfReceivers.filter(name => name !== receiverName);
  }

  render() {
    const tunnelState: TunnelState = {
      listOfReceivers: this.listOfReceivers,
      messageQueue: this.messageQueue,
      sendMessage: this.sendMessage,
      addReceiver: this.addReceiver,
      removeReceiver: this.removeReceiver
    };
    return (
      <Tunnel.Provider state={tunnelState}>
        <div>
          <header>
            <h1>Message Demo App</h1>
          </header>
          <test-add-message sendMessage={this.sendMessage} />
          <test-manage-receivers />
          <test-message-log />
        </div>
      </Tunnel.Provider>
    );
  }
}
