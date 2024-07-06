// import React, { PropsWithChildren } from 'react'
// import { render } from '@testing-library/react'
// import type { RenderOptions } from '@testing-library/react'
// import { Provider } from 'react-redux'
//
// import type { AppStore, RootState } from '@/store'
// import { setupStore } from '@/store'
//
//
//
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: Partial<RootState>,
//   store?: AppStore
// }
//
// export function renderWithProviders(
//   ui: React.ReactNode,
//   {
//     preloadedState = {},
//     store = setupStore(preloadedState),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): React.ReactNode {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
// }
//
//
//
// export const getAsyncThunkCalls = async (
//   thunk: (dispatch: any, getState: () => any, extra: any) => Promise<any>,
//   rootState: any,
//   extra?: any
// ): Promise<any[]> => {
//   const dispatch = jest.fn();
//   await thunk(dispatch, () => rootState, extra);
//   return dispatch.mock.calls;
// }
