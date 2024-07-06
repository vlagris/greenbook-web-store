import { CartState, LocalStorageNames } from "@/types";
import { createStorageController } from "@/services/storage/createStorageController.ts";



export const storage  = {
  local: {
    [LocalStorageNames.userId]: createStorageController<string>(LocalStorageNames.userId),
    [LocalStorageNames.cart]: createStorageController<CartState>(LocalStorageNames.cart)
    }
}

