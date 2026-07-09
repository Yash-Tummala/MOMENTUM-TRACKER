import "./TaskMatrix.css";

import { useState } from "react";

import MonthSelector from "./MonthSelector";
import MatrixHeader from "./MatrixHeader";
import TaskRow from "./TaskRow";

function TaskMatrix() {

    const [tasks] = useState([
        {
            id: 1,
            name: "Exercise",
            importance: "High",
            completedDays: []
        },
        {
            id: 2,
            name: "Reading",
            importance: "Medium",
            completedDays: []
        },
        {
            id: 3,
            name: "Coding",
            importance: "High",
            completedDays: []
        }
    ]);

    return (

        <div className="task-matrix">

            <MonthSelector/>

            <MatrixHeader/>

            {

                tasks.map(task => (

                    <TaskRow
                        key={task.id}
                        task={task}
                    />

                ))

            }

        </div>

    );

}

export default TaskMatrix;