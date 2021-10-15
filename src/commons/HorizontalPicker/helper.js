export const linearIntepolate = (x1, x2, y1, y2, x) => {
  return y1 + (y2 - y1) * ((x - x1) / (x2 - x1));
};
