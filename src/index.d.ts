import type { PageParamObject } from './page-param-object'

declare const getParamValues: <T extends string>(
  url: T,
  params: Record<string, string>
) => PageParamObject<T>

export { getParamValues }

export type { PageParamObject }
