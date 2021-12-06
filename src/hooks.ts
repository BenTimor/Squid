import { useEffect, useState } from "react";
import { storeManager } from "./manager";
import { Listenable } from "./types";
import { perKeyId } from "./utils";

export function useStore(listenTo?: Listenable[]) {
    const [, setState] = useState({});

    const refreshComponent = () => setState({});

    useEffect(() => {
        // Mount store listener
        if (listenTo) {
            
            listenTo.forEach(listenable => {
                let { store, keys } = listenable;

                perKeyId(keyId => {
                    storeManager[keyId].push(refreshComponent);
                }, store, keys);
            });
        }
        else {
            storeManager.default.push(refreshComponent);
        }

        // Unmount store listener
        return () => {
            if (listenTo) {
                listenTo.forEach(listenable => {
                    let { store, keys } = listenable;

                    perKeyId(keyId => {
                        storeManager[keyId] = storeManager[keyId].filter(cb => cb !== refreshComponent);
                    }, store, keys);
                });
            }
            else {
                storeManager.default = storeManager.default.filter(cb => cb !== refreshComponent);
            }
        }
    })
}