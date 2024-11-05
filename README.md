# React-draggable-select
### [🚀 Try it out](https://codesandbox.io/p/sandbox/p4ykjl)
![2024-10-089 28 52-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9b7f565d-fc25-4713-8122-7ec6ec3d47c4)



## Features
- Select items by dragging or clicking
- Supports mobile
- Supports SSR
- Customizable styling




## Installation

```
npm install react-draggable-select
```



## Usage
```tsx
import { DragSelect, useSelection } from "react-draggable-select";

function App() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Ensure to use an array with unique values.

  const { selectionContext, isSelected, setRef } = useSelection();

  return (
    <div>
      <DragSelect selectionContext={selectionContext} // Required: This prop is necessary to function correctly.
      />
      <div>
        {items.map((v, i) => (
          <div
            key={i}
            data-id={v} // Required: Must be a number; it will be included in the selection result array.
            ref={setRef} // Required: Pass this ref to all selectable elements to enable proper selection tracking.
            className={`${isSelected(v) ? "selected" : ""}`}
          >
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
```
#### Note: No default styles are provided for selected items. Please specify custom styles to enhance visibility.




## API Reference
### DragSelect Components Props

| Prop Name                   | Type                  | Required | Description                                            |
|-----------------------------|-----------------------|----------|--------------------------------------------------------|
| `selectionContext`          | `object`              |     O    | Necessary for the DragSelect component to function correctly. |
| `draggedSectionClassName`   | `string`              |     x    | Class name for the dragged section. |
| `onSelectionComplete`       | `(selected: number) => void` |   x  | Callback fired when selection is complete. |

### useSelection custom hook
| return Value                | Type                  | Description                                            |
|-----------------------------|-----------------------|--------------------------------------------------------|
| `selectionContext`          | `object`              | Necessary for the DragSelect component to function correctly. |
| `isSelected`                | `(value: number) => boolean` | Function to check if an item is selected. |
| `selectedItems`             | `number[]`               | Array of currently selected items (from  `data-id` values). |
| `setRef`                    | `(el: HTMLElement \| null) => void` | Function to set a ref for selectable item. |



## Styling

You can customize the styling of the dragged section using either plain CSS or a custom class name.
### Example
You can override the default style using CSS.
```css
.ds-dragged-section {
  background-color: #8989f180;
}
```

or pass a custom class name to `draggedSectionClassName`:

```js
 <DragSelect draggedSectionClassName={customClassName} />
```
