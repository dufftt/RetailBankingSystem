import AccountClient from "./AccountClient";

class CustomerClient {
    static url = "http://localhost:8085/customer";

    static getcustomerdetails(authToken, userid) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + authToken);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(this.url + "/getCustomerDetails/" + userid, requestOptions).then(res => res.json());
    }

    static getcustomerlist(user) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.authToken);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(this.url + "/getallcustomers", requestOptions)
            .then(response => response.json());
    }

    static createcustomerclient(token, userid, address, dob, pan, username, password) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userid": userid,
            "address": address,
            "dateOfBirth": AccountClient.formatDate(dob),
            "pan": pan,
            "username": username,
            "password": password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(this.url + "/createCustomer", requestOptions)
            .then(response => response.json())
            .then(response => alert(response.reason));
    }

    static updatecustomerclient(token, user) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userid": user.userid,
            "address": user.address,
            "dateOfBirth": AccountClient.formatDate(user.dateOfBirth),
            "pan": user.pan,
            "username": user.username,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(this.url + "/updateCustomer", requestOptions)
            .then(response => response.json())
            .then(response => alert(response.reason));
    }

}

export default CustomerClient;