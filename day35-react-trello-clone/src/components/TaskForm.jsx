import { useState } from "react";

function TaskForm({ addTask }) {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("todo");

  const [priority, setPriority] =
    useState("Medium");

  const [assignee, setAssignee] =
    useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();

    const task = {
      title,
      description,
      status,
      priority,
      assignee
    };

    await addTask(task);

    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("Medium");
    setAssignee("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="row">

        <div className="col-md-6 mb-3">

          <label className="form-label">
            Task Title
          </label>

          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

        </div>

        <div className="col-md-6 mb-3">

          <label className="form-label">
            Assignee
          </label>

          <input
            type="text"
            className="form-control"
            value={assignee}
            onChange={(event) =>
              setAssignee(event.target.value)
            }
            required
          />

        </div>

      </div>

      <div className="mb-3">

        <label className="form-label">
          Description
        </label>

        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          required
        />

      </div>

      <div className="row">

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
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

        <div className="col-md-4 mb-3">

          <label className="form-label">
            Priority
          </label>

          <select
            className="form-select"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value)
            }
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

      </div>

      <button
        className="btn btn-primary"
        type="submit"
      >
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;