// Copyright (c) 2022 Vercel, Inc, File contents from https://github.com/vercel/next.js/blob/ceb07ff00c59e95b4473a945ecba566471ff0d94/packages/next/shared/lib/router/utils/route-regex.ts
import { escapeStringRegexp } from './escape-regexp'
import { removeTrailingSlash } from './remove-trailing-slash'

export interface Group {
  pos: number
  repeat: boolean
  optional: boolean
}

export interface RouteRegex {
  groups: { [groupName: string]: Group }
  re: RegExp
}

/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route. Examples:
 *   - `[...slug]` -> `{ name: 'slug', repeat: true, optional: true }`
 *   - `[foo]` -> `{ name: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ name: 'bar', repeat: false, optional: false }`
 */
function parseParameter(param: string) {
  const optional = param.startsWith('[') && param.endsWith(']')
  if (optional) {
    param = param.slice(1, -1)
  }
  const repeat = param.startsWith('...')
  if (repeat) {
    param = param.slice(3)
  }
  return { key: param, repeat, optional }
}

function getParametrizedRoute(route: string) {
  const segments = removeTrailingSlash(route).slice(1).split('/')
  const groups: { [groupName: string]: Group } = {}
  let groupIndex = 1
  return {
    parameterizedRoute: segments
      .map((segment) => {
        if (segment.startsWith('[') && segment.endsWith(']')) {
          const { key, optional, repeat } = parseParameter(segment.slice(1, -1))
          groups[key] = { pos: groupIndex++, repeat, optional }
          return repeat ? (optional ? '(?:/(.+?))?' : '/(.+?)') : '/([^/]+?)'
        } else {
          return `/${escapeStringRegexp(segment)}`
        }
      })
      .join(''),
    groups,
  }
}

/**
 * From a normalized route this function generates a regular expression and
 * a corresponding groups object intended to be used to store matching groups
 * from the regular expression.
 */
export function getRouteRegex(normalizedRoute: string): RouteRegex {
  const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute)
  return {
    re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
    groups: groups,
  }
}
