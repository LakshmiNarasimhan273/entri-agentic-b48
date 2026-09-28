import { Button, Form, InputGroup } from "react-bootstrap";

function MessageInput({ message, onMessageChange, onSendMessage }) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendMessage();
    }
  }

  return (
    <div className="bg-white border-top p-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="primary" onClick={onSendMessage} aria-label="Send message">
          <i className="bi bi-send-fill me-1"></i>
          <span className="d-none d-sm-inline">Send</span>
        </Button>
      </InputGroup>
    </div>
  );
}

export default MessageInput;
