import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatWindow({ conversation, message, onMessageChange, onSendMessage, onBack }) {
  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader
        contact={conversation.contact}
        status={conversation.status}
        onBack={onBack}
      />
      <MessageList messages={conversation.messages} />
      <MessageInput
        message={message}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}

export default ChatWindow;
