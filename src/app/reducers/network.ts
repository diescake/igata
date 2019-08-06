import { Reducer } from 'redux'
import { Type, NetworkAction } from '@/app/actions/network'
import { NetworkState } from '@/app/models/Network'

const defaultState: NetworkState = {
  connectionCount: 0,
}

export const networkReducer: Reducer<NetworkState, NetworkAction> = (
  state: NetworkState = defaultState,
  action: NetworkAction
) => {
  switch (action.type) {
    case Type.INCREMENT_CONNECTION:
      return { connectionCount: state.connectionCount + 1 }

    case Type.DECREMENT_CONNECTION: {
      const nextCount = state.connectionCount - 1

      if (nextCount < 0) {
        console.warn('Invalid consistency for counting the network connections.')
      }
      return { connectionCount: Math.max(nextCount, 0) }
    }

    default:
      return state
  }
}
