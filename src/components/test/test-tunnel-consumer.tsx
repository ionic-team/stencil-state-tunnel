import { Component } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-tunnel-consumer',
})
export class WayDownChild {
  render() {
    return (
      <Tunnel.Consumer>
        {({ message, increment }) => (
          <div class='app-profile'>
            <button onClick={increment}>Increment Num</button>
            <p>{message}</p>
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}
