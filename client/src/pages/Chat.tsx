import { Socket } from "socket.io-client";
import { ChatBar, ChatBody, ChatFooter } from "../components/chat";
import { ComponentProps, LegacyRef, useEffect, useRef, useState } from "react";

const Chat = ({socket}: { socket: Socket<any, any> }) => {
  const [messages, setMessages] = useState<ComponentProps<typeof ChatBody>['messages']>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data: string) => setTypingStatus(data));
  }, [socket]);

  return (
      <div className="chat">
        <ChatBar socket={socket} />
        <div className="chat__main">
          <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
          <ChatFooter socket={socket} />
        </div>
      </div>
  )
}

export default Chat;
