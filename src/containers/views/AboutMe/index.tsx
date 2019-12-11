import React from 'react'
import { Avatar, Divider, Icon as AntdIcon, Rate } from 'antd'

import styles from './index.scss'
import Icon from '@shared/Icon'

const skillList: { title: string; rate: number }[] = [
    {
        title: 'HTML, CSS, JavaScript: 熟练开发符合W3C标准页面，熟练使用ES6语法',
        rate: 3
    },
    {
        title: 'TypeScript: 掌握TypeScript通常用法，包含泛型，接口等，并运用与实际工作中',
        rate: 3
    },
    {
        title: 'React: 熟练使用React只是及其技术栈并有相关工作经验，熟练使用最新的hooks',
        rate: 3
    },
    {
        title: 'Vue: 了解Vue相关知识点并有相关工作经验',
        rate: 2
    },
    {
        title: 'WebPack: 能够自己搭建WebPack，并且有一个以此搭建的脚手架，支持一键生成React+Typescript项目模板',
        rate: 3
    },
    {
        title: 'Node: 可以制作辅助开发的小公举，也可以进行简单的后端接口开发',
        rate: 2
    },
    {
        title: 'MySQL: 可以进行简单的数据类型设计，配合Node进行后端或者中间层开发',
        rate: 2
    },
    {
        title: '部署方面: 能够使用Jenkins或者GitLab进行项目自动化部署，并支持部署结果通知钉钉机器人或者邮件',
        rate: 2
    }
]

const AboutMe = () => {
    return (
        <div className={styles.aboutMe}>
            <div className={styles.header}>
                <Avatar src={require('@assets/avatar.jpeg').default} />
                <div className={styles.desc}>人菜瘾大bug多脾气差</div>
            </div>
            <Divider orientation="left">博客简述</Divider>
            <div>
                <p>前端：TypeScript + React + antd</p>
                <p>后端：TypeScript + Koa + TypeORM + MySQL</p>
                <p>部署：JenKins + 七牛云 + 钉钉机器人</p>
                <p>
                    源码地址：
                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/hungeroxc/oxc-blog">
                        github
                    </a>
                    ，仅供学习使用，不做商业用途
                </p>
            </div>
            <Divider orientation="left">关于我</Divider>
            <ul className={styles.myInfo}>
                <li>姓名：大春春</li>
                <li>
                    联系方式：
                    <AntdIcon type="qq" /> 524112857
                    <Divider type="vertical" />
                    <AntdIcon style={{ marginRight: 6 }} type="mail" />
                    <a href="mailto:524112857@qq.com">524112857@qq.com</a>
                </li>
                <li>地址：广州市</li>
                <li>
                    <div className={styles.otherBlogAddress}>
                        其他博客地址：
                        <Icon width={16} height={16} id="jianshu" className={styles.linkIcon} />
                        <a target="_blank" rel="noreferrer noopener" href="https://www.jianshu.com/u/38278ed3f4e1">
                            jianshu
                        </a>
                    </div>
                </li>
                <li>
                    技能：
                    <ul>
                        {skillList.map((item, i) => (
                            <li key={i}>
                                {item.title}
                                <Rate className={styles.rate} defaultValue={item.rate} disabled />
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    其他：
                    <ul>
                        <li>常用系统: macOS，Ubuntu，windows</li>
                        <li>常用工具: VSCode</li>
                    </ul>
                </li>
                <li>个人：喜爱代码，游戏，吹牛皮</li>
            </ul>
        </div>
    )
}

export default AboutMe
