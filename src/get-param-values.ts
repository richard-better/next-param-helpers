import type { PageParamObject } from './page-param-object'

export const getParamValues = <T extends string>(
  url: T,
  params: Record<string, string>
): PageParamObject<T> => {
  console.log(url)
  console.log(params)

  // TODO: implement this function
  return {} as PageParamObject<T>
}
