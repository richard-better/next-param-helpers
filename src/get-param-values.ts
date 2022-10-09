export const getParamValues = <T extends string>(
  url: T,
  params: Record<string, string>
): Record<string, string | string[]> => {
  console.log(url)
  console.log(params)
  return {}
}
