const EXTRACT_PATH_FROM_ROUTE_QUERY = /\/([^/].*)/;

export function extractPathfromRouteQuery(inputString: string): string | null {
  const match = inputString.match(EXTRACT_PATH_FROM_ROUTE_QUERY);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
