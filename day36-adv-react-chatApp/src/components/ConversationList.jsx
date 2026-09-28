import { ListGroup } from "react-bootstrap";
import ConversationItem from "./ConversationItem";

function ConversationList({ conversations, selectedConversationId, onSelectConversation }) {
  if (conversations.length === 0) {
    return <p className="text-muted text-center small p-3 mb-0">No conversations found</p>;
  }

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === selectedConversationId}
          onSelect={onSelectConversation}
        />
      ))}
    </ListGroup>
  );
}

export default ConversationList;
