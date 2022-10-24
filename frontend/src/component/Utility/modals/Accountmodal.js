import React, {useState} from 'react';
import {Button} from '@zendeskgarden/react-buttons';
import {Footer, FooterItem, Header, Modal} from '@zendeskgarden/react-modals';
import {Col, Row} from '@zendeskgarden/react-grid';
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import {
    Dropdown,
    Field as DropdownField,
    Item,
    Label as DropdownLabel,
    Menu,
    Select
} from '@zendeskgarden/react-dropdowns';
import AccountClient from "../../../Client/AccountClient";


const items = [
    {label: 'Savings', value: 'Savings'},
    {label: 'Current', value: 'Current'}
];
const Accountmodal = (props) => {
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[0]);
    const [currentBalance, setBalance] = useState(0);
    const [customerid, setCustomerid] = useState("");

    return (
        <Row>
            <Col textAlign="center">
                <Button onClick={() => setVisible(true)}>Create Account</Button>
                {visible && (
                    <Modal onClose={() => setVisible(false)}>
                        <Header>Account Detail</Header>
                        <Row justifyContent="center">
                            <Col sm={5}>
                                <Dropdown
                                    selectedItem={selectedItem}
                                    onSelect={setSelectedItem}
                                    downshiftProps={{itemToString: (item) => item && item.label}}
                                >
                                    <DropdownField>
                                        <DropdownLabel>Account Type</DropdownLabel>
                                        <Select>{selectedItem.label}</Select>
                                    </DropdownField>
                                    <Menu>
                                        {items.map(option => (
                                            <Item key={option.value} value={option}>
                                                {option.label}
                                            </Item>
                                        ))}
                                    </Menu>
                                </Dropdown>
                                <Field>
                                    <Label>Customer Id</Label>
                                    <Input value={customerid} onChange={event => setCustomerid(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Current Balance
                                    </Label>
                                    <Input value={currentBalance} onChange={event => setBalance(event.target.value)}/>
                                </Field>
                            </Col>
                        </Row>
                        <Footer>
                            <FooterItem>
                                <Button onClick={() => setVisible(false)} isBasic>
                                    Cancel
                                </Button>
                            </FooterItem>
                            <FooterItem>
                                <Button isPrimary onClick={() => {
                                    AccountClient.createAccount(props.user.authToken, customerid, currentBalance, selectedItem.value)
                                    setVisible(false)
                                }}>
                                    Create Account
                                </Button>
                            </FooterItem>
                        </Footer>
                    </Modal>
                )}
            </Col>
        </Row>
    );
};

export default Accountmodal;