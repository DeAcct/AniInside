export default function useBEMClass(blockOrElement, { condition, modifier }) {
  return condition
    ? `${blockOrElement} ${blockOrElement}--${modifier}`
    : blockOrElement;
}
