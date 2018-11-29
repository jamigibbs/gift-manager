/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user-actions'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'michael@scott.com'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER_REQUEST')
      expect(actions[1].type).to.be.equal('GET_USER_SUCCESS')
      expect(actions[1].user.email).to.be.equal(fakeUser.email)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the LOGOUT_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('LOGOUT_USER_REQUEST')
      expect(actions[1].type).to.be.equal('LOGOUT_USER_SUCCESS')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
