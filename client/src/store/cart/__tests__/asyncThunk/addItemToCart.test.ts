import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import { addItemToCart, addCartItem } from "@/store/cart/actions.ts";
import { storeState } from "@/store/cart/__tests__/cartActions.test.ts";
import * as apiCart from "@/services/api/cart.ts";


const book = {
  id: "s1s1s1s1s1s1",
  title: "title",
  price: 10,
  genres: [],
  authors: [],
  image: "image",
  rating: {
    rate: 4,
    count: 122,
  }
}


describe('cart asyncThunk addItemToCart', () => {
  const mockedAddCartItem = jest.spyOn(apiCart, "addCartItem");

  afterEach(() => {
    mockedAddCartItem.mockClear()
  });

  it('should add cart item without sending api request', async () => {
    const calls = await getAsyncThunkCalls(addItemToCart(book), storeState);

    expect(calls[1][0]).toEqual(expect.any(Function));
    expect(mockedAddCartItem).toHaveBeenCalledTimes(0);
  });

  it('should add cart item without sending api request', async () => {
    book.id = "q1q1q1q1q1";
    const calls = await getAsyncThunkCalls(addItemToCart(book), storeState);

    expect(calls[1][0].type).toEqual(addCartItem.type);
    expect(calls[1][0].payload).toEqual(book);
    expect(mockedAddCartItem).toHaveBeenCalledTimes(0);
  });

  it('should add cart item with sending api request', async () => {
    book.id = "q1q1q1q1q1";
    storeState.auth.user.id = "w1w2w3w4w5";
    const calls = await getAsyncThunkCalls(addItemToCart(book), storeState);

    expect(calls[1][0].type).toEqual(addCartItem.type);
    expect(calls[1][0].payload).toEqual(book);
    expect(mockedAddCartItem).toHaveBeenCalledTimes(1);
    expect(mockedAddCartItem).toHaveBeenCalledWith(book.id);
  });
});