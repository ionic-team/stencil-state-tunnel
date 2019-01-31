import { Component, Prop, State, Element, h } from '@stencil/core';
import Tunnel, { Recipient } from '../utils/data-tunnel';

@Component({
  tag: 'demo-create-message',
  styles: `
    .error {
      color: red;
    }
  `
})
export class DemoCreateMessage {
  @Element() el;
  @Prop() sendMessage: (msg: string, recipients: Recipient[]) => Promise<void>;
  @Prop() getReceiverList: () => Promise<Recipient[]>;
  @Prop() setCreatingMessage: (createMessage: boolean) => void;

  @State() availableRecipients: Recipient[] = [];
  @State() selectedReceiverIds: string[] = [];
  @State() errorText: string;

  input: HTMLInputElement;
  select: HTMLSelectElement;

  async componentWillLoad() {
    this.availableRecipients = await this.getReceiverList();
  }

  sendToMessageQueue = (e) => {
    e.preventDefault();
    this.errorText = null;

    if (this.selectedReceiverIds.length === 0) {
      this.errorText = 'A message must have at least one receiver.';
      return;
    }
    if (this.input.value === '') {
      this.errorText = 'Message cannot be empty';
      return;
    }

    const recipients = this.availableRecipients.filter(re => this.selectedReceiverIds.indexOf(re.id) !== -1);

    this.sendMessage(this.input.value, recipients);
    this.setCreatingMessage(false);
  }

  updateRecipientList = () => {
    this.selectedReceiverIds = Array.from(this.select.querySelectorAll('option'))
      .filter((op: HTMLOptionElement) => op.selected)
      .map((op: HTMLOptionElement) => op.value);
  }

  cancelMessage = (e) => {
    e.preventDefault();
    this.setCreatingMessage(false);
  }

  render() {
    return (
      <form onSubmit={this.sendToMessageQueue}>
        {this.errorText != null ?
          <p class="error">{this.errorText}</p> : null
        }
        <label>
          Recipients:
          <select multiple ref={(el: HTMLSelectElement) => this.select = el} onChange={this.updateRecipientList}>
          {this.availableRecipients.map(recipient => (
            <option value={recipient.id} selected={this.selectedReceiverIds.indexOf(recipient.id) !== -1}>{recipient.name}</option>
          ))}
          </select>
        </label><br/>
        <label>
          Message Text:
          <input ref={(el: HTMLInputElement) => this.input = el} type="text" />
        </label>
        <div>
          <input type="submit" value="Send message" />
          <a href="#" onClick={this.cancelMessage}>Cancel</a>
        </div>
      </form>
    );
  }
}

Tunnel.injectProps(DemoCreateMessage, ['sendMessage', 'getReceiverList', 'setCreatingMessage']);
