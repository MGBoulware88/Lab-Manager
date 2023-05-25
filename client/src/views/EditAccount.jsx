import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import styles from '../Style.module.css/AccountForm.module.css';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';


export default function EditAccount() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl + '/accounts';
    const [accountName, setAccountName] = useState("");
    const [addressId, setAddressId] = useState(0);
    const [accountAddressStreet, setAccountAddressStreet] = useState("");
    const [accountAddress2, setAccountAddress2] = useState("");
    const [accountAddressCity, setAccountAddressCity] = useState("");
    const [accountAddressState, setAccountAddressState] = useState("");
    const [accountAddressZip, setAccountAddressZip] = useState("");
    const [accountContactName, setAccountContactName] = useState("");
    const [accountContactPhone, setAccountContactPhone] = useState("");
    const [accountContactEmail, setAccountContactEmail] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    const handleEditAccount = async e => {
        e.preventDefault();
        //generate the data for PUT
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
            const response = await axios.put(`${baseUrl}/${id}`, data, {
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

    const fetchAccount = id => {
        axios
            .get(`${baseUrl}/${id}`)
            .then(res => {
                const data = res.data;
                const accountAddress = data?.address;
                console.log(data);
                setAccountName(data.name);
                setAccountAddressStreet(accountAddress?.street);
                setAccountAddress2(accountAddress?.address2);
                setAccountAddressCity(accountAddress?.city);
                setAccountAddressState(accountAddress?.state);
                setAccountAddressZip(accountAddress?.zip);
                setAccountContactName(data.contactName);
                setAccountContactPhone(data.contactPhone);
                setAccountContactEmail(data.contactEmail);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchAccount(id);
    }, []);



    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <div className="d-flex flex-column px-3">
                    <h1 className="text-primary">Edit account</h1>
                    <Form onSubmit={handleEditAccount} className="">
                        <Card border="primary" className={`p-2 mb-2 ${styles.cardBody}`}>
                            <div className="d-flex gap-3">
                                <div>
                                    <h1 className="h6">Account Details</h1>
                                    <Form.Group>
                                        <FloatingLabel controlId="formAccountName" label="Account Name" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Account Name"
                                                value={accountName}
                                                onChange={e => setAccountName(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formPatientAddressStreet">
                                        <FloatingLabel controlId="formPatientAddressStreet" label="Address" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Address"
                                                value={accountAddressStreet}
                                                onChange={e => setAccountAddressStreet(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountAddress2">
                                        <FloatingLabel controlId="formAccountAddress2" label="Address 2" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Address 2"
                                                value={accountAddress2}
                                                onChange={e => setAccountAddress2(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountAddressCity">
                                        <FloatingLabel controlId="formAccountAddressCity" label="City" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="City"
                                                value={accountAddressCity}
                                                onChange={e => setAccountAddressCity(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountAddressState">
                                        <FloatingLabel controlId="formAccountAddressState" label="State" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="State"
                                                value={accountAddressState}
                                                onChange={e => setAccountAddressState(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountAddressZip">
                                        <FloatingLabel controlId="formAccountAddressZip" label="Zip" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Zip"
                                                value={accountAddressZip}
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
                                                value={accountContactName}
                                                onChange={e => setAccountContactName(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountContactPhone">
                                        <FloatingLabel controlId="formAccountContactPhone" label="Phone" className="mb-2">
                                            <Form.Control type="phone"
                                                placeholder="Phone"
                                                value={accountContactPhone}
                                                onChange={e => setAccountContactPhone(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId="formAccountContactEmail">
                                        <FloatingLabel controlId="formAccountContactEmail" label="Email" className="mb-2">
                                            <Form.Control type="email"
                                                placeholder="Email"
                                                value={accountContactEmail}
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
                </div>
            </div>
        </>
    )
}