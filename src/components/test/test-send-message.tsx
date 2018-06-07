import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'test-send-message',
})
export class TestSendMessage {
  @Prop() sendMessage: (msg: string) => void;
  @State() errorText: string;
  input: HTMLInputElement;

  sendToMessageQueue = (e) => {
    e.preventDefault();

    this.errorText = this.input.value === '' ?
      'Message cannot be empty' :
      null;

    if (this.errorText != null) {
      return;
    }
    this.sendMessage(this.input.value)
  }

  render() {
    return (
      <form onSubmit={this.sendToMessageQueue}>
        {this.errorText != null ?
          <div class="error">{this.errorText}</div> : null
        }
        <label>
          Message Text:
          <input ref={(el: HTMLInputElement) => this.input = el} type="text" />
        </label>
        <input type="submit" value="Add Message" />
      </form>
    );
  }
}
