import React, {Component} from 'react';
import "./css/Sidebar.css"
import {Link} from "react-router-dom";

class Sidebar extends Component {
    loadcustomernavitem = () => {
        return (<div className="text-gray-100 ">
            <div className="p-3 h-12 z-20 text-lg">
                <Link to="/">
                    <div className="float-left pl-3"><i className={"fas fa-home px-2"}
                                                        aria-hidden="true"/>Home
                    </div>
                </Link>
            </div>

        </div>)
    }

    loademployeenavitem = () => {
        return (<div className="text-gray-100 ">
            <div className="p-3 h-12 z-20 text-lg">
                <Link to="/">
                    <div className="float-left pl-3"><i className={"fas fa-home px-2"}
                                                        aria-hidden="true"/>Home
                    </div>
                </Link>
            </div>
        </div>)
    }

    loadusernavitem = () => {
        if (this.props.user.role === 'CUSTOMER') {
            return this.loadcustomernavitem();
        }
        if (this.props.user.role === 'EMPLOYEE') {
            return this.loademployeenavitem();
        }
    }


    render() {
        return (
            <div className="sm:w-56 min-h-screen bgsidebar fixed hidden sm:block w-full ">
                <div className="h-20 font-serif lg:block font-bold">
                    <h1 className="text-center text-3xl p-5 text-white">
                        Brand
                    </h1>
                </div>
                {this.loadusernavitem()}
            </div>
        );
    }
}

export default Sidebar;