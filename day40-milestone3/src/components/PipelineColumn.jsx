import { Droppable } from '@hello-pangea/dnd';
import DealCard from './DealCard';
import { pluralDeals } from '../utils/helpers';

export default function PipelineColumn({ stage, deals, onEdit, onDelete }) {
  return (
    <div className="pipeline-column">
      <div className="pipeline-column-header">
        <h3>{stage.title}</h3>
        <span className="deal-count">{pluralDeals(deals.length)}</span>
      </div>
      <Droppable droppableId={stage.id}>
        {(provided, snapshot) => (
          <div
            className={`deal-cards${snapshot.isDraggingOver ? ' is-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {deals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} onEdit={onEdit} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
