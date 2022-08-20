import { useNavigate } from "react-router-dom";
import { LegacyRef } from "react";

export interface Message {
  id: string;
  name: string;
  text: string;
}

export interface ChatBodyProps {
  messages: Message[];
  lastMessageRef: LegacyRef<HTMLDivElement>;
  typingStatus: string;
}

const ChatBody = ({
                    messages,
                    lastMessageRef,
                    typingStatus
                  }: ChatBodyProps) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  }

  const showMessageName = (index: number, currentMessage: Message): boolean => {
    if (index != 0) {
      return currentMessage.name !== messages[index - 1].name;
    }
    return true;
  }

  return (
      <>
        <header className="chat__mainHeader">
          <p>Hangout with Colleagues</p>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </header>

        <div className="message__container">
          {messages.map(((message: Message, index: number) =>
                  message.name === localStorage.getItem('userName') ? (
                      <div className="message__chats" key={message.id + message.name}>
                        {showMessageName(index, message) && <p className="sender__name">You</p>}
                        <div className="message__sender">
                          <p>{message.text}</p>
                        </div>
                      </div>
                  ) : (
                      <div className="message__chats">
                        {showMessageName(index, message) && <p>{message.name}</p>}
                        <div className="message__recipient">
                          <p>{message.text}</p>
                        </div>
                      </div>
                  )
          ))}
          <div className="message__status">
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef}></div>
        </div>
      </>
  );
}

export default ChatBody;
