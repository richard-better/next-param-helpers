// Copyright (c) 2022 Vercel, Inc, File contents from https://github.com/vercel/next.js/blob/ceb07ff00c59e95b4473a945ecba566471ff0d94/packages/next/shared/lib/escape-regexp.ts

// regexp is based on https://github.com/sindresorhus/escape-string-regexp
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function escapeStringRegexp(str: string) {
  // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
  if (reHasRegExp.test(str)) {
    return str.replace(reReplaceRegExp, '\\$&')
  }
  return str
}
