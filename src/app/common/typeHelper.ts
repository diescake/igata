type ExtractFunctionReturnTypes<T> = { [K in keyof T]: T[K] extends (...args: any) => any ? ReturnType<T[K]> : never }

type Unbox<T> = T extends { [K in keyof T]: infer U } ? U : never

export type CreateActionTypes<T> = Unbox<ExtractFunctionReturnTypes<T>>

export type CreateDispatcherTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? (...args: Parameters<T[K]>) => void : never
}
