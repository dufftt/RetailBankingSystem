import React, {Component} from 'react';
import {Body, Cell, Head, HeaderCell, HeaderRow, Row, Table} from '@zendeskgarden/react-tables';

class CustomTable extends Component {
    render() {
        return (<div style={{overflowX: 'auto'}}>
            <Table style={{minWidth: 500}}>
                <Head>
                    <HeaderRow>
                        {this.props.cols.map((name, key) => <HeaderCell key={key}>{name}</HeaderCell>)}
                    </HeaderRow>
                </Head>
                <Body>
                    {this.props.data.map((row, key) => {
                        return <Row key={key}>{Object.keys(row).map((col, key) => <Cell
                            key={key}>{row[col]}</Cell>)}</Row>
                    })}
                </Body>
            </Table>
        </div>);
    }
}

export default CustomTable;