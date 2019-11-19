import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { adminMenu } from '@views/App/routerMap'

const MenuItem = Menu.Item

const SiderMenu = ({ history }: RouteComponentProps) => {
    // 获取菜单列表
    const getMenus = () => {
        return adminMenu.children.map(item => {
            return (
                <MenuItem key={item.path ? `/admin/${item.path}` : '/admin'}>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.title}</span>
                </MenuItem>
            )
        })
    }

    const goto = ({ key }: { key: string }) => {
        history.push(key)
    }

    return (
        <Menu selectedKeys={[location.pathname]} onClick={goto} theme="dark" mode="inline">
            {getMenus()}
        </Menu>
    )
}

export default withRouter(SiderMenu)
