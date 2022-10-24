// Copyright (c) 2022 Vercel, Inc, File contents from https://github.com/vercel/next.js/blob/ceb07ff00c59e95b4473a945ecba566471ff0d94/packages/next/shared/lib/router/utils/route-matcher.ts

import type { RouteRegex } from './route-regex'
import { DecodeError } from '../../utils'

export interface RouteMatch {
  (pathname: string | null | undefined): false | Params
}

export interface Params {
  [param: string]: any
}

export function getRouteMatcher({ re, groups }: RouteRegex): RouteMatch {
  return (pathname: string | null | undefined) => {
    const routeMatch = re.exec(pathname!)
    if (!routeMatch) {
      return false
    }

    const decode = (param: string) => {
      try {
        return decodeURIComponent(param)
      } catch (_) {
        throw new DecodeError('failed to decode param')
      }
    }
    const params: { [paramName: string]: string | string[] } = {}

    Object.keys(groups).forEach((slugName: string) => {
      const g = groups[slugName]
      const m = routeMatch[g.pos]
      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/')
          ? m.split('/').map((entry) => decode(entry))
          : g.repeat
          ? [decode(m)]
          : decode(m)
      }
    })
    return params
  }
}
