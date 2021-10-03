export const getRoutes = (app:any): Array<any> => {
  let route: any;
  const routes: Array<any> = [];

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) { // routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === 'router') { // router middlewares
      middleware.handle.stack.forEach((handler: any) => {
        route = handler.route;
        route && routes.push(route);
      });
    }
  });

  return routes;
}

export const getFormattedRoutes = (app:any) => {
  const routes = getRoutes(app)
  return routes.map(route => {
    return {
      method: route.stack[0].method.toUpperCase(),
      path: route.path,
    };
  })
    .sort((a, b) => a.path.localeCompare(b.path));
}
