// Copyright (c) 2022 Vercel, Inc, File contents from https://github.com/vercel/next.js/blob/ceb07ff00c59e95b4473a945ecba566471ff0d94/packages/next/shared/lib/router/utils/remove-trailing-slash.ts
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function removeTrailingSlash(route: string) {
  return route.replace(/\/$/, '') || '/'
}
