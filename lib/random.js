export function createRng(seed = 1) {
    let s = seed >>> 0;
    return function next() {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }