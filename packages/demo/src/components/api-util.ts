import { MessageItem, Recipient } from './data-tunnel'; // Import the Tunnel

// Unique enough for a demo
function getUniqueId() {
  return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
}

export function sendMessage(message: string, recipients): Promise<MessageItem> {
  return Promise.resolve(
    {
      id: getUniqueId(),
      timeStamp: new Date(),
      message,
      recipients
    }
  );
}

export function getAvailableRecipients(): Promise<Recipient[]> {
  return Promise.resolve(
    [
      {
        id: '1',
        name: 'George Washington'
      },
      {
        id: '2',
        name: 'John Adams'
      },
      {
        id: '3',
        name: 'Thomas Jefferson'
      },
      {
        id: '4',
        name: 'James Madison'
      },
      {
        id: '5',
        name: 'James Monroe'
      },
      {
        id: '6',
        name: 'John Quincy Adams'
      }
    ]
  );
}
