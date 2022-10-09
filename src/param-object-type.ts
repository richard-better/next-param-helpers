import type { String, Union, List } from 'ts-toolbelt'

type DynamicSegmentPattern = `[${string}]`
type DynamicOptionalSegmentPattern = `[[${string}]]`
type DynamicOptionalArraySegmentPattern = `[[...${string}]]`
type DynamicArraySegmentPattern = `[...${string}]`

type CleanPathSegment<TString extends string> = String.Replace<
  String.Replace<String.Replace<TString, '[', ''>, ']', ''>,
  '...',
  ''
>

// This is the first part of the type. It converts a url into a list of the dynamic segments from the url

type PageUrlDynamicParts<TPageUrl extends string> = List.Filter<
  String.Split<
    String.Join<
      List.Filter<
        String.Split<TPageUrl, '/'>,
        List.Filter<String.Split<TPageUrl, '/'>, DynamicSegmentPattern>[number]
      >,
      '/'
    >,
    '/'
  >,
  ''
>

// For the rest, we have to indivudually handle the four cases

type RequiredParams<TPageUrl extends string> = List.Filter<
  PageUrlDynamicParts<TPageUrl>,
  DynamicOptionalSegmentPattern
>
type OptionalParams<TPageUrl extends string> = List.Filter<
  PageUrlDynamicParts<TPageUrl>,
  RequiredParams<TPageUrl>[number]
>

// 1. Required, single
type RequiredSingleParams<TPageUrl extends string> = List.Filter<
  RequiredParams<TPageUrl>,
  DynamicArraySegmentPattern
>
// 2. Required, array
type RequiredArrayParams<TPageUrl extends string> = List.Filter<
  RequiredParams<TPageUrl>,
  RequiredSingleParams<TPageUrl>[number]
>
// 3. Optional, single
type OptionalSingleParams<TPageUrl extends string> = List.Filter<
  OptionalParams<TPageUrl>,
  DynamicOptionalArraySegmentPattern
>
// 4. Optional, array
type OptionalArrayParams<TPageUrl extends string> = List.Filter<
  OptionalParams<TPageUrl>,
  OptionalSingleParams<TPageUrl>[number]
>

export type ParamObjectType<TPageUrl extends string> = Union.Merge<
  | Union.Merge<
      {
        [Item in RequiredSingleParams<TPageUrl>[number]]: {
          [Key in CleanPathSegment<Item>]: string
        }
      }[RequiredSingleParams<TPageUrl>[number]]
    >
  | Union.Merge<
      {
        [Item in RequiredArrayParams<TPageUrl>[number]]: {
          [Key in CleanPathSegment<Item>]: string[]
        }
      }[RequiredArrayParams<TPageUrl>[number]]
    >
  | Union.Merge<
      {
        [Item in OptionalSingleParams<TPageUrl>[number]]: {
          [Key in CleanPathSegment<Item>]: string | null
        }
      }[OptionalSingleParams<TPageUrl>[number]]
    >
  | Union.Merge<
      {
        [Item in OptionalArrayParams<TPageUrl>[number]]: {
          [Key in CleanPathSegment<Item>]: string[] | null
        }
      }[OptionalArrayParams<TPageUrl>[number]]
    >
>
