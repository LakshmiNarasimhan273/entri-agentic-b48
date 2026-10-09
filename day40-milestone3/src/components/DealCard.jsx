import { Draggable } from '@hello-pangea/dnd';
import { formatCurrency } from '../utils/helpers';

export default function DealCard({ deal, index, onEdit, onDelete }) {
  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided) => (
        <div
          className="deal-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="deal-card-title">{deal.title}</div>
          <div className="deal-card-details">
            <span>Value: {formatCurrency(deal.value)}</span>
            <span>Contact: {deal.contactName}</span>
            <span>{deal.stage === 'won_lost' ? 'Closed' : 'Due'}: {deal.dueDate}</span>
          </div>
          <div className="deal-card-actions">
            <button className="action-button" title="Edit" onClick={() => onEdit(deal)}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="action-button" title="Delete" onClick={() => onDelete(deal)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
