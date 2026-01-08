export const parseRoute = (routeValue: string): string[] =>
  routeValue
    ?.split(';')
    .map((s) => s.trim())
    .filter(Boolean) ?? [];
