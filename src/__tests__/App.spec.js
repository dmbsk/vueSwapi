import { mount } from '@vue/test-utils'
import Home from '../pages/Home'

describe('Home', () => {
  const wrapper = mount(Home)
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
