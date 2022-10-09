import type { ParamObjectType } from './param-object-type'

export const getParamValues = <T extends string>(
  url: T,
  params: Record<string, string>
): ParamObjectType<T> => {
  console.log(url)
  console.log(params)
  return {} as any
}
