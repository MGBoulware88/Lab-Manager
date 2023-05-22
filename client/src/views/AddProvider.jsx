import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import styles from '../Style.module.css/AccountForm.module.css';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';

export default function AddProvider() {
    // const [allAccounts, setAllAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [providerName, setProviderName] = useState("");
    const [npi, setNpi] = useState(null);

    const navigate = useNavigate();

    const allAccounts = [{ name: "Example Account A", id: "1" }, { name: "Example Account B", id: "2" }, { name: "Example Account C", id: "3" }, { name: "Example Account D", id: "4" }, { name: "Example Account E", id: "5" }, { name: "Example Account F", id: "6" }, { name: "Example Account G", id: "7" }];

    const handleAddProvider = e => {
        e.preventDefault();

        navigate('/accounts')
    };

    // useEffect(() => {
    //     //axios fetch all accounts
    //     setAllAccounts(data)
    // }, []);

    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <div className="d-flex flex-column px-3">
                    <h1 className="text-primary">Add Provider</h1>
                    <Form onSubmit={handleAddProvider} className="">
                        <Card border="primary" className={`p-2 mb-2 ${styles.cardBody}`}>
                            <div className="d-flex gap-3">
                                <div>
                                    <h1 className="h6">Account Provider</h1>
                                    <Form.Group controlId="formAccount">
                                        <Form.Select
                                            className={`py-2 bg-secondary mb-2`}
                                            value={selectedAccount}
                                            onChange={e => setSelectedAccount(e.target.value)}
                                        >
                                            <option value="">Select Account</option>
                                                {allAccounts.map((account, idx) => {
                                                    return <option value={account.name} key={idx}>{account.name}</option>
                                                })
                                                }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId='formAccountProviderName'>
                                        <FloatingLabel controlId="formAccountProviderName" label="Provider Name" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Provider Name"
                                                value={providerName}
                                                onChange={e => setProviderName(e.target.value)}
                                                className={`${styles.formField}`}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group controlId='formAccountProviderNPI'>
                                        <FloatingLabel controlId="formAccountProviderNPI" label="Provider NPI" className="mb-2">
                                            <Form.Control type="text"
                                                placeholder="Provider NPI"
                                                value={npi}
                                                onChange={e => setNpi(e.target.value)}
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