import {
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  
  export const useAppSensors = () => {
    return useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 50
        }
      }),
    );
  };