import { mainApi } from "@/services/api/mainApi.ts";
import { getCart, createCart, addCartItem, removeCartItem, updateCartItem } from "@/services/api/cart.ts";



const cartItemResponse = {
   bookId: {
     _id: "1",
     title: "title",
     price: 10,
     genres: ["genres"],
     authors: ["authors"],
     image: "image",
     rating: {
       rate: 4.5,
       count: 11,
     }
   },
  quantity: 2
}
const cartItem = {
  id: "1",
  title: "title",
  price: 10,
  image: "image",
  quantity: 2
}
const cartItemRequest = {
  bookId: cartItem.id,
  quantity: cartItem.quantity
}
const responseError = { error: 'error' };


describe('cart api', () => {

  it('should return cart from the getCart request',  async () => {
    jest.spyOn(mainApi, "get").mockResolvedValue({ data: {items: [cartItemResponse, cartItemResponse]} });

    const result = await getCart();

    expect(result.items).toEqual([cartItem, cartItem])
    expect(result.totalQuantity).toEqual(4)
    expect(mainApi.get).toHaveBeenCalled()
    expect(mainApi.get).toHaveBeenCalledWith("/cart/")
  });

  it('should return error from the getCart request',  async () => {
    jest.spyOn(mainApi, "get").mockRejectedValue(responseError);
    try {
      await getCart();
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mainApi.get).toHaveBeenCalled()
    expect(mainApi.get).toHaveBeenCalledWith("/cart/")
  });


  it('should return cart from the createCart request',  async () => {
    jest.spyOn(mainApi, "post").mockResolvedValue({ data: {items: [cartItemResponse, cartItemResponse]} });

    const result = await createCart([cartItem, cartItem]);

    expect(result.items).toEqual([cartItem, cartItem])
    expect(result.totalQuantity).toEqual(4)
    expect(mainApi.post).toHaveBeenCalled()
    expect(mainApi.post).toHaveBeenCalledWith("/cart/", { items: [ cartItemRequest, cartItemRequest ]})
  });

  it('should return error from the createCart request',  async () => {
    jest.spyOn(mainApi, "post").mockRejectedValue(responseError);
    try {
      await createCart([cartItem, cartItem]);
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mainApi.post).toHaveBeenCalled()
    expect(mainApi.post).toHaveBeenCalledWith("/cart/", { items: [ cartItemRequest, cartItemRequest ]})
  });


  it('should return cartItem from the addCartItem request',  async () => {
    jest.spyOn(mainApi, "post").mockResolvedValue({ data: cartItemResponse });

    const result = await addCartItem("qwerty");

    expect(result).toEqual(cartItem)
    expect(mainApi.post).toHaveBeenCalled()
    expect(mainApi.post).toHaveBeenCalledWith("/cart/qwerty")
  });

  it('should return error from the addCartItem request',  async () => {
    jest.spyOn(mainApi, "post").mockRejectedValue(responseError);
    try {
      await addCartItem("qwerty");
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mainApi.post).toHaveBeenCalled()
    expect(mainApi.post).toHaveBeenCalledWith("/cart/qwerty")
  });


  it('should return deleted cartItem from the removeCartItem request',  async () => {
    jest.spyOn(mainApi, "delete").mockResolvedValue({ data: cartItemResponse });

    const result = await removeCartItem("qwerty");

    expect(result).toEqual(cartItem)
    expect(mainApi.delete).toHaveBeenCalled()
    expect(mainApi.delete).toHaveBeenCalledWith("/cart/qwerty")
  });

  it('should return error from the removeCartItem request',  async () => {
    jest.spyOn(mainApi, "delete").mockRejectedValue(responseError);
    try {
      await removeCartItem("qwerty");
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mainApi.delete).toHaveBeenCalled()
    expect(mainApi.delete).toHaveBeenCalledWith("/cart/qwerty")
  });


  it('should return updated cartItem from the updateCartItem request',  async () => {
    jest.spyOn(mainApi, "patch").mockResolvedValue({ data: cartItemResponse });
    const requestData = { id: "qwerty", quantity: 2 }

    const result = await updateCartItem(requestData);

    expect(result).toEqual(cartItem)
    expect(mainApi.patch).toHaveBeenCalled()
    expect(mainApi.patch).toHaveBeenCalledWith("/cart/qwerty", { quantity: 2 })
  });

  it('should return error from the updateCartItem request',  async () => {
    jest.spyOn(mainApi, "patch").mockRejectedValue(responseError);
    const requestData = { id: "qwerty", quantity: 2 }

    try {
      await updateCartItem(requestData);
    } catch (err) {
      expect(err).toEqual(responseError);
    }
    expect(mainApi.patch).toHaveBeenCalled()
    expect(mainApi.patch).toHaveBeenCalledWith("/cart/qwerty", { quantity: 2 })
  });
});