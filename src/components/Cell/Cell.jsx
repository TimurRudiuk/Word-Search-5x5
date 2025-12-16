import "./Cell.css";

function Cell({ letter, selected, lastSelected, found, order, onClick }) {
  return (
    <div
      className={`cell ${selected ? "selected" : ""} ${lastSelected ? "last-selected" : ""} ${found ? "found" : ""}`}
      onClick={onClick}
    >
      <span className="cell-letter">{letter}</span>
      {order && (
        <div className="cell-order">{order}</div>
      )}
    </div>
  );
}

export default Cell;