import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

import menu from './routerMap'
import { useUserStore, useTagStore } from '@store/index'
import PageLoading from '@shared/PageLoading'
import { getTagList as getTagListApi } from '@services/api'
import { RouterMenuItem } from './routerMap'

const App = () => {
    const { dispatch } = useUserStore()

    const initUserInfo = () => {
        const token = localStorage.getItem('token')
        if (!!token) {
            const { id, username, auth, exp } = jwtDecode(localStorage.token)
            const nowUnixTime = moment().unix()
            // 时间戳失效重新登录
            if (nowUnixTime > exp) {
                localStorage.clear()
            } else {
                dispatch({ type: 'USER_LOGIN', payload: { id, username, auth } })
            }
        } else {
            localStorage.clear()
        }
    }

    useEffect(() => {
        initUserInfo()
    }, [])

    const { dispatch: tagDispatch } = useTagStore()

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

    const renderRoutes = (routeMenu: RouterMenuItem[], path: string) => {
        const children: JSX.Element[] = []
        const renderRoute = (item: RouterMenuItem, routePath: string) => {
            const newPath = (item.path ? `${routePath}/${item.path}` : routePath).replace(/\/+/g, '/')

            if (item.component && item.children) {
                const childRoutes = renderRoutes(item.children, newPath)
                const Component: React.FC<any> = item.component
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
                item.children.forEach(route => renderRoute(route, newPath))
            }
        }

        routeMenu.forEach(item => renderRoute(item, path))
        return <Switch>{children}</Switch>
    }

    const routesNode = renderRoutes(menu, '/')

    console.log(routesNode)

    return (
        <Suspense fallback={<PageLoading />}>
            <Router>{routesNode}</Router>
        </Suspense>
    )
}

export default App
