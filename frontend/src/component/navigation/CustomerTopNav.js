import React, {Component} from 'react';
import './css/TopNav.css'
import SendMoney from '../Utility/modals/SendMoney';

class CustomerTopNav extends Component {
    render() {
        return (
            <div className="h-20 border-y border-gray-500 flex w-full justify-between">
                <div className="flex">
                    <div className='flex my-5 ml-10 hoverbg text-xl  cursor-pointer '><SendMoney
                        accountid={this.props.accountid} authtoken={this.props.authtoken}
                        updatedata={this.props.updatedata}/></div>
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
        );
    }
}

export default CustomerTopNav;