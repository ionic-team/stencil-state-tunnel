import { Component } from '@stencil/core';
import Tunnel, { State } from './data-tunnel'; // Import the tunnel

function dateToTimestamp(d: Date) {
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const time= [
    (hours === 0) ? '12' : (hours > 12) ? (hours - 12) : hours,
    (minutes < 10) ? `0${minutes}` : minutes,
    (seconds < 10) ? `0${seconds}` : seconds
  ].join(':');

  return `${time} ${hours > 12 ? 'pm' : 'am'}`
}

@Component({
  tag: 'demo-message-log',
  styles: `
  ul.msg-list {
    list-style: none;
  }
  ul.msg-list li {
    padding: 10px 0;
  }
  .row-desc {
    display: inline-block;
    font-weight: bold;
    width: 45px;
  }
  `
})
export class DemoMessageLog {
  render() {
    return [
      <p>Message Log:</p>,
      <Tunnel.Consumer>
        {({ messageLog }: State) => (
          <div>
            {(messageLog.length === 0) ?
            <p>No messages sent:</p> :
            <ul class="msg-list">
              { messageLog.map(message => (
                <li key={message.id}>
                  <span class="row-desc">To:</span> {message.recipients.join(', ')}<br/>
                  <span class="row-desc">Time:</span> {dateToTimestamp(message.timeStamp)}<br/>
                  <span class="row-desc">Text:</span> {message.message}<br/>
                </li>
              ))}
            </ul>
            }
          </div>
        )}
      </Tunnel.Consumer>
    ];
  }
}
