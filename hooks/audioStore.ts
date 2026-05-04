let firstClick = false;

const listeners = new Set<() => void>();

export const audioStore = {
  get: () => firstClick,

  set: (value: boolean) => {
    firstClick = value;
    listeners.forEach(fn => fn());
  },

  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
};
