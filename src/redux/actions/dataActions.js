import {SET_ALL_CUSTOMERS, LOADING_DATA} from "../types"
import axios from "axios"

export const getAllCustomers = () => (dispatch)=> {
    dispatch({type: LOADING_DATA});
    axios.get('/customers')
    .then(res=> {
        dispatch({
            type: SET_ALL_CUSTOMERS,
            payload: res.data
        })
        console.log(res.data)
    }).catch(err=>{
        dispatch({
            type: SET_ALL_CUSTOMERS,
            payload: []
        })
    })
}