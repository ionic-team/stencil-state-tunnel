import { MessageItem, Recipient } from './data-tunnel'; // Import the Tunnel

// Unique enough for a demo
function getUniqueId() {
  return (Math.random() * 10e16).toString().match(/.{4}/g).join('-');
}

export async function sendMessage(message: string, recipients): Promise<MessageItem> {
  return {
    id: getUniqueId(),
    timeStamp: new Date(),
    message,
    recipients
  };
}

export async function getAvailableRecipients(): Promise<Recipient[]> {
  return [
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
  ];
}
