import type { EmptyObject, PageParamObject } from './page-param-object'

// expectType from tsd does not complain when a property is missing from the expected types
// so we have to use a custom expectType that checks for the presence of all properties
const expectTypeBothWays = <
  TACompare1 extends TBCompare2,
  TBCompare1 extends TACompare1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _TACompare2 extends TBCompare2 = TACompare1,
  TBCompare2 = TBCompare1
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>() => {}

expectTypeBothWays<EmptyObject, PageParamObject<'/blog/'>>()

expectTypeBothWays<EmptyObject, PageParamObject<'/blog/entry'>>()

expectTypeBothWays<{ id: string }, PageParamObject<'/blog/entry/[id]'>>()

expectTypeBothWays<{ id: string }, PageParamObject<'/blog/entry/[id]/edit'>>()

expectTypeBothWays<
  { year: string; month: string; day: string },
  PageParamObject<'/notes/periodic/[year]/[month]/[day]'>
>()

// Long patterns test to make sure typescript is able to compile these recursive types
expectTypeBothWays<
  { year: string; month: string; day: string },
  PageParamObject<'/notes/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/r/s/t/u/v/x/y/w/y/[year]/[month]/[day]'>
>()

expectTypeBothWays<
  {
    p1: string
    p2: string
    p3: string
    p4: string
    p5: string
    p6: string
    p7: string
    p8: string
    p9: string
    p10: string
    p11: string
    p12: string
    p13: string
    p14: string
    p15: string
  },
  PageParamObject<'/a/b/c/d/e/f/g/a/b/c/d/e/f/g/h/i/j/k/l/m/n/o/p/q/i/j/k/l/m/n/o/[p1]/[p2]/[p3]/[p4]/[p5]/[p6]/[p7]/[p8]/[p9]/[p10]/[p11]/[p12]/[p13]/[p14]/[p15]'>
>()
