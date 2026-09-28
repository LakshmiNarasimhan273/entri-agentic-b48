import { Button } from "react-bootstrap";

function ChatHeader({ contact, status, onBack }) {
  const isOnline = status === "Online";

  return (
    <div className="d-flex align-items-center bg-white border-bottom px-3 py-2">
      {/* Back button is only visible on small screens */}
      <Button
        variant="link"
        className="d-md-none text-dark p-0 me-3"
        onClick={onBack}
        aria-label="Back to conversations"
      >
        <i className="bi bi-arrow-left fs-4"></i>
      </Button>

      <img src={contact.avatar} alt={contact.name} className="avatar rounded-circle me-3" />

      <div>
        <div className="fw-semibold">{contact.name}</div>
        <small className={isOnline ? "text-success" : "text-muted"}>
          <i className="bi bi-circle-fill me-1" style={{ fontSize: "0.5rem" }}></i>
          {status}
        </small>
      </div>
    </div>
  );
}

export default ChatHeader;
