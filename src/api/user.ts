import axios from 'axios'

export function signin(username: string, password: string) {
    return axios.post<ResponseObject<User>>("/api/auth/signin", { username, password })
}

export function getSelfUser() {
    return axios.get<ResponseObject<User>>("/api/user/me")
}

export function signout() {
    return axios.post("/api/auth/signout");
}

export function signup(username: string, password: string) {
    return axios.post<ResponseObject<User>>("/api/auth/signup", {
        username,
        password,
    });
}