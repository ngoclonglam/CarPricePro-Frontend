import axiosClient from "./axiosClient";

const userApi = {
    login(username, password) {
        const url = '/login/';
        return axiosClient
            .post(url, {
                username,
                password,
            })
            .then(response => {

                console.log(response);
                if (response && response.user.is_superuser !== true) {
                    localStorage.setItem("client", response.access_token);
                    localStorage.setItem("user", JSON.stringify(response.user));

                }
                return response;
            });
    },
    logout(data) {
        const url = '/user/logout';
        return axiosClient.get(url);
    },
    pingRole() {
        const url = '/user/ping_role';
        return axiosClient.get(url);
    },
    getProfile() {
        const user = JSON.parse(localStorage.getItem("user"));
        const url = '/profiles/'+ user.id;
        return axiosClient.get(url);
    },
    updateProfile(editedUserData){
        const url = '/user';
        return axiosClient.put(url, editedUserData);
    }
}

export default userApi;