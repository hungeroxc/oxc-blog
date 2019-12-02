import React, { useState } from 'react'
import { Modal, Form, Input, Button, Icon, message } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { FormComponentProps } from 'antd/lib/form'

import { register, login } from '@services/api'
import { useUserStore } from '@store/index'

const api = { register, login }

const FormItem = Form.Item

interface IProps extends FormComponentProps, ModalProps {
    authModalType: string
    closeModal: () => void
    triggerAuthModal: (visible: boolean, type?: string) => void
}

const AuthModal = ({ visible, form, authModalType, closeModal, triggerAuthModal }: IProps) => {
    const { getFieldDecorator, validateFields } = form

    const { dispatch: userDispatch } = useUserStore()

    const [loading, setLoading] = useState<boolean>(false)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        validateFields(async (err, value) => {
            if (!err) {
                setLoading(true)
                try {
                    const res = await api[authModalType](value)
                    if (res) {
                        setLoading(false)
                        triggerAuthModal(false)
                        if (authModalType === 'login') {
                            userDispatch({ type: 'USER_LOGIN', payload: res.data })
                            localStorage.setItem('token', res.data.token)
                            message.success('登陆成功')
                        } else {
                            message.success('注册成功')
                        }
                    }
                } catch (error) {
                    setLoading(false)
                }
            } else {
            }
        })
    }

    return (
        <Modal
            onCancel={closeModal}
            width={320}
            footer={null}
            destroyOnClose
            maskClosable={false}
            title={authModalType}
            visible={visible}
        >
            <Form onSubmit={submit} layout="horizontal">
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '需要输入用户名'
                            }
                        ]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '需要输入密码'
                            }
                        ]
                    })(
                        <Input
                            type="password"
                            placeholder="请输入密码"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button loading={loading} type="primary" htmlType="submit" block>
                        {authModalType === 'login' ? '登录' : '注册'}
                    </Button>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create<IProps>()(AuthModal)
