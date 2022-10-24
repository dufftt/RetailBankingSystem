import './App.css';
import Sidebar from "./component/navigation/Sidebar";
import "@fortawesome/fontawesome-free/css/all.css";
import {ThemeProvider} from '@zendeskgarden/react-theming';
import {Route, Routes} from "react-router-dom";

import React, {Component} from 'react';
import CustomerHome from "./component/Page/CustomerHome";
import CustomerAccounts from "./component/Page/CustomerAccounts";
import EmployeeHome from "./component/Page/EmployeeHome";
import EmployeeCustomerDetails from "./component/Page/EmployeeCustomerDetails";
import Login from "./component/Page/Login";
import AuthenticationClient from "./Client/AuthenticationClient";

class App extends Component {
    state = {
        user: null
    }
    setUser = (user) => {
        if (user === null) {
            localStorage.removeItem("authentication");
        } else {
            localStorage.setItem("authentication", user.authToken);
        }
        this.setState({user: user});
    }

    componentDidMount() {
        AuthenticationClient.validate(localStorage.getItem("authentication")).then(data => {
            let user = {};
            user.userid = data.userid;
            user.authToken = localStorage.getItem("authentication");
            user.role = data.role;
            this.setState({user: user})
        });
    }

    loadCustomerRoutes = () => {
        return (<Routes>
            <Route path="/" element={<CustomerHome user={this.state.user} setuser={this.setUser}/>}/>
            <Route path="/account/:account"
                   element={<CustomerAccounts user={this.state.user} setuser={this.setUser}/>}/>
        </Routes>);
    }
    loadEmployeeRoutes = () => {
        return (<Routes>
            <Route path="/" element={<EmployeeHome user={this.state.user} setuser={this.setUser}/>}/>
            <Route path="/customer/:account"
                   element={<EmployeeCustomerDetails user={this.state.user} setuser={this.setUser}/>}/>
        </Routes>)
    }
    loadUserRoutes = () => {
        if (this.state.user.role === 'CUSTOMER') {
            return this.loadCustomerRoutes();
        }
        if (this.state.user.role === 'EMPLOYEE') {
            return this.loadEmployeeRoutes();
        }
    }

    render() {
        if (this.state.user == null) {
            return <Login setUser={this.setUser}/>
        } else {
            return (
                <ThemeProvider>
                    <div className="min-h-screen">
                        <Sidebar user={this.state.user}/>
                        {
                            this.loadUserRoutes()
                        }
                    </div>
                </ThemeProvider>
            );
        }
    }
}


export default App;