import { storeManager } from "./manager";

export function getKeyId(store: any, key: string) {
    return store[`__::${key}::__`];
}

export function perKeyId(callback: (keyId: string) => void, store: any, keys?: string[]) {
    (keys || Object.keys(store)).forEach((key) => {
        if (key.startsWith("__::") && key.endsWith("::__")) {
            return;
        }

        callback(getKeyId(store, key));
    });
}

export function newRandomId(): string {
    let result = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (storeManager[result]) {
        return newRandomId();
    }

    storeManager[result] = [];

    return result;
}