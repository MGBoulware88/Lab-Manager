import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import styles from '../Style.module.css/AccountForm.module.css';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';


export default function AddAccount() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const [accountName, setAccountName] = useState("");
    const [accountAddressStreet, setAccountAddressStreet] = useState("");
    const [accountAddress2, setAccountAddress2] = useState("");
    const [accountAddressCity, setAccountAddressCity] = useState("");
    const [accountAddressState, setAccountAddressState] = useState("");
    const [accountAddressZip, setAccountAddressZip] = useState("");
    const [accountContactName, setAccountContactName] = useState("");
    const [accountContactPhone, setAccountContactPhone] = useState("");
    const [accountContactEmail, setAccountContactEmail] = useState("");

    const navigate = useNavigate();

    const handleAddAccount = async e => {
        e.preventDefault();
        //generate the data for POST
        const data = new URLSearchParams();
        data.append("name", accountName);
        data.append("street", accountAddressStreet);
        data.append("address2", accountAddress2);
        data.append("city", accountAddressCity);
        data.append("state", accountAddressState);
        data.append("zip", accountAddressZip);
        data.append("contactName", accountContactName);
        data.append("contactPhone", accountContactPhone);
        data.append("contactEmail", accountContactEmail);

        try {
            const response = await axios.post(`${baseUrl}/accounts/new`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            console.log(response);
            return navigate('/accounts');
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            <div className="d-flex">
                <SideNav />
                <section className="d-flex flex-column" style={{width: "100%"}}>
                    <TopNav className="flex-grow-5"/>
                    <Container id="accountForm" style={{width: "auto"}}>
                        <h1 className="text-primary">Add account</h1>
                        <Form onSubmit={handleAddAccount} className="">
                            <Card border="primary" className={`p-2 mb-2 ${styles.cardBody}`}>
                                <div className="d-flex gap-3">
                                    <div>
                                        <h1 className="h6">Account Details</h1>
                                        <Form.Group>
                                            <FloatingLabel controlId="formAccountName" label="Account Name" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Account Name"
                                                    onChange={e => setAccountName(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddressStreet">
                                            <FloatingLabel controlId="formPatientAddressStreet" label="Address" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Address"
                                                    onChange={e => setAccountAddressStreet(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountAddress2">
                                            <FloatingLabel controlId="formAccountAddress2" label="Address 2" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Address 2"
                                                    onChange={e => setAccountAddress2(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountAddressCity">
                                            <FloatingLabel controlId="formAccountAddressCity" label="City" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="City"
                                                    onChange={e => setAccountAddressCity(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountAddressState">
                                            <FloatingLabel controlId="formAccountAddressState" label="State" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="State"
                                                    onChange={e => setAccountAddressState(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountAddressZip">
                                            <FloatingLabel controlId="formAccountAddressZip" label="Zip" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Zip"
                                                    onChange={e => setAccountAddressZip(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <h1 className="h6">Contact Details</h1>
                                        <Form.Group controlId='formAccountContactName'>
                                            <FloatingLabel controlId="formAccountContactName" label="Contact Name" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Contact Name"
                                                    onChange={e => setAccountContactName(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountContactPhone">
                                            <FloatingLabel controlId="formAccountContactPhone" label="Phone" className="mb-2">
                                                <Form.Control type="phone"
                                                    placeholder="Phone"
                                                    onChange={e => setAccountContactPhone(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formAccountContactEmail">
                                            <FloatingLabel controlId="formAccountContactEmail" label="Email" className="mb-2">
                                                <Form.Control type="email"
                                                    placeholder="Email"
                                                    onChange={e => setAccountContactEmail(e.target.value)}
                                                    className={`${styles.formField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Card>
                            <Button className="bg-success mb-2 me-1 p-2 px-3 text-dark" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Container>
                </section>
            </div>
        </>
    )
}