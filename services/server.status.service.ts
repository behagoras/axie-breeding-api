import { Express } from 'express'

export const getRoutes = (apps:Express[]): Array<any> => {
  let route: any
  const routes: Array<any> = []
  apps.forEach((app:Express) => {
    return app._router.stack.forEach((middleware: any) => {
      if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route)
      } else if (middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach((handler: any) => {
          route = handler.route
          route && routes.push(route)
        })
      }
    })
  })

  return routes
}

export const getFormattedRoutes = (apps:Express[]) => {
  const routes = getRoutes(apps)
  return routes.map(route => {
    return {
      method: route.stack[0].method.toUpperCase(),
      path: route.path
      // endpoint: `${domain}:${port}${route.path}`
    }
  })
    .sort((a, b) => a.path.localeCompare(b.path))
}
