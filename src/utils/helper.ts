import { Bounds, DragAreaBounds } from "../types";

export const getEventPosition = (e: PointerEvent) => ({
  currentX: e.pageX,
  currentY: e.pageY,
});

export const getDraggedSectionBounds = (
  { currentX, currentY }: { currentX: number; currentY: number },
  { startX, startY }: { startX: number; startY: number }
): DragAreaBounds => {
  const top = Math.min(startY, currentY);
  const left = Math.min(startX, currentX);
  const right = Math.max(startX, currentX);
  const bottom = Math.max(startY, currentY);

  const width = right - left;
  const height = bottom - top;

  const viewportTop = top - window.scrollY;
  const viewportLeft = left - window.scrollX;

  return {
    top,
    right,
    bottom,
    left,
    width,
    height,
    viewportTop,
    viewportBottom: viewportTop + height,
    viewportLeft,
    viewportRight: viewportLeft + width,
  };
};

export const getClientBounds = (client: HTMLElement): Bounds => {
  const { x, y, width, height } = client.getBoundingClientRect();

  const left = window.scrollX + x;
  const top = window.scrollY + y;

  return { top, right: left + width, bottom: top + height, left };
};

export const isElementWithinDraggedSection = (
  { top: clientTop, right: clientRight, bottom: clientBottom, left: clientLeft }: Bounds,
  { top: dragTop, right: dragRight, bottom: dragBottom, left: dragLeft }: DragAreaBounds
) =>
  dragTop <= clientBottom &&
  dragRight >= clientLeft &&
  dragBottom >= clientTop &&
  dragLeft <= clientRight;

export const removeElement = (list: HTMLElement[], element: HTMLElement) => {
  const findIdx = list.findIndex((el) => el === element);
  if (findIdx !== -1) list.splice(findIdx, 1);
};

export const toggleItemInList = (list: number[], item: number) => {
  if (!list.includes(item)) return [...list, item];

  return list.filter((v) => v !== item);
};

export const getClientId = (client: HTMLElement) => Number(client.dataset.id);

export const printdraggedSection = (
  draggedSection: HTMLDivElement,
  { width, height, viewportTop, viewportRight, viewportBottom, viewportLeft }: DragAreaBounds
) => {
  draggedSection.style.cssText = `
  inset: ${viewportTop}px ${viewportRight}px ${viewportBottom}px ${viewportLeft}px;
  width: ${width}px;
  height: ${height}px;
`;
};
