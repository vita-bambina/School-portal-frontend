import api from "./axios"

 export const login =  (data:any) => {

    return api.post("/auth/login", data);

};

export const registerapi = (data:any) => {
    return api.post("/register", data);
};

export const logout = () => {
    return api.post("/auth/logout")
}

export const getparticularuser =()=>{
    return api.get("/auth/me")
}