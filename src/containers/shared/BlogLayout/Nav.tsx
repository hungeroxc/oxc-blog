import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import styles from './index.scss'
import { homeMenu } from '@views/App/routerMap'

const MenuItem = Menu.Item

interface IProps extends RouteComponentProps {}

const Nav = ({ history, location }: IProps) => {
    const goto = ({ key }: { key: string }) => {
        if (location.pathname === key) {
            return
        }
        history.push(key)
    }

    return (
        <Menu className={styles.headNav} selectedKeys={[location.pathname]} mode="horizontal">
            {homeMenu.children.map(item => {
                return (
                    item.title && (
                        <MenuItem className={styles.menuItem} onClick={goto} key={item.path}>
                            {!!item.icon && <Icon type={item.icon} />}
                            <span>{item.title}</span>
                        </MenuItem>
                    )
                )
            })}
        </Menu>
    )
}

export default withRouter(Nav)
