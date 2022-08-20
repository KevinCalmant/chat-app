import { FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const ChatFooter = ({socket}: { socket: Socket<any, any> }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message != '') {
      socket.emit('typing', `${localStorage.getItem('userName')} is typing...`);
    } else {
      socket.emit('typing', '');
    }
  }, [message]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      socket.emit('typing', '');
    }
    setMessage('');
  }

  return (
      <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <input type="text"
                 placeholder="Write message"
                 className="message"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn">SEND</button>
        </form>
      </div>
  )
}

export default ChatFooter;
