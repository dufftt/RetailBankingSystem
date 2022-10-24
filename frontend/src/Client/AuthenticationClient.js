class AuthenticationClient {
    static url = "http://localhost:8084/auth-ms";

    static login(userid, password, setUser) {
        const raw = JSON.stringify({
            "userid": userid,
            "password": password
        });

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: raw,
            redirect: 'follow'
        };

        return fetch(this.url + "/login", requestOptions)
            .then(res => res.json())
    }

    static validate(token) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(this.url + "/validateToken", requestOptions)
            .then(response => response.json());
    }
}

export default AuthenticationClient;