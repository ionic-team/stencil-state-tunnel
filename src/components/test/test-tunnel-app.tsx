import { Component, Prop, State } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the Tunnel

@Component({
  tag: 'test-tunnel-app',
})
export class MyApp {

  @Prop() intro: string = 'Hello!';
  @State() message: string = '';

  count: number = 0;

  componentWillLoad() {
    this.increment();
  }

  increment = () => {
    this.count = this.count + 1;
    this.message = `${this.intro} ${this.count}`;
  }

  render() {
    const tunnelState = {
      message: this.message,
      increment: this.increment
    };
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <Tunnel.Provider state={tunnelState}>
          <some-child-component/>
        </Tunnel.Provider>
      </div>
    );
  }
}
