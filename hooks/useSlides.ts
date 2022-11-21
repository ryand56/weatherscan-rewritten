export const enum Slides {
  INTRO,
  INFO,
}

export interface SlideProps {
  next: () => void;
}

export const enum ActionType {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  SET = "SET",
}

interface Action {
  type: ActionType;
  payload: number;
}

interface State {
  index: number;
}

export const SlideshowReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.INCREASE:
      return { index: state.index + payload };
    case ActionType.DECREASE:
      return { index: state.index - payload };
    case ActionType.SET:
      return { index: payload };
    default:
      return state;
  }
};
