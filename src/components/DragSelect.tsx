import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { getDraggedSectionBounds, getEventPosition, printdraggedSection } from "../utils/helper";
import { draggedElements, SelectionContext } from "../types";

import "../index.css";

interface DragSelectProps {
  selectionContext: SelectionContext;
  draggableSection?: MutableRefObject<HTMLElement | null>;
  draggedSectionClassName?: string;
  onSelectionComplete?: (selected: number[]) => void;
}

export default function DragSelect({
  selectionContext: { selectableTargets, selectedItems, selectByClick, selectByDrag },
  draggableSection = { current: null },
  draggedSectionClassName = "",
  onSelectionComplete,
}: DragSelectProps) {
  const draggedSection = useRef<HTMLDivElement | null>(null);

  const dragState = useRef({
    position: {
      startX: 0,
      startY: 0,
    },
    isDragging: false,
  });

  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const draggedElements = useRef<draggedElements>({
    prev: [],
    curr: [],
  });

  const handleDownEvent = useCallback((e: PointerEvent) => {
    const { currentX, currentY } = getEventPosition(e);

    dragState.current = {
      position: { startX: currentX, startY: currentY },
      isDragging: false,
    };
    setIsStart(true);
    setIsEnd(false);
  }, []);

  const handleMoveEvent = useCallback(
    (e: PointerEvent) => {
      if (!draggedSection.current || !isStart) return;

      dragState.current.isDragging = true;

      const eventPosition = getEventPosition(e);
      const draggedSectionRect = getDraggedSectionBounds(eventPosition, dragState.current.position);

      printdraggedSection(draggedSection.current, draggedSectionRect);

      selectByDrag(draggedSectionRect, draggedElements.current);

      draggedElements.current.prev = draggedElements.current.curr;
    },
    [isStart, selectableTargets]
  );

  const handleUpEvent = useCallback(
    (e: PointerEvent) => {
      if (!draggedSection.current) return;

      setIsStart(false);
      setIsEnd(true);

      if (!dragState.current.isDragging) selectByClick(e.target);

      resetDragInfo();
    },
    [selectableTargets, selectedItems]
  );

  const resetDragInfo = () => {
    dragState.current = {
      isDragging: false,
      position: { startX: 0, startY: 0 },
    };

    draggedElements.current = {
      prev: [],
      curr: [],
    };
  };

  useEffect(() => {
    if (isEnd && onSelectionComplete) onSelectionComplete(selectedItems);
  }, [isEnd, onSelectionComplete, selectedItems]);

  useEffect(() => {
    const target = draggableSection.current || document.body;
    target.style.userSelect = "none";

    target.addEventListener("pointerdown", handleDownEvent);
    target.addEventListener("pointermove", handleMoveEvent);
    target.addEventListener("pointerup", handleUpEvent);
    target.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

    return () => {
      target.removeEventListener("pointerdown", handleDownEvent);
      target.removeEventListener("pointermove", handleMoveEvent);
      target.removeEventListener("pointerup", handleUpEvent);
      target.removeEventListener("touchmove", (e) => e.preventDefault());
    };
  }, [handleDownEvent, handleMoveEvent, handleUpEvent]);

  return (
    <>
      {isStart && (
        <div ref={draggedSection} className={`ds-dragged-section ${draggedSectionClassName}`} />
      )}
    </>
  );
}
