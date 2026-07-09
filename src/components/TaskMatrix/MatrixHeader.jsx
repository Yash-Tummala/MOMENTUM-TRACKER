function MatrixHeader() {

    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    console.log(days.length);

    return (

        <div className="matrix-header">

            <div className="task-title">

                Task

            </div>

            <div className="days-container">

                {

                    days.map((day) => (

                        <div
                            key={day}
                            className="day-cell"
                        >

                            {day}

                        </div>

                    ))

                }

            </div>

        </div>

    )

}

export default MatrixHeader;