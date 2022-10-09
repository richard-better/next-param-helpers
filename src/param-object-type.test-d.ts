import { expectType } from 'tsd'

import type { ParamObjectType } from './param-object-type.d'

// eslint-disable-next-line @typescript-eslint/ban-types
expectType<{}>({} as ParamObjectType<'/help/'>)
expectType<{ id: string }>({} as ParamObjectType<'/help/[id]'>)
expectType<{ id: string }>({} as ParamObjectType<'/help/[id]/slug'>)
expectType<{ id: string; slug: string[] | null }>(
  {} as ParamObjectType<'/help/[id]/[[...slug]]'>
)
