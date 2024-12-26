import { create, StateCreator } from 'zustand';
import { subscribeWithSelector, combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export function createZustandStore<T extends object, U extends object>(
  initialState: T,
  additionalStateCreator: StateCreator<
    T,
    [
      ['zustand/devtools', never],
      ['zustand/subscribeWithSelector', never],
      ['zustand/immer', never]
    ],
    [],
    U
  >
) {
  const useStore = create(
    devtools(
      subscribeWithSelector(
        immer(combine(initialState, additionalStateCreator))
      )
    )
  );
  return useStore;
}
