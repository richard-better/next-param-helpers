import { getRouteMatcher } from './helpers/route-matcher'
import { getRouteRegex } from './helpers/route-regex'
import type { PageParamObject } from './page-param-object'

/**
 * Get the values of the parameters of a route
 * @param route The Next.js route pattern used to match the page
 * @param url The url to get the parameters from
 * @returns The parameters of the route
 * @example
 * getParamValues('/blog/[id]/[...slug]', '/blog/123/first-post')
 * // { id: "123", slug: ['first-post'] }
 * @example
 * getParamValues('/blog/[id]/[[...slug]]', '/blog/123')
 * // { id: "123", slug: [] }
 */
export const getParamValues = <T extends string>(
  route: T,
  url: string
): PageParamObject<T> => {
  const routeRegex = getRouteRegex(route)
  const matcher = getRouteMatcher(routeRegex)

  const match = matcher(url)

  if (!match) {
    throw new Error(`Could not match "${url}" to the route "${route}"`)
  }

  return match as PageParamObject<T>
}
