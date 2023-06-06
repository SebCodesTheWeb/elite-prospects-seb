export const groupBy = <T extends object, K extends keyof T>(
  list: T[],
  key: K
): Record<string, T[]> => {
  return list.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}
