import useTasks from "../hooks/useTasks";

function Kanban() {

  const {
    tasks,
    loading,
    updateTask
  } = useTasks();

  const todoTasks = tasks.filter(
    (task) =>
      task.status === "todo"
  );

  const progressTasks = tasks.filter(
    (task) =>
      task.status === "in-progress"
  );

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "completed"
  );

  const handleDragStart = (
    event,
    id
  ) => {

    event.dataTransfer.setData(
      "taskId",
      id
    );
  };

  const handleDragOver = (event) => {

    event.preventDefault();

  };

  const handleDrop = async (
    event,
    newStatus
  ) => {

    event.preventDefault();

    const id =
      event.dataTransfer.getData(
        "taskId"
      );

    const task = tasks.find(
      (task) => task.id === id
    );

    if (!task) {
      return;
    }

    const updatedTask = {
      ...task,
      status: newStatus
    };

    await updateTask(
      id,
      updatedTask
    );
  };

  if (loading) {
    return (
      <h3>
        Loading...
      </h3>
    );
  }

  return (
    <div>

      <h2>
        Kanban Board
      </h2>

      <p className="text-muted">
        Drag and drop tasks between columns
        to change their status.
      </p>

      <div className="row g-4 mt-2">

        {/* TODO */}

        <div className="col-md-4">

          <div
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(
                event,
                "todo"
              )
            }
          >

            <div className="bg-secondary text-white p-3">

              <h5 className="mb-0">
                Todo ({todoTasks.length})
              </h5>

            </div>

            <div className="p-3">

              {todoTasks.map((task) => (

                <div
                  key={task.id}
                  className="card mb-3 shadow-sm"
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      task.id
                    )
                  }
                >

                  <div className="card-body">

                    <h6>
                      {task.title}
                    </h6>

                    <p className="small text-muted">
                      {task.description}
                    </p>

                    <small>
                      👤 {task.assignee}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="col-md-4">

          <div
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(
                event,
                "in-progress"
              )
            }
          >

            <div className="bg-warning p-3">

              <h5 className="mb-0">
                In Progress ({progressTasks.length})
              </h5>

            </div>

            <div className="p-3">

              {progressTasks.map((task) => (

                <div
                  key={task.id}
                  className="card mb-3 shadow-sm"
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      task.id
                    )
                  }
                >

                  <div className="card-body">

                    <h6>
                      {task.title}
                    </h6>

                    <p className="small text-muted">
                      {task.description}
                    </p>

                    <small>
                      👤 {task.assignee}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* COMPLETED */}

        <div className="col-md-4">

          <div
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(
                event,
                "completed"
              )
            }
          >

            <div className="bg-success text-white p-3">

              <h5 className="mb-0">
                Completed ({completedTasks.length})
              </h5>

            </div>

            <div className="p-3">

              {completedTasks.map((task) => (

                <div
                  key={task.id}
                  className="card mb-3 shadow-sm"
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(
                      event,
                      task.id
                    )
                  }
                >

                  <div className="card-body">

                    <h6>
                      {task.title}
                    </h6>

                    <p className="small text-muted">
                      {task.description}
                    </p>

                    <small>
                      👤 {task.assignee}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Kanban;