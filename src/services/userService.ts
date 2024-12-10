import type { User } from '../interfaces/User'
import axios from 'axios'
import type { Photo } from '../interfaces/Photo'

export function getUsers() {
    return axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .then(({ data }) => data)
        .catch(() => {
            throw 'Ошибка получения данных'
        })
}
export function getUsersByKey(key:string, value:string) {
    return axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users?'+
        key + 
        '_like=' +
        value
    )
        .then(({ data }) => data)
        .catch(() => {
            throw 'Ошибка получения данных'
        })
}
export function getImgById(id:number){
    return axios.get<Photo[]>(
        'https://jsonplaceholder.typicode.com/photos?id=' + id
    )
        .then(({ data }) => data[0]?.url??'')
        .catch(() => {
            throw 'Ошибка получения данных'
        })
}