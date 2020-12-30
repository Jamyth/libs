const isDOM = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

export const DOMUtil = Object.freeze({
  isDOM,
});
