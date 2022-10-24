import React, {Component} from 'react';
import CustomerTopNav from "../navigation/CustomerTopNav";
import Card from "../Utility/Card";
import {Input, Label} from "@zendeskgarden/react-forms";
import {Datepicker} from "@zendeskgarden/react-datepickers";
import CustomTable from "../Utility/CustomTable";
import {useParams} from "react-router-dom";
import AccountClient from "../../Client/AccountClient";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class CustomerAccounts extends Component {

    state = {
        col: ["Id", "Sender Account No.", "Sender Name.", "Target Account No.", "Target Name", "Amount", "Date", "Reference"],
        startdate: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 30)),
        endDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 1)),
        data: null
    }

    updatedata = () => {
        AccountClient.gettransactionbyid(this.props.user.authToken, this.props.params.account, this.state.startdate, this.state.endDate)
            .then(data => {
                data.transactions = data.transactions.map(trans => {
                    trans.initiationDate = new Date(trans.initiationDate).toDateString();
                    return trans;
                })
                this.setState({data: data})
            });
    }

    componentDidMount() {
        this.updatedata();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.endDate !== prevState.endDate || this.state.startdate !== prevState.startdate) {
            this.updatedata();
        }
    }

    render() {
        if (this.state.data == null) {
            return <div/>
        } else {
            return (<div className="sm:ml-56">
                <div className="fixed w-full bg-white pr-56"><CustomerTopNav accountid={this.props.params.account}
                                                                             authtoken={this.props.user.authToken}
                                                                             setuser={this.props.setuser}
                                                                             updatedata={this.updatedata}/></div>
                <div className="flex flex-wrap pt-20">
                    <div className="lg:w-1/4 md:w-1/2 w-full p-5"><Card><p className="font-sans font-semibold">Account
                        No.</p><p className="font-sans font-semibold text-xl pt-3">{this.props.params.account}</p>
                    </Card></div>
                    <div className="lg:w-1/4 md:w-1/2 w-full p-5"><Card><p className="font-sans font-semibold">Account
                        Balance</p><p className="font-sans font-semibold text-xl pt-3">{this.state.data.balance}</p>
                    </Card></div>
                    <div className="lg:w-1/4 md:w-1/2 w-full p-5"><Card><p
                        className="font-sans font-semibold">Transactions</p><p
                        className="font-sans font-semibold text-xl pt-3">{this.state.data.transactionsCount}</p></Card>
                    </div>
                    <div className="w-full p-5"><Card>
                        <div className="flex flex-wrap justify-between">
                            <div className=""><p className="font-sans font-semibold">Transaction History</p></div>
                            <div className="flex">
                                <div className="px-5">
                                    <Label>Start Date:</Label><Datepicker value={this.state.startdate}
                                                                          onChange={(date) => this.setState({startdate: date})}
                                                                          isCompact>
                                    <Input isCompact/>
                                </Datepicker>
                                </div>
                                <div className="px-5">
                                    <Label>End Date:</Label><Datepicker value={this.state.endDate}
                                                                        onChange={(date) => this.setState({endDate: date})}
                                                                        isCompact>
                                    <Input isCompact/>
                                </Datepicker>
                                </div>
                            </div>
                        </div>
                        <CustomTable cols={this.state.col} data={this.state.data.transactions}/>
                    </Card>
                    </div>
                </div>
            </div>);
        }
    }
}

export default withParams(CustomerAccounts);