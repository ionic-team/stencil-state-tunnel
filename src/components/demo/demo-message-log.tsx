import { Component } from '@stencil/core';
import Tunnel from './data-tunnel'; // Import the tunnel

@Component({
  tag: 'demo-message-log',
})
export class DemoMessageLog {
  render() {
    return (
      <Tunnel.Consumer>
        {({ messageLog }) => (
          <div class='app-profile'>
            {JSON.stringify(messageLog)}
          </div>
        )}
      </Tunnel.Consumer>
    );
  }
}
