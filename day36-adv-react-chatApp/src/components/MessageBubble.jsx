function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`d-flex mb-2 ${isUser ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`message-bubble px-3 py-2 rounded-4 ${
          isUser ? "bg-primary text-white" : "bg-white border"
        }`}
      >
        <div>{message.text}</div>
        <div
          className={`text-end mt-1 ${isUser ? "text-white-50" : "text-muted"}`}
          style={{ fontSize: "0.7rem" }}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
