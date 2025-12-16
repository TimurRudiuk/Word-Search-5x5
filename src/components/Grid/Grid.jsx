import Cell from "../Cell/Cell";
import "./Grid.css";

function Grid() {
  const grid = Array(25).fill("");

  return (
    <div className="grid">
      {grid.map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
}

export default Grid;
