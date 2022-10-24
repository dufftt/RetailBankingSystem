import React, {Component} from 'react';
import './css/TopNav.css'
import Accountmodal from '../Utility/modals/Accountmodal';
import Customermodal from '../Utility/modals/Customermodal'

class TopNav extends Component {
    render() {
        return (
            <div className="h-20 border-y border-gray-500 flex w-full justify-between">
                <div className="flex">
                    <div className='flex my-5 ml-10 hoverbg text-xl  cursor-pointer '><Accountmodal
                        user={this.props.user}/></div>
                    <div className='flex my-5 ml-10 hoverbg text-xl  cursor-pointer '><Customermodal
                        user={this.props.user}/></div>
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

export default TopNav;