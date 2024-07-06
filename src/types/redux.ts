import {AppDispatch, RootState} from "@/store/store.ts";

export type AsyncThunkConfig<R> = {
  state: RootState,
  dispatch: AppDispatch,
  extra?: unknown;
  rejectValue: R,
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}
