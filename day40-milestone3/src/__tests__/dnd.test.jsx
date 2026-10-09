// jsdom has no layout engine, so real pointer/keyboard dragging can't be simulated.
// Instead we capture the onDragEnd handler given to DragDropContext and call it
// exactly as the library would, to verify the Redux wiring of the pipeline page.
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createStore from '../store';
import { loadInitialState } from '../utils/storage';

let onDragEnd;
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children, onDragEnd: h }) => { onDragEnd = h; return children; },
  Droppable: ({ children }) => children({ innerRef: () => {}, droppableProps: {}, placeholder: null }, {}),
  Draggable: ({ children }) => children({ innerRef: () => {}, draggableProps: {}, dragHandleProps: {} }),
}));

import PipelinePage from '../pages/PipelinePage';

it('dropping a card on another column updates the deal stage and persists it', () => {
  localStorage.clear();
  const store = createStore(loadInitialState());
  render(
    <Provider store={store}><MemoryRouter><PipelinePage /></MemoryRouter></Provider>
  );
  act(() => onDragEnd({
    draggableId: 'd1',
    source: { droppableId: 'new', index: 0 },
    destination: { droppableId: 'won_lost', index: 1 },
  }));
  const d1 = store.getState().deals.items.find((d) => d.id === 'd1');
  expect(d1.stage).toBe('won_lost');
  expect(JSON.parse(localStorage.getItem('crm_deals')).find((d) => d.id === 'd1').stage).toBe('won_lost');
  expect(screen.getByText('Closed: 2026-08-15')).toBeInTheDocument();

  // dropping outside any column does nothing
  act(() => onDragEnd({ draggableId: 'd2', source: { droppableId: 'new', index: 0 }, destination: null }));
  expect(store.getState().deals.items.find((d) => d.id === 'd2').stage).toBe('new');
});
