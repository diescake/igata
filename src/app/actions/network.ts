import { CreateActionTypes, CreateDispatcherTypes } from '@/app/common/typeHelper'

// action types
export const Type = {
  INCREMENT_CONNECTION: 'NETWORK/INCREMENT_CONNECTION',
  DECREMENT_CONNECTION: 'NETWORK/DECREMENT_CONNECTION',
} as const

// action creators
export const incrementConnection = () => ({
  type: Type.INCREMENT_CONNECTION,
})

export const decrementConnection = () => ({
  type: Type.DECREMENT_CONNECTION,
})

export type NetworkAction = CreateActionTypes<Omit<typeof import('./network'), 'Type'>>
export type NetworkDispatchTypes = CreateDispatcherTypes<Omit<typeof import('./network'), 'Type'>>
