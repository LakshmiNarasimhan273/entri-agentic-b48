import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import initialConversations from "./data/conversations";

// Returns the current time like "10:45 PM"
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [message, setMessage] = useState("");

  // Find the full conversation object for the selected id (undefined if none selected)
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId
  );

  function handleSelectConversation(id) {
    setSelectedConversationId(id);
    setMessage(""); // start with an empty input in the newly selected chat
  }

  function handleBack() {
    setSelectedConversationId(null); // used by the back button on mobile
  }

  function handleSendMessage() {
    const text = message.trim();

    // Do nothing for empty messages or when no chat is open
    if (text === "" || !selectedConversation) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: text,
      timestamp: getCurrentTime(),
    };

    // Immutable update: build new objects/arrays instead of changing the old ones
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === selectedConversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
        };
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setMessage("");
  }

  return (
    <Container fluid className="chat-app p-0">
      <Row className="g-0 h-100">
        {/* Sidebar: on mobile it is hidden once a chat is open */}
        <Col
          xs={12}
          md={4}
          lg={3}
          className={`h-100 bg-white border-end ${selectedConversation ? "d-none d-md-flex" : "d-flex"}`}
        >
          <Sidebar
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
          />
        </Col>

        {/* Chat area: on mobile it is hidden until a chat is selected */}
        <Col
          xs={12}
          md={8}
          lg={9}
          className={`h-100 flex-column ${selectedConversation ? "d-flex" : "d-none d-md-flex"}`}
        >
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              message={message}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
              onBack={handleBack}
            />
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center h-100 text-muted">
              <i className="bi bi-chat-dots fs-1 mb-2"></i>
              <p className="mb-0">Select a conversation to start chatting</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
