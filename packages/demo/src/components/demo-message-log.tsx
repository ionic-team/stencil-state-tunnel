import { Component } from '@stencil/core';
import Tunnel, { State } from '../utils/data-tunnel'; // Import the tunnel

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
    padding-left: 10px;
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
    return (
      <Tunnel.Consumer>
        {(props: State) => {
          console.log(props);
          return (
            <div>
              {(props.messageLog.length === 0) ?
              <p>No messages sent.</p> :
              <ul class="msg-list">
                {
                  props.messageLog
                  .sort((a, b) => (b.timeStamp.getTime() - a.timeStamp.getTime()))
                  .map(message => (
                    <li key={message.id}>
                      <span class="row-desc">To:</span> {message.recipients.map(re => re.name).join(', ')}<br/>
                      <span class="row-desc">Time:</span> {dateToTimestamp(message.timeStamp)}<br/>
                      <span class="row-desc">Text:</span> {message.message}<br/>
                    </li>
                  ))
                }
              </ul>
              }
            </div>
          );
        }}
      </Tunnel.Consumer>
    );
  }
}
