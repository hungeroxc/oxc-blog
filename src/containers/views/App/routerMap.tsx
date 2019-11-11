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

const menu: RouterMenuItem[] = [homeMenu]

export default menu
