import { getKeyId, newRandomId } from "./utils";

export const storeManager: { [key: string]: (() => void)[] } = {
    default: [],
};

export function store(storeClass: any) {
    Object.keys(storeClass).forEach((k) => {
        let value = storeClass[k];

        Object.defineProperty(storeClass, k, {
            get: () => {
                return value;
            },
            set: (v: any) => {
                value = v;
                // Updating the state
                storeManager.default.forEach((cb) => cb());
                storeManager[getKeyId(storeClass, k)].forEach((cb) => cb());
            },
        });

        storeClass[`__::${k}::__`] = newRandomId();
    });
}


