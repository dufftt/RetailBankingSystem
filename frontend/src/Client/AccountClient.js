class AccountClient {
    static url = "http://localhost:8086/account-ms";

    static createAccount(token, customerId, balance, accountType) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "accountType": accountType,
            "currentBalance": balance,
            "customerId": customerId
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(this.url + "/createAccount/" + customerId, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.reason !== undefined) {
                    alert(response.reason)
                } else {
                    alert("Issue creating account!!")
                }
            });
    }

    static gettransactionbyid(token, accountid, from, to) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(this.url + "/getAccountStatement/" + accountid + "/" + this.formatDate(from) + "/" + this.formatDate(to), requestOptions)
            .then(response => response.json());
    }

    static padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    static formatDate(date) {
        return [
            date.getFullYear(),
            AccountClient.padTo2Digits(date.getMonth() + 1),
            AccountClient.padTo2Digits(date.getDate()),
        ].join('-');
    }

    static sendMoney(authtoken, accountid, targetid, amount, message) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + authtoken);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "sourceAccount": {
                "accountId": accountid,
                "amount": amount
            },
            "targetAccount": {
                "accountId": targetid,
                "amount": amount
            },
            "amount": amount,
            "reference": message
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("http://localhost:8086/account-ms/transaction", requestOptions)
            .then(response => response.json());
    }
}

export default AccountClient;