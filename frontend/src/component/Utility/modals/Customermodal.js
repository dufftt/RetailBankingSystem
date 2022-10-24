import React, {useState} from 'react';
import {Button} from '@zendeskgarden/react-buttons';
import {Footer, FooterItem, Header, Modal} from '@zendeskgarden/react-modals';
import {Col, Row} from '@zendeskgarden/react-grid';
import {Field, Input, Label, Message} from "@zendeskgarden/react-forms";
import {Datepicker} from "@zendeskgarden/react-datepickers";
import CustomerClient from "../../../Client/CustomerClient";

const panvalidation=(pan)=>{
    const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return !regex.test(pan);
}

const Customermodal = (props) => {
    const [visible, setVisible] = useState(false);
    const [userid, setuserid] = useState("");
    const [name, setName] = useState("");
    const [pan, setPan] = useState("");
    const [dateofbirth, setdob] = useState(new Date());
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Row>
            <Col textAlign="center">
                <Button onClick={() => setVisible(true)}>Create Customer</Button>
                {visible && (
                    <Modal onClose={() => setVisible(false)}>
                        <Header>CUSTOMER DETAIL</Header>
                        <Row justifyContent="center">
                            <Col sm={5}>
                                <Field>
                                    <Label>User ID</Label>
                                    <Input value={userid} onChange={event => setuserid(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Customer Name</Label>
                                    <Input value={name} onChange={event => setName(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>PAN NO.</Label>
                                    <Input  value={pan} onChange={event => setPan(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Address</Label>
                                    <Input value={address} onChange={event => setAddress(event.target.value)}/>
                                </Field>
                                <Field>
                                    <Label>Date of Birth</Label>
                                    <Datepicker value={dateofbirth} onChange={setdob}>
                                        <Input/>
                                    </Datepicker>
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Input value={password} onChange={event => setPassword(event.target.value)}/>
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
                                    if(panvalidation(pan)){
                                        alert("Invalid pan format.");
                                        setPan("");
                                        return;
                                    }
                                    setVisible(false)
                                    CustomerClient.createcustomerclient(props.user.authToken, userid, address, dateofbirth, pan, name, password)
                                }}>
                                    Create Customer
                                </Button>
                            </FooterItem>
                        </Footer>
                    </Modal>
                )}
            </Col>
        </Row>
    );
};

export default Customermodal;