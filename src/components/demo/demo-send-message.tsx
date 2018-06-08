import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'demo-send-message',
  styles: `
    .error {
      color: red;
    }
  `
})
export class DemoSendMessage {
  @Prop() hasReceivers: boolean;
  @Prop() sendMessage: (msg: string) => void;
  @State() errorText: string;
  input: HTMLInputElement;

  sendToMessageQueue = (e) => {
    e.preventDefault();
    this.errorText = null;

    if (!this.hasReceivers) {
      this.errorText = 'A message must have at least on receiver.';
      return;
    }
    if (this.input.value === '') {
      this.errorText = 'Message cannot be empty';
      return;
    }

    this.sendMessage(this.input.value);
    this.input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.sendToMessageQueue}>
        {this.errorText != null ?
          <p class="error">{this.errorText}</p> : null
        }
        <label>
          Message Text:
          <input ref={(el: HTMLInputElement) => this.input = el} type="text" />
        </label>
        <input type="submit" value="Send message" />
      </form>
    );
  }
}
