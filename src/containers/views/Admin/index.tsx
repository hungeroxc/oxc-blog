import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { useStateValue } from '@store/user/index'

const Admin = ({ history }: RouteComponentProps) => {
    const { userInfo } = useStateValue()

    useEffect(() => {
        if (userInfo.auth !== 2) {
            history.push('/login')
        }
    }, [])

    return (
        <div>
            <div>123</div>
        </div>
    )
}

export default withRouter(Admin)
