import { mount } from '@vue/test-utils'
import HelloMessage from '../components/HelloMessage'

describe('HelloMessage', () => {
  const wrapper = mount(HelloMessage)
  test('get prop (Hello)', () => {
    expect(wrapper.props().message).toBe('Hello')
  })
  test('click triggers alert', () => {
    expect(wrapper.trigger('click'))
  })
})
