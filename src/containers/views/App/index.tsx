import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import menu from './routerMap'
import { useDispatch as useUserDispatch } from '@store/user/index'
import { useDispatch as useTagDispatch } from '@store/tag/index'
import PageLoading from '@shared/PageLoading'
import { getTagList as getTagListApi } from '@services/api'

const App = () => {
    const userDispatch = useUserDispatch()

    const initUserInfo = () => {
        const token = localStorage.getItem('token')
        if (!!token) {
            const { id, username, auth } = jwtDecode(localStorage.token)
            userDispatch({ type: 'USER_LOGIN', payload: { id, username, auth } })
        } else {
            localStorage.clear()
        }
    }

    useEffect(() => {
        initUserInfo()
    }, [])

    const tagDispatch = useTagDispatch()

    const getTagList = async () => {
        try {
            const res = await getTagListApi()
            tagDispatch({
                type: 'SET_TAG_LIST',
                payload: {
                    list: res.data instanceof Array ? res.data : [],
                    isGetTagList: true
                }
            })
        } catch (error) {}
    }

    useEffect(() => {
        getTagList()
    }, [])

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

    return (
        <Suspense fallback={<PageLoading />}>
            <Router>{routesNode}</Router>
        </Suspense>
    )
}

export default App
