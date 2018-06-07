import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'demo-add-receiver',
})
export class DemoAddReceiver {
  @Prop() addReceiver: (msg: string) => void;
  @Prop() listOfReceivers: string[];
  @State() errorText: string;
  input: HTMLInputElement;

  addReceiverToList = (e) => {
    e.preventDefault();
    this.errorText = null;

    if (this.input.value === '') {
      this.errorText = 'Message cannot be empty.';
      return;
    }
    if (this.listOfReceivers.indexOf(this.input.value) !== -1) {
      this.errorText = 'Receiver already in the list.';
      return;
    }

    this.addReceiver(this.input.value)
  }

  render() {
    return (
      <form onSubmit={this.addReceiverToList}>
        {this.errorText != null ?
          <div class="error">{this.errorText}</div> : null
        }
        <label>
          Receiver Name:
          <input ref={(el: HTMLInputElement) => this.input = el} type="text" />
        </label>
        <input type="submit" value="Add Receiver" />
      </form>
    );
  }
}
