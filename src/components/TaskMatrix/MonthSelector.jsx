import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function MonthSelector() {
  return (
    <div className="month-selector">

      <button>

        <FaChevronLeft />

      </button>

      <div className="month-info">

        <h2>July 2026</h2>

        <p>31 Days</p>

      </div>

      <button>

        <FaChevronRight />

      </button>

    </div>
  );
}

export default MonthSelector;