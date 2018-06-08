import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'demo-add-receiver',
  styles: `
    .error {
      color: red;
    }
  `
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
      this.errorText = 'Receiver name cannot be empty.';
      return;
    }
    console.log(this.listOfReceivers);
    if (this.listOfReceivers.indexOf(this.input.value) !== -1) {
      this.errorText = 'Receiver already in the list.';
      return;
    }

    this.addReceiver(this.input.value)
    this.input.value = '';
  }

  render() {
    return (
      <form onSubmit={this.addReceiverToList}>
        {this.errorText != null ?
          <p class="error">{this.errorText}</p> : null
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
