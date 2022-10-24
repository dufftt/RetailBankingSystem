import React, {Component} from 'react';
import Card from "../Utility/Card";
import {Field, Input, Label, Textarea} from "@zendeskgarden/react-forms";
import AccountInfo from '../Utility/AccountInfo';
import CustomerClient from "../../Client/CustomerClient";
import {Link} from "react-router-dom";


class CustomerHome extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        CustomerClient.getcustomerdetails(this.props.user.authToken, this.props.user.userid).then(r => {
            r.accounts = r.accounts.map(account => {
                let newaccount = {};
                newaccount.accountId = account.accountId;
                newaccount.currentBalance = account.currentBalance;
                newaccount.accountType = account.accountType
                newaccount.view = <Link to={"/account/" + account.accountId}>View</Link>;
                return newaccount
            })
            this.setState({user: r})
        });
    }

    render() {
        if (this.state.user == null) {

        } else {
            return (<div className="sm:ml-56">
                <div className="fixed w-full pr-56">
                    <div className="h-20 border-y border-gray-500 flex w-full justify-between">
                        <div className="flex">
                            <div className='flex my-5 ml-10 hoverbg text-xl  cursor-pointer '></div>
                        </div>
                        <div className="flex">
                            <button onClick={() => {
                                this.props.setuser(null)
                            }}
                                    className="flex my-5 mr-10  hoverbg text-xl rounded border border-gray-500 cursor-pointer focus:outline-none">
                                <p className="py-1 px-5 font-semibold">Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap pt-20">
                    <div className="md:w-1/2 w-full p-5"><Card><p className="font-sans font-semibold">Profile</p>
                        <div className="flex flex-wrap">
                            <div className="p-5 w-1/2"><Field>
                                <Label>Customer Id</Label>
                                <Input readOnly value={this.state.user.userid}/>
                            </Field></div>
                            <div className="p-5 w-1/2"><Field>
                                <Label>Customer Name</Label>
                                <Input readOnly value={this.state.user.username}/>
                            </Field></div>
                            <div className="p-5 w-1/2"><Field>
                                <Label>Date of Birth</Label>
                                <Input readOnly value={this.state.user.dateOfBirth}/>
                            </Field></div>
                            <div className="p-5 w-1/2"><Field>
                                <Label>PAN</Label>
                                <Input readOnly value={this.state.user.pan}/>
                            </Field></div>
                            <div className="p-5 w-full"><Field>
                                <Label>Address</Label>
                                <Textarea readOnly value={this.state.user.address}/>
                            </Field></div>
                        </div>
                    </Card>
                    </div>
                    <div className="md:w-1/2 w-full p-5">
                        <AccountInfo accounts={this.state.user.accounts}/>
                    </div>
                </div>
            </div>);
        }
    }
}

export default CustomerHome;