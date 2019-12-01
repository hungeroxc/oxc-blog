import React, { lazy } from 'react'

import BlogLayout from '@shared/BlogLayout'

interface RouterMenuItem {
    path: string
    icon?: string
    component: React.ReactNode
    title?: string
    children?: RouterMenuItem[]
    isPrivate?: boolean
}

const ArticleList = lazy(() => import(/* webpackChunkName: "article-list" */ '@views/ArticleList'))

const ArticleDetail = lazy(() => import(/* webpackChunkName: "article-detail" */ '@views/ArticleDetail'))

const AboutMe = lazy(() => import(/* webpackChunkName: "about-me" */ '@views/AboutMe'))

const Tags = lazy(() => import(/* webpackChunkName: "tags" */ '@views/Tags'))

const Login = lazy(() => import(/* webpackChunkName: "login" */ '@views/Login'))

const Admin = lazy(() => import(/* webpackChunkName: "admin" */ '@views/Admin'))

const AddArticle = lazy(() => import(/* webpackChunkName: "add-article" */ '@views/Admin/AddArticle'))

const ArticleManager = lazy(() => import(/* webpackChunkName: "article-manager" */ '@views/Admin/ArticleManager'))

const UserManager = lazy(() => import(/* webpackChunkName: "user-manager" */ '@views/Admin/UserManager'))

const TagWithArticle = lazy(() => import(/* webpackChunkName: "tag-with-article" */ '@views/TagWithArticle'))

export const homeMenu: RouterMenuItem = {
    path: '/',
    component: BlogLayout,
    children: [
        {
            path: '/',
            title: '首页',
            component: ArticleList,
            icon: 'home'
        },
        {
            path: '/about',
            title: '关于',
            component: AboutMe,
            icon: 'user'
        },
        {
            path: '/tag',
            title: '标签',
            component: Tags,
            icon: 'tags'
        },
        {
            path: '/tag/:tag',
            component: TagWithArticle
        },
        {
            path: 'article-detail/:id',
            component: ArticleDetail
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
            icon: 'home'
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
            icon: 'user'
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
