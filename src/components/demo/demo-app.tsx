import { Component, State } from '@stencil/core';
import Tunnel, { State as TunnelState, MessageItem, Recipient } from './data-tunnel'; // Import the Tunnel
import * as API from './api-util';


@Component({
  tag: 'demo-app',
  styles: `
    demo-app {
      display: block;
      width: 700px;
      margin: 0 auto;
    }
  `
})
export class DemoApp {

  @State() availableReceivers: Recipient[] = [];
  @State() messageLog: MessageItem[] = [];
  @State() creatingMessage: boolean = false;

  sendMessage = async (msgText: string, recipients: Recipient[]) => {
    const newMessage = await API.sendMessage(msgText, recipients);
    this.messageLog = [
      ...this.messageLog,
      newMessage
    ];
  }

  getReceiverList = async () => {
    if (this.availableReceivers.length > 0) {
      return this.availableReceivers;
    }
    return this.availableReceivers = await API.getAvailableRecipients();
  }

  setCreatingMessage = (creatingMessage: boolean) => {
    this.creatingMessage = creatingMessage;
  }

  render() {
    const tunnelState: TunnelState = {
      messageLog: this.messageLog,
      sendMessage: this.sendMessage,
      getReceiverList: this.getReceiverList,
      availableReceivers: this.availableReceivers,
      creatingMessage: this.creatingMessage,
      setCreatingMessage: this.setCreatingMessage
    };
    return (
      <Tunnel.Provider state={tunnelState}>
        <header>
          {this.creatingMessage ? null : <button onClick={() => {this.creatingMessage = true}}>Create Message</button>}
          <h1>Message Demo App</h1>
        </header>
        {
          this.creatingMessage ?
            <demo-create-message
              sendMessage={this.sendMessage} />
              :
            <demo-message-log />
        }
      </Tunnel.Provider>
    );
  }
}
