import React, {Component} from 'react';
import Card from '../Card';
import CustomTable from '../CustomTable';


class CustomerList extends Component {
    state = {
        col: ["Customer ID", "Customer NAME", "ADDRESS", "EDIT"]
    }

    render() {
        return (
            <div>
                <Card>
                    <p className='font-snas font-semibold'>Account Info</p>
                    <CustomTable cols={this.state.col} data={this.props.data}/>
                </Card>
            </div>
        );
    }
}

export default CustomerList;