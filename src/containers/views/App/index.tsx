import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import menu from './routerMap'

const App = () => {
    const renderRoutes = (routeMenu, path: string) => {
        const children = []
        const renderRoute = (item, routePath: string) => {
            const newPath = (item.path ? `${routePath}/${item.path}` : routePath).replace(/\/+/g, '/')

            if (item.component && item.children) {
                const childRoutes = renderRoutes(item.children, newPath)
                const Component = item.component
                children.push(
                    <Route
                        key={newPath}
                        path={newPath}
                        render={props => <Component {...props}>{childRoutes}</Component>}
                    />
                )
            } else if (item.component) {
                children.push(<Route key={newPath} component={item.component} path={newPath} exact />)
            } else if (item.children) {
                item.children.forEach(route => renderRoutes(route, newPath))
            }
        }

        routeMenu.forEach(item => renderRoute(item, path))
        return <Switch>{children}</Switch>
    }

    const routesNode = renderRoutes(menu, '/')

    return <Router>{routesNode}</Router>
}

export default App
