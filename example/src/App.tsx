import { DragSelect, useSelection } from "react-draggable-select";
import "./index.css";

export default function App() {
  const items = Array.from({ length: 20 }, (v, i) => i);

  const { selectionContext, isSelected, selectedItems, setRef } = useSelection();

  return (
    <div className="app">
      <h1>react-draggable-select demo</h1>
      <h2>selected: {selectedItems.sort((a, b) => a - b).join(", ")}</h2>

      <DragSelect selectionContext={selectionContext} />
      <div className="list-wrapper">
        {items.map((v, i) => (
          <div
            key={i}
            data-id={v}
            ref={setRef}
            className={`selectable ${isSelected(v) ? "selected" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
