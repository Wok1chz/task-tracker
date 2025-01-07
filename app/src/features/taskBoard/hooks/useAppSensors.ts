import {
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
  
  export const useAppSensors = () => {
    return useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 50
        }
      }),
    );
  };