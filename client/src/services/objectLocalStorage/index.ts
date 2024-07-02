import {createLocalStorageController} from "@/services/objectLocalStorage/createLocalStorageController.ts";
import {CartState} from "@/types";

enum LocalStorageNames {
  userId = "userId",
  cart = "cart"
}
export const objectLocalStorage  = {
  [LocalStorageNames.userId]: createLocalStorageController<string>(LocalStorageNames.userId),
  [LocalStorageNames.cart]: createLocalStorageController<CartState>(LocalStorageNames.cart)
}

