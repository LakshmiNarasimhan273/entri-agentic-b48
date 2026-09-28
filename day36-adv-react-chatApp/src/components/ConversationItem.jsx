import { ListGroup } from "react-bootstrap";

function ConversationItem({ conversation, isActive, onSelect }) {
  const { contact, messages } = conversation;

  // The preview is always the last message, so it updates automatically after sending
  const lastMessage = messages[messages.length - 1];

  return (
    <ListGroup.Item
      action
      active={isActive}
      onClick={() => onSelect(conversation.id)}
      className="d-flex align-items-center py-3"
    >
      <img
        src={contact.avatar}
        alt={contact.name}
        className="avatar rounded-circle me-3"
      />

      <div className="flex-grow-1 overflow-hidden">
        <div className="d-flex justify-content-between align-items-baseline">
          <span className="fw-semibold text-truncate">{contact.name}</span>
          <small className={`ms-2 flex-shrink-0 ${isActive ? "text-white-50" : "text-muted"}`}>
            {lastMessage ? lastMessage.timestamp : ""}
          </small>
        </div>
        <div className={`small text-truncate ${isActive ? "text-white-50" : "text-muted"}`}>
          {lastMessage ? lastMessage.text : "No messages yet"}
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default ConversationItem;
