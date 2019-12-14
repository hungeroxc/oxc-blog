import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dropdown, Icon as AntdIcon, Menu } from 'antd'

import styles from './index.scss'
import Icon from '@shared/Icon'
import { homeMenu } from '@views/App/routerMap'

const MenuItem = Menu.Item

const HeaderLeft = ({ history }: RouteComponentProps) => {
    const renderMenu = () => {
        const list = homeMenu.children.filter(item => !!item.title)
        return (
            <Menu className={styles.menu}>
                {list.map(item => (
                    <MenuItem onClick={() => history.push(item.path)} className={styles.mobileMenuItem} key={item.path}>
                        <AntdIcon className={styles.menuIcon} type={item.icon} />
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        )
    }

    return (
        <div className={styles.headLeft}>
            <div className={styles.title}>
                <Icon className={styles.icon} width={20} height={20} id="bokezhuanjia" />
                大春春的博客
            </div>
            <Dropdown
                getPopupContainer={() => document.querySelector('.' + styles.headLeft)}
                trigger={['click']}
                overlay={renderMenu()}
                overlayClassName={styles.mobileMenu}
            >
                <AntdIcon type="menu" className={styles.drowDownIcon} />
            </Dropdown>
        </div>
    )
}

export default withRouter(HeaderLeft)
