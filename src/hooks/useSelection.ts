import { useEffect, useRef, useState } from "react";
import {
  getClientBounds,
  getClientId,
  isElementWithinDraggedSection,
  removeElement,
  toggleItemInList,
} from "../utils/helper";
import { DragSelectFn } from "../types";

export default function useSelection() {
  const selectableTargetsRef = useRef<Set<HTMLElement>>(new Set([]));
  const [selectableTargets, setSelectableTargets] = useState<HTMLElement[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const setRef = (el: HTMLElement | null) => {
    if (!el) return;

    selectableTargetsRef.current.add(el);
  };

  const isSelected = (id: number) => selectedItems.includes(id);

  const selectByDrag: DragSelectFn = (draggedSectionRect, { prev, curr }) => {
    selectableTargets.forEach((client) => {
      const clientRect = getClientBounds(client);

      const isWithinDraggedSection = isElementWithinDraggedSection(clientRect, draggedSectionRect);
      const isWithinPrevDraggedSection = prev.includes(client);

      if (isWithinDraggedSection === isWithinPrevDraggedSection) return;

      if (isWithinDraggedSection) {
        curr.push(client);
      } else {
        removeElement(curr, client);
      }

      setSelectedItems((prev) => toggleItemInList(prev, getClientId(client)));
    });
  };

  const selectByClick = (client: EventTarget | null) => {
    if (client instanceof HTMLElement && selectableTargets.includes(client)) {
      setSelectedItems((prev) => toggleItemInList(prev, getClientId(client)));
    }
  };

  useEffect(() => {
    setSelectableTargets(Array.from(selectableTargetsRef.current));
  }, []);

  return {
    setRef,
    selectedItems,
    isSelected,
    selectionContext: {
      selectableTargets,
      selectedItems,
      selectByDrag,
      selectByClick,
    },
  };
}
