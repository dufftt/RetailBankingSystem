import React, {useState} from 'react';
import {Button} from '@zendeskgarden/react-buttons';
import {Footer, FooterItem, Header, Modal} from '@zendeskgarden/react-modals';
import {Col, Row} from '@zendeskgarden/react-grid';
import {Field, Input, Label} from "@zendeskgarden/react-forms";
import AccountClient from "../../../Client/AccountClient";


const SendMoney = (props) => {
    const [visible, setVisible] = useState(false);
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState(0);
    const [messsage, setMessage] = useState("");
    return (
        <Row>
            <Col textAlign="center">
                <Button onClick={() => setVisible(true)}>Send Money</Button>
                {visible && (
                    <Modal onClose={() => setVisible(false)}>
                        <Header>Send Money To</Header>
                        <Row justifyContent="center">
                            <Col sm={5}>
                                <Field>
                                    <Label>Sender Account id</Label>
                                    <Input value={props.accountid} readOnly/>
                                </Field>
                                <Field>
                                    <Label>Receiver Account Number</Label>
                                    <Input value={receiver} onChange={(event) => setReceiver(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Amount</Label>
                                    <Input value={amount} onChange={(event) => setAmount(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Message</Label>
                                    <Input value={messsage} onChange={(event) => setMessage(event.target.value)}/>
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
                                    AccountClient
                                        .sendMoney(props.authtoken, props.accountid, receiver, amount, messsage)
                                        .then(res => alert(res.reason))
                                        .then(res => props.updatedata());
                                    setVisible(false)
                                }}>
                                    Send Money
                                </Button>
                            </FooterItem>
                        </Footer>
                    </Modal>
                )}
            </Col>
        </Row>
    );
};

export default SendMoney;