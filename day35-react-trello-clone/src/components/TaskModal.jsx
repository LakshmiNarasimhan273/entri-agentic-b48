function TaskModal({ task }) {

  if (!task) {
    return null;
  }

  return (
    <div
      className="modal fade"
      id="taskModal"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Task Details
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            

            <h4>
              {task.title}
            </h4>

            <p>
              {task.description}
            </p>

            <hr />

            <p>
              <strong>
                Status:
              </strong>{" "}
              {task.status}
            </p>

            <p>
              <strong>
                Priority:
              </strong>{" "}
              {task.priority}
            </p>

            <p>
              <strong>
                Assignee:
              </strong>{" "}
              {task.assignee}
            </p>

          </div>

          <div className="modal-footer">

            <p className="text-muted"># {task.id}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TaskModal;