import { getKeyId, newRandomId } from "./utils";

export const storeManager: { [key: string]: (() => void)[] } = {
    default: [],
};

export function store(storeClass: any, onLoad?: (key: string, defaultValue: string) => any, onSet?: (key: string, value: string) => void) {
    Object.keys(storeClass).forEach((k) => {
        let value = onLoad?.(k, storeClass[k]) || storeClass[k];

        Object.defineProperty(storeClass, k, {
            get: () => {
                return value;
            },
            set: (v: any) => {
                value = v;
                // Updating the state
                storeManager.default.forEach((cb) => cb());
                storeManager[getKeyId(storeClass, k)].forEach((cb) => cb());

                onSet?.(k, v);
            },
        });

        storeClass[`__::${k}::__`] = newRandomId();
    });
}


