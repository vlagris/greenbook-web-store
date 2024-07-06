export function createStorageController<T>(StorageName: string) {
  return {
    storageName: StorageName,
    set(storageData: T) {
      localStorage.setItem(this.storageName, JSON.stringify(storageData));
    },
    get(): T | null {
      const jsonData = localStorage.getItem(this.storageName) || "null";
      return JSON.parse(jsonData);
    },
    remove() {
      return localStorage.removeItem(this.storageName);
    }
  }
}