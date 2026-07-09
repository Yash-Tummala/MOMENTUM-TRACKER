function TaskRow({ task }) {

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="task-row">

      <div className="task-name">

        {task.name}

      </div>

      <div className="checkbox-container">

        {
          days.map((day) => (

            <input
              key={day}
              type="checkbox"
            />

          ))
        }

      </div>

    </div>
  );
}

export default TaskRow;