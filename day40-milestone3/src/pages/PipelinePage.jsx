import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import PipelineColumn from '../components/PipelineColumn';
import DealModal from '../components/DealModal';
import { STAGES, addDeal, updateDeal, deleteDeal, moveDeal } from '../store/dealsSlice';

export default function PipelinePage() {
  const deals = useSelector((s) => s.deals.items);
  const contacts = useSelector((s) => s.contacts.items);
  const dispatch = useDispatch();
  // null = closed, {} = add new, deal object = edit
  const [modalDeal, setModalDeal] = useState(null);

  const handleDragEnd = ({ draggableId, source, destination }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    dispatch(moveDeal({ id: draggableId, toStage: destination.droppableId, toIndex: destination.index }));
  };

  const handleSave = (deal) => {
    dispatch(deal.id ? updateDeal(deal) : addDeal(deal));
    setModalDeal(null);
  };

  const handleDelete = (deal) => {
    if (window.confirm(`Delete deal "${deal.title}"?`)) dispatch(deleteDeal(deal.id));
  };

  return (
    <>
      <div className="pipeline-header">
        <h2>Deal Pipeline</h2>
        <button className="btn btn-primary" onClick={() => setModalDeal({})}>
          <i className="fas fa-plus"></i>&nbsp;Add Deal
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="pipeline-board">
          {STAGES.map((stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              deals={deals.filter((d) => d.stage === stage.id)}
              onEdit={setModalDeal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      {modalDeal && (
        <DealModal
          deal={modalDeal.id ? modalDeal : null}
          contacts={contacts}
          onSave={handleSave}
          onClose={() => setModalDeal(null)}
        />
      )}
    </>
  );
}
