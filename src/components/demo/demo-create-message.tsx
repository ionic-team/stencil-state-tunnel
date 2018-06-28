import { Component, Prop, State, Element } from '@stencil/core';
import Tunnel, { Recipient } from './data-tunnel';
import { Options } from './multi-select/demo-multi-select';

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
    console.log('update');
    this.selectedReceiverIds = Array.from(this.select.querySelectorAll('option'))
      .filter((op: HTMLOptionElement) => op.selected)
      .map((op: HTMLOptionElement) => op.value);
  }

  cancelMessage = (e) => {
    e.preventDefault();
    this.setCreatingMessage(false);
  }

  render() {
    const options = this.availableRecipients.reduce((all, rec) => {
      return {
        [rec.name]: rec.id,
        ...all
      }
    }, [] as Options);

    return (
      <form onSubmit={this.sendToMessageQueue}>
        {this.errorText != null ?
          <p class="error">{this.errorText}</p> : null
        }
        <label>
          Recipients:
          <demo-multi-select options={options} onSelectionMade={(ev) => this.selectedReceiverIds = ev.detail}/>
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
