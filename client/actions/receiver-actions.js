import axios from 'axios'
import {
  ADD_RECEIVER,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST_SUCCESS,
  REMOVE_RECEIVER_FROM_LIST_REQUEST,
  REMOVE_ALL_LIST_RECEIVERS,
  GET_ALL_RECEIVER_GIFTS,
  ADD_GIFT_TO_RECEIVER,
  GET_RECEIVER_NAME,
  REMOVE_GIFT_FROM_RECEIVER,
  TOGGLE_GIFT_STATUS } from '../constants'

const addedReceiver = (receiver) => ({type: ADD_RECEIVER, receiver})
const gotAllListReceivers = (receivers) => ({type: GET_ALL_LIST_RECEIVERS, receivers})
export const removedAllListReceivers = () => ({type: REMOVE_ALL_LIST_RECEIVERS})
const gotAllReceiverGifts = (gifts) => ({type: GET_ALL_RECEIVER_GIFTS, gifts})
const addedGiftToReceiver = (gift) => ({type: ADD_GIFT_TO_RECEIVER, gift})
const gotReceiver = (receiver) => ({type: GET_RECEIVER_NAME, receiver})
const removedGiftFromReceiver = (id) => ({type: REMOVE_GIFT_FROM_RECEIVER, id})
const toggledGiftStatus = (gift) => ({type: TOGGLE_GIFT_STATUS, gift})
const removedReceiverFromListRequeset = () => ({type: REMOVE_RECEIVER_FROM_LIST_REQUEST})
const removedReceiverFromListSuccess = (receiver) => {
  return {
    type: REMOVE_RECEIVER_FROM_LIST_SUCCESS,
    receiver
  }
}

export const addReceiver = (name, listId) => async dispatch => {
  try {
    const { data } = await axios.post('/api/receiver', {name, listId})
    dispatch(addedReceiver(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllListReceivers = (listId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver/all', {
      params: {
        listId
      }
    })
    dispatch(gotAllListReceivers(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeReceiverFromList = (listId, receiverId) => async dispatch => {
  try {
    dispatch(removedReceiverFromListRequeset())
    const { data } = await axios.delete('/api/receiver', {
      data: {
        listId,
        receiverId
      }
    })
    dispatch(removedReceiverFromListSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllReceiverGifts = (receiverId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver/gifts', {
      params: {
        receiverId
      }
    })
    dispatch(gotAllReceiverGifts(data))
  } catch(err) {
    console.error(err)
  }
}

export const addGiftToReceiver = (url, receiverId) => async dispatch => {
  try {
    const { data } = await axios.post('/api/gift/add', {url, receiverId})
    dispatch(addedGiftToReceiver(data))
  } catch (err) {
    console.error(err)
  }
}

export const getReceiver = (receiverId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver', {
      params: {
        receiverId
      }
    })
    dispatch(gotReceiver(data))
  } catch(err) {
    console.error(err)
  }
}

export const removeGiftFromReceiver = (id) => async dispatch => {
  try {
    const { data } = await axios.delete('/api/receiver/gift', {
      data: { id }
    })
    dispatch(removedGiftFromReceiver(id))
  } catch (err) {
    console.error(err)
  }
}

export const toggleGiftStatus = (gift) => async dispatch => {
  try {
    const { data } = await axios.post('/api/receiver/gift/status', { gift })
    dispatch(toggledGiftStatus(data))
  } catch (err) {
    console.error(err)
  }
}
