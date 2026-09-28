import { useState } from "react";

import useTasks from "../hooks/useTasks";

import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";

function Dashboard() {

  const {
    tasks,
    loading,
    addTask,
    deleteTask
  } = useTasks();

  const [selectedTask, setSelectedTask] =
    useState(null);

  const todoCount = tasks.filter(
    (task) =>
      task.status === "todo"
  ).length;

  const progressCount = tasks.filter(
    (task) =>
      task.status === "in-progress"
  ).length;

  const completedCount = tasks.filter(
    (task) =>
      task.status === "completed"
  ).length;

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (confirmDelete) {
      await deleteTask(id);
    }
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
        Dashboard
      </h2>

      <p className="text-muted">
        Manage your tasks
      </p>

      {/* STATUS CARDS */}

      <div className="row g-3 mb-5">

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <p className="text-muted mb-1">
                Total Tasks
              </p>

              <h2>
                {tasks.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <p className="text-muted mb-1">
                Todo
              </p>

              <h2>
                {todoCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <p className="text-muted mb-1">
                In Progress
              </p>

              <h2>
                {progressCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <p className="text-muted mb-1">
                Completed
              </p>

              <h2>
                {completedCount}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ADD TASK */}

      <div className="card shadow-sm mb-5">

        <div className="card-header">
          <h5 className="mb-0">
            Add New Task
          </h5>
        </div>

        <div className="card-body">

          <TaskForm
            addTask={addTask}
          />

        </div>

      </div>

      {/* TASK TABLE */}

      <div>

        <h4 className="mb-3">
          All Tasks
        </h4>

        <TaskTable
          tasks={tasks}
          onView={setSelectedTask}
          onDelete={handleDelete}
        />

      </div>

      {/* MODAL */}

      <TaskModal
        task={selectedTask}
      />

    </div>
  );
}

export default Dashboard;