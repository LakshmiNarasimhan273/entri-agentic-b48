import { useNavigate } from "react-router-dom";

function TaskTable({
  tasks,
  onView,
  onDelete
}) {

  const navigate = useNavigate();

  return (
    <div className="table-responsive">

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr className="text-center">

            <th>Task</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task.id}>


              <td>

                <strong>
                  {task.title}
                </strong>

                <br />

                <small className="text-muted">
                  {task.description}
                </small>

              </td>

              <td>
                {task.assignee}
              </td>

              {/* CONDITIONAL RENDERING */}

              <td>

                {task.status === "todo" && (
                  <span className="badge bg-secondary">
                    Todo
                  </span>
                )}

                {task.status === "in-progress" && (
                  <span className="badge bg-warning text-dark">
                    In Progress
                  </span>
                )}

                {task.status === "completed" && (
                  <span className="badge bg-success">
                    Completed
                  </span>
                )}

              </td>

              <td>

                {task.priority === "High" && (
                  <span className="fw-bold text-danger">
                    High
                  </span>
                )}

                {task.priority === "Medium" && (
                  <span className="fw-bold text-warning">
                    Medium
                  </span>
                )}

                {task.priority === "Low" && (
                  <span className="fw-bold text-info">
                    Low
                  </span>
                )}

              </td>

              <td>

                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#taskModal"
                  onClick={() =>
                    onView(task)
                  }
                >
                  View
                </button>

                <button
                  className="btn btn-sm btn-outline-info me-2"
                  onClick={() =>
                    navigate(
                      `/tasks/edit/${task.id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    onDelete(task.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {tasks.length === 0 && (
        <p className="text-center text-muted">
          No tasks available.
        </p>
      )}

    </div>
  );
}

export default TaskTable;