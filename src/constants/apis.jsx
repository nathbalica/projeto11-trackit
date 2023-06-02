import axios from "axios"
export const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit"

function configToken(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

function createHabits(body, token){
    const config = configToken(token)
    const req = axios.post(`${BASE_URL}/habits`, body, config)

    return req;
}

function listHabits(token){
    const config = configToken(token)
    const req = axios.get(`${BASE_URL}/habits`, config)

    return req;
}

const apis = {
    createHabits,
    listHabits
}

export default apis;