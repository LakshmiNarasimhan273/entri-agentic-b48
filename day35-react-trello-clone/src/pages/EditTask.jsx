import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  useEffect(() => {

    fetch(
      `http://localhost:5000/tasks/${id}`
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setTask(data);
      });

  }, [id]);

  const handleChange = (event) => {

    setTask({
      ...task,
      [event.target.name]:
        event.target.value
    });

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(task)
      }
    );

    alert(
      "Task updated successfully!"
    );

    navigate("/");
  };

  if (!task) {
    return (
      <h3>
        Loading...
      </h3>
    );
  }

  return (
    <div>

      <h2>
        Edit Task
      </h2>

      <div className="card mt-4">

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                value={task.title}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                name="description"
                className="form-control"
                value={task.description}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Assignee
              </label>

              <input
                type="text"
                name="assignee"
                className="form-control"
                value={task.assignee}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={task.status}
                onChange={handleChange}
              >

                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Priority
              </label>

              <select
                name="priority"
                className="form-select"
                value={task.priority}
                onChange={handleChange}
              >

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>

              </select>

            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Update Task
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() =>
                navigate("/")
              }
            >
              Cancel
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditTask;