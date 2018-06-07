import { Component } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'test-message-log',
})
export class TestMessageLog {
  render() {
    return (
      <Tunnel.Consumer>
        {({ messageQueue }) => (
          <div class='app-profile'>
            {JSON.stringify(messageQueue)}
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}
