import {createLocalStorageController} from "@/services/localStorage/createLocalStorageController.ts";
import {CartState} from "@/types.ts";

export const userId = createLocalStorageController<string>("userId");
export const cart = createLocalStorageController<CartState>("cart");

