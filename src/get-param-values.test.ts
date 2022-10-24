import { getParamValues } from './get-param-values'

test.each<[string, string, Record<string, string | string[]>]>([
  ['/pattern/[id]', '/pattern/12345', { id: '12345' }],
  ['/pattern/[id]/[[...slug]]', '/pattern/12345', { id: '12345' }],
  [
    '/pattern/[id]/[[...slug]]',
    '/pattern/12345/hello/world',
    { id: '12345', slug: ['hello', 'world'] },
  ],
  [
    '/a/b/c/d/e/f/g/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/i/j/k/l/m/n/o/[p1]/[p2]/[p3]/[p4]/[p5]/[p6]/[p7]/[p8]/[p9]/[p10]/[p11]/[p12]/[p13]/[p14]/[p15]',
    '/a/b/c/d/e/f/g/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/i/j/k/l/m/n/o/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15',

    {
      p1: '1',
      p2: '2',
      p3: '3',
      p4: '4',
      p5: '5',
      p6: '6',
      p7: '7',
      p8: '8',
      p9: '9',
      p10: '10',
      p11: '11',
      p12: '12',
      p13: '13',
      p14: '14',
      p15: '15',
    },
  ],
])(
  'getParamValues returns the correct result for %s %s',
  (pattern, url, expected) => {
    const result = getParamValues(pattern, url)

    expect(result).toStrictEqual(expected)
  }
)
