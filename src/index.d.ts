import type { ParamObjectType } from './param-object-type'

declare const getParamValues: <T extends string>(
  url: T,
  params: Record<string, string>
) => ParamObjectType<T>

export { getParamValues }

export type { ParamObjectType }
