// General
type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never

// Actions
interface Action {
  type: any
  payload?: any
}

type ActionCreator = (...args: any) => Action
type IsActionCreator<T> = T extends ActionCreator ? T : never

type ExtractFunctionReturnType<T> = ReturnType<IsActionCreator<T>>

type ExtractFunctionReturnTypes<T> = {
  [K in keyof T]: ExtractFunctionReturnType<T[K]>
}

export type CreateActionTypes<T> = Unbox<ExtractFunctionReturnTypes<T>>

type ExtractFunctionParameterType<T> = Parameters<IsActionCreator<T>>
type CreateDispatcherType<T> = (...args: ExtractFunctionParameterType<T>) => void

export type CreateDispatcherTypes<T> = {
  [K in keyof T]: CreateDispatcherType<T[K]>
}
