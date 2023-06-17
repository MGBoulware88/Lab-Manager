import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card, Form } from 'react-bootstrap';
import styles from '../Style.module.css/AccountForm.module.css';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';
import ProviderFields from '../components/ProviderFields';


export default function AddProvider() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;

    const [allAccounts, setAllAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [providerName, setProviderName] = useState("");
    const [npi, setNpi] = useState("");

    const navigate = useNavigate();

    const handleAddProvider = async e => {
        e.preventDefault();
        //generate the data first
        const data = new URLSearchParams();
        data.append("name", providerName);
        data.append("npi", npi);
        try {
            const response = await axios.post(`${baseUrl}/providers/new/${selectedAccount}`, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            console.log(response)
            return navigate('/accounts');
        } catch (err) {
            console.log(err);
        }
    };

    //fetch all accounts
    const fetchAccounts = () => {
        axios
            .get(`${baseUrl}/accounts`)
            .then(res => {
                const data = res.data;
                data && setAllAccounts(data);
                console.log(allAccounts);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    return (
        <div className="d-flex">
            <SideNav />
            <section className="d-flex flex-column" style={{ width: "100%" }}>
                <TopNav />
                <Container className="d-flex flex-column px-3" style={{ width: "auto" }}>
                    <h1 className="text-primary">Add Provider</h1>
                    <Form onSubmit={handleAddProvider} className="">
                        <Card border="primary" className={`p-2 mb-2 ${styles.cardBody}`} >
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
                                                return <option value={account.id} key={idx}>{account.name}</option>
                                            })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <ProviderFields
                                        val1={providerName}
                                        val2={npi}
                                        onChange1={e => setProviderName(e.target.value)}
                                        onChange2={e => setNpi(e.target.value)}
                                    />
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
    )
}