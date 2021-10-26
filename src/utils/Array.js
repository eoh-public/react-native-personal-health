export const arrayRange = (start, stop, step) =>
  Array((stop - start) / step + 1)
    .fill(start)
    .map((x, y) => x + y * step);
