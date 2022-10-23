declare const emptyObjectSymbol: unique symbol

export type EmptyObject = { [emptyObjectSymbol]?: never }

export type SegmentObj<TSegment extends string> =
  TSegment extends `[[...${infer cleanSegment}]]`
    ? { [k in cleanSegment]: string[] | null }
    : TSegment extends `[...${infer cleanSegment}]`
    ? { [k in cleanSegment]: string[] }
    : TSegment extends `[${infer cleanSegment}]`
    ? { [k in cleanSegment]: string }
    : EmptyObject

export type PageParamObject<TPagePath extends string> =
  TPagePath extends `${infer Head}/${infer Tail}`
    ? SegmentObj<Head> & PageParamObject<Tail>
    : TPagePath extends '/'
    ? EmptyObject
    : SegmentObj<TPagePath>
