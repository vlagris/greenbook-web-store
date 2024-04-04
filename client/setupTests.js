import '@testing-library/jest-dom';
import { store } from "@/store/store.ts";


const emptyStoreState = {
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
};

jest.spyOn(store, "getState").mockReturnValue(emptyStoreState);