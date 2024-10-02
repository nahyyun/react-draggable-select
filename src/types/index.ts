export interface Bounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface DragAreaBounds extends Bounds {
  width: number;
  height: number;
  viewportTop: number;
  viewportRight: number;
  viewportBottom: number;
  viewportLeft: number;
}

export interface draggedElements {
  prev: HTMLElement[];
  curr: HTMLElement[];
}

export type DragSelectFn = (
  draggedSectionRect: DragAreaBounds,
  draggedElements: draggedElements
) => void;

export interface SelectionContext {
  selectableTargets: HTMLElement[];
  selectedItems: number[];
  selectByDrag: DragSelectFn;
  selectByClick: (client: EventTarget | null) => void;
}
