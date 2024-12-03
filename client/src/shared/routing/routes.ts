import { UnmappedRouteObject, createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
};

export const pageNotFoundRoute = createRoute();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routesMap: UnmappedRouteObject<any>[] = [{ path: '/', route: routes.home }];
