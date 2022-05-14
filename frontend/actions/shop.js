import fetch from 'isomorphic-fetch';
import { API } from '../config';


export const createShop = (shop, token) => {
    return fetch(`${API}/shop`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: shop
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
