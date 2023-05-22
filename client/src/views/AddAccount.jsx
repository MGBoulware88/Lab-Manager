import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import styles from '../Style.module.css/AccountForm.module.css';

export default function AddAccount() {
    const [accountName, setAccountName] = useState("");
    const [accountAddressStreet, setAccountAddressStreet] = useState("");
    const [accountAddress2, setAccountAddress2] = useState("");
    const [accountAddressCity, setAccountAddressCity] = useState("");
    const [accountAddressState, setAccountAddressState] = useState("");
    const [accountAddressZip, setAccountAddressZip] = useState("");
    const [accountContactName, setAccountContactName] = useState("");
    const [accountContactPhone, setAccountContactPhone] = useState(null);
    const [accountContactEmail, setAccountContactEmail] = useState("");
    const [accountProviderName, setAccountProviderName] = useState([""]);
    const [accountProviderNpi, setAccountProviderNpi] = useState([null]);

    const navigate = useNavigate();

    const handleAddAccount = e => {
        e.preventDefault();
        //save to db
        const newAccount = {
            name: accountName,
            address: {
                streetName: accountAddressStreet,
                address2: accountAddress2,
                city: accountAddressCity,
                state: accountAddressState,
                zip: accountAddressZip,
            },
            contact: {
                accountContactName,
                accountContactPhone,
                accountContactEmail
            },
            provider: {
                name: accountProviderName,
                npi: accountProviderNpi
            }
        }

        console.log(newAccount);
        //axios POST newAccount
        return navigate('/accounts');
    }

    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <div className="d-flex flex-column px-3">
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
                                    <h1 className="h6">Account Provider</h1>
                                    <Form.Group controlId='formAccountProviderName'>
                                        <FloatingLabel controlId="formAccountProviderName" label="Provider Name" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Provider Name"
                                                onChange={e => setAccountProviderName(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId='formAccountProviderNPI'>
                                        <FloatingLabel controlId="formAccountProviderNPI" label="Provider NPI" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Provider NPI"
                                                onChange={e => setAccountProviderNpi(e.target.value)}
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
                </div>
            </div>
        </>
    )
}