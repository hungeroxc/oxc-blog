import React from 'react'

import { Provider as UserProvider } from './user'
import { Provider as TagProvider } from './tag'

export { useUserStore } from './user'
export { useTagStore } from './tag'

// 使用数据reducer进行Provider整合，避免直接出现如下情况
/**
 * <Provider1>
 *  <Provider2>
 *      <Provider3>
 *          <App/>
 *      </Provider3>
 *  </Provider2>
 * </Provider1>
 */
const providers = [UserProvider, TagProvider]

const Provider = (props: any) =>
    providers.reduceRight((children, Parent) => <Parent>{children}</Parent>, props.children)

export default Provider
