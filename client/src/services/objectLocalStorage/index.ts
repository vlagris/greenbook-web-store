import {createLocalStorageController} from "@/services/objectLocalStorage/createLocalStorageController.ts";
import {CartState, LocalStorageNames} from "@/types.ts";


export const objectLocalStorage  = {
  [LocalStorageNames.userId]: createLocalStorageController<string>(LocalStorageNames.userId),
  [LocalStorageNames.cart]: createLocalStorageController<CartState>(LocalStorageNames.cart)
}

