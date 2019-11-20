import React, { lazy, Suspense } from 'react'

import PageLoading from '@shared/PageLoading'
import BlogLayout from '@shared/BlogLayout'

interface RouterMenuItem {
    path: string
    icon?: string
    component: React.ReactNode
    title?: string
    children?: RouterMenuItem[]
    isPrivate?: boolean
}

const ArticleList = () => {
    const ArticleList = lazy(() => import(/* webpackChunkName: "article-list" */ '@views/ArticleList'))
    return (
        <Suspense fallback={<PageLoading />}>
            <ArticleList />
        </Suspense>
    )
}

const AboutMe = () => {
    const AboutMe = lazy(() => import(/* webpackChunkName: "about-me" */ '@views/AboutMe'))
    return (
        <Suspense fallback={<PageLoading />}>
            <AboutMe />
        </Suspense>
    )
}

const Tags = () => {
    const Tags = lazy(() => import(/* webpackChunkName: "tags" */ '@views/Tags'))
    return (
        <Suspense fallback={<PageLoading />}>
            <Tags />
        </Suspense>
    )
}

const Login = () => {
    const Login = lazy(() => import(/* webpackChunkName: "login" */ '@views/Login'))
    return (
        <Suspense fallback={<PageLoading />}>
            <Login />
        </Suspense>
    )
}

const Admin = props => {
    const Admin = lazy(() => import(/* webpackChunkName: "admin" */ '@views/Admin'))
    return (
        <Suspense fallback={<PageLoading />}>
            <Admin {...props} />
        </Suspense>
    )
}

const AddArticle = () => {
    const AddArticle = lazy(() => import(/* webpackChunkName: "add-article" */ '@views/Admin/AddArticle'))
    return (
        <Suspense fallback={<PageLoading />}>
            <AddArticle />
        </Suspense>
    )
}

const ArticleManager = () => {
    const ArticleManager = lazy(() => import(/* webpackChunkName: "article-manager" */ '@views/Admin/ArticleManager'))
    return (
        <Suspense fallback={<PageLoading />}>
            <ArticleManager />
        </Suspense>
    )
}

const UserManager = () => {
    const UserManager = lazy(() => import(/* webpackChunkName: "user-manager" */ '@views/Admin/UserManager'))
    return (
        <Suspense fallback={<PageLoading />}>
            <UserManager />
        </Suspense>
    )
}

export const homeMenu: RouterMenuItem = {
    path: '/',
    component: BlogLayout,
    children: [
        {
            path: '/',
            title: '首页',
            component: ArticleList,
            icon: 'edit'
        },
        {
            path: '/about',
            title: '关于',
            component: AboutMe,
            icon: 'edit'
        },
        {
            path: '/tag',
            title: '标签',
            component: Tags,
            icon: 'edit'
        }
    ]
}

export const adminMenu: RouterMenuItem = {
    path: 'admin',
    component: Admin,
    children: [
        {
            path: '',
            title: '文章管理',
            component: ArticleManager,
            icon: 'edit'
        },
        {
            path: 'add',
            title: '添加文章',
            component: AddArticle,
            icon: 'edit'
        },
        {
            path: 'user',
            title: '用户管理',
            component: UserManager,
            icon: 'edit'
        }
    ]
}

const menu: RouterMenuItem[] = [
    {
        path: 'login',
        component: Login
    },
    adminMenu,
    homeMenu
]

export default menu
