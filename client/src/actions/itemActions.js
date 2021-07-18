import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
    // return {
    //     type: GET_ITEMS
    // }
    dispatch(setItemsLoading());
    axios
        .get('http://localhost:5000/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
}

export const addItem = (item) => dispatch => {
    // return {
    //     type: ADD_ITEM,
    //     payload: item // passing some parameters need to be in the payload
    // }
    axios
        .post('http://localhost:5000/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const deleteItem = (id) => dispatch => {
    // return {
    //     type: DELETE_ITEM,
    //     payload: id // passing some parameters need to be in the payload
    // }
    axios
        .delete(`http://localhost:5000/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
}


export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};