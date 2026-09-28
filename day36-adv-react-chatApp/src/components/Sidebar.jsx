import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import ConversationList from "./ConversationList";

function Sidebar({ conversations, selectedConversationId, onSelectConversation }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Simple search: keep conversations whose contact name contains the typed text
  const filteredConversations = conversations.filter((conversation) =>
    conversation.contact.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="p-3 border-bottom">
        <h5 className="mb-3 d-flex align-items-center">
          <i className="bi bi-chat-dots-fill text-primary me-2"></i>
          Chats
        </h5>

        <InputGroup>
          <InputGroup.Text className="bg-light">
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <div className="scroll-area flex-grow-1">
        <ConversationList
          conversations={filteredConversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>
    </div>
  );
}

export default Sidebar;
