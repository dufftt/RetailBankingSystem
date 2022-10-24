import React, {Component} from 'react';
import Card from "./Card";
import CustomTable from "./CustomTable";


class AccountInfo extends Component {
    state = {
        col: ["Account Id", "Current Balance", "Account Type", "View"],
    }

    render() {
        return (
            <div>
                <Card>
                    <p className='font-snas font-semibold'>Account Info</p>
                    <CustomTable cols={this.state.col} data={this.props.accounts}/>
                </Card>
            </div>
        );
    }
}

export default AccountInfo;