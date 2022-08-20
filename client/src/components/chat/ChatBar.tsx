import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export interface User {
  socketID: string;
  userName: string;
}

const ChatBar = ({socket}: { socket: Socket<any, any> }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on('newUserResponse', (data: User[]) => setUsers(data))
  }, [socket, users]);

  return (
      <div className="chat__sidebar">
        <h2>Open Chat</h2>

        <div>
          <h4 className="chat__header">ACTIVE USERS</h4>
          <div className="chat__users">
            {users.map((user) => (
                <p key={user.socketID}>{user.userName}</p>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ChatBar;
