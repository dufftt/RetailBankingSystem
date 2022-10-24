import React, {Component} from 'react';
import Card from "../Utility/Card";
import TopNavEmployee from "../navigation/TopNavEmployee";
import CustomerList from "../Utility/modals/CustomerList";
import CustomerClient from "../../Client/CustomerClient";
import {Link} from "react-router-dom";

class EmployeeHome extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        CustomerClient.getcustomerlist(this.props.user).then(data => {
            data = data.map(customer => {
                let ncustomer = {};
                ncustomer.userid = customer.userid;
                ncustomer.username = customer.username;
                ncustomer.address = customer.address;
                ncustomer.edit = <Link to={"/customer/" + customer.userid}>Edit</Link>
                return ncustomer;
            })
            this.setState({data: data})
        });
    }

    render() {
        if (this.state.data === null) {
            return <div></div>
        } else {
            return (
                <div className="sm:ml-56">
                    <div className="fixed w-full pr-56"><TopNavEmployee setuser={this.props.setuser}
                                                                        user={this.props.user}/></div>
                    <div className="flex flex-wrap pt-20">
                        <div className="w-full p-5">
                            <Card>
                                <CustomerList data={this.state.data}></CustomerList>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default EmployeeHome;