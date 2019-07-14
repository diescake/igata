import { Reducer } from 'redux'
import { NetworkAction, Type } from '@/app/actions/network'
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

    case Type.DECREMENT_CONNECTION:
      return { connectionCount: state.connectionCount - 1 }

    default:
      return state
  }
}
