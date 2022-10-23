import { getParamValues } from './get-param-values'

test.skip.each<[string, string, Record<string, string | string[]>]>([
  ['/pattern/[id]', '/pattern/12345', { id: '12345' }],
  ['/pattern/[id]/[[...slug]]', '/pattern/12345', { id: '12345' }],
  [
    '/pattern/[id]/[[...slug]]',
    '/pattern/12345/hello/world',
    { id: '12345', slug: ['hello', 'world'] },
  ],
])('getParamValues returns the correct result', (pattern, url, expected) => {
  const mockContext = { path: url }
  const result = getParamValues(pattern, mockContext)

  expect(result).toStrictEqual(expected)
})
