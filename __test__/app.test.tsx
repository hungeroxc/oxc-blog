import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import App from '@views/App'

configure({ adapter: new Adapter() })

const wrapper = shallow(<App />)

describe('app组件', () => {
    it('app组件渲染正常', () => {
        expect(wrapper.find('section').length).toBe(1)
    })
})
