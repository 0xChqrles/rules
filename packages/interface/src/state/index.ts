import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ApplicationSlice, createApplicationSlice } from './application'

export type StoreState = ApplicationSlice

const PERSISTING_KEYS: (keyof StoreState)[] = []

export const useBoundStore = create<StoreState>()(
  persist(
    immer<StoreState>((...a) => ({
      ...createApplicationSlice(...a),
    })),
    {
      name: 'rules-storage-0.1.0', // bump version after breaking changes
      partialize: (state: StoreState) =>
        PERSISTING_KEYS.reduce<StoreState>((acc, key) => {
          ;(acc as any)[key] = state[key]
          return acc
        }, {} as StoreState),
    },
  ),
)
