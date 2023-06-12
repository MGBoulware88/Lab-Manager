import React, { useState, useEffect, useContext } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/RequisitionTable.module.css";
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';
import { debounce } from 'lodash';


export default function AccountTable() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl + '/accounts';
    const [searchAccountName, setSearchAccountName] = useState("");
    const [searchContactName, setSearchContactName] = useState("");
    const [searchContactPhone, setSearchContactPhone] = useState("");
    const [searchContactEmail, setSearchContactEmail] = useState("");
    const [allAccounts, setAllAccounts] = useState(null);
    const [isAccountDataLoading, setIsAccountDataLoading] = useState(true);
    //fetch all accounts
    const fetchAccounts = () => {
        axios
            .get(`${baseUrl}`)
            .then(res => {
                const data = res.data;
                data && setAllAccounts(data);
                setIsAccountDataLoading(false);
                console.log(allAccounts);
            })
            .catch(err => {
                console.log(err);
            });
    }
    //fetch all accounts on render w/ isLoading control
    useEffect(() => {
        isAccountDataLoading && fetchAccounts();
    });
    //build the query and GET updated Accounts
    const getSearchData = () => {
        //build the query with whichever fields have data
        //if query is not empty, prepend '&'
        let query = "";
        if (searchAccountName) {
            if (query !== "") {
                query += `&accountName=${searchAccountName}`;
            } else query += `accountName=${searchAccountName}`;
        }
        if (searchContactName) {
            if (query !== "") {
                query += `&contactName=${searchContactName}`;
            } else query += `contactName=${searchContactName}`;
        }
        if (searchContactPhone) {
            if (query !== "") {
                query += `&contactPhone=${searchContactPhone}`;
            } else query += `contactPhone=${searchContactPhone}`;
        }
        if (searchContactEmail) {
            if (query !== "") {
                query += `&contactEmail=${searchContactEmail}`;
            } else query += `contactEmail=${searchContactEmail}`;
        }

        axios
            .get(`${baseUrl}/search?${query}`)
            .then(res => {
                setAllAccounts(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };
    //use debounce to delay search by .25s after keyup
    const getDataWithDelay = debounce(() => {
        getSearchData();
    }, 250);
    //handle if user hits enter before delayed search takes effect --is this even necessary?
    const handleSearch = e => {
        e.preventDefault();
        getSearchData();
    }
    //handle keyup events for searching the table
    const handleSearchAccountName = e => {
        setSearchAccountName(e.target.value);
        getDataWithDelay();
    }
    const handleSearchContactName = e => {
        setSearchContactName(e.target.value);
        getDataWithDelay();
    }
    const handleSearchContactPhone = e => {
        setSearchContactPhone(e.target.value);
        getDataWithDelay();
    }
    const handleSearchContactEmail = e => {
        setSearchContactEmail(e.target.value);
        getDataWithDelay();
    }

    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <Container>
                    <div className='d-flex justify-content-between align-items-center'>
                        <a className="btn bg-secondary d-flex align-items-center gap-2 text-light" href="/accounts/new">
                            +
                        </a>
                    </div>
                    <hr />
                    <Table striped bordered hover variant="light" className={`${styles.tableBorder} ${styles.tableHeader}`} >
                        <thead >
                            <tr>
                                <th>
                                    <Form onSubmit={handleSearch} >
                                        <Form.Group controlId="inputSearchAccountNameField">
                                            <Form.Control size="sm" type="text" placeholder="search account name" className={`${styles.search}`} value={searchAccountName} onKeyUp={e => handleSearchAccountName(e)} onChange={e => setSearchAccountName(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </th>
                                <th>
                                    <Form onSubmit={handleSearch}>
                                        <Form.Group controlId="inputSearchPatientfirstNameField">
                                            <Form.Control size="sm" type="text" placeholder="search contact" className={`${styles.search}`} value={searchContactName} onKeyUp={e => handleSearchContactName(e)} onChange={e => setSearchContactName(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </th>
                                <th>
                                    <Form onSubmit={handleSearch} >
                                        <Form.Group controlId="inputSearchPatientLastNameField">
                                            <Form.Control size="sm" type="text" placeholder="search phone" className={`${styles.search}`} value={searchContactPhone} onKeyUp={e => handleSearchContactPhone(e)} onChange={e => setSearchContactPhone(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </th>
                                <th>
                                    <Form onSubmit={handleSearch}>
                                        <Form.Group controlId="inputSearchAccountNameField">
                                            <Form.Control size="sm" type="text" placeholder="search email" className={`${styles.search}`} value={searchContactEmail} onKeyUp={e => handleSearchContactEmail(e)} onChange={e => setSearchContactEmail(e.target.value)} />
                                        </Form.Group>
                                    </Form>
                                </th>
                                <th></th>
                            </tr>
                            <tr className={`${styles.tableHeader}`}>
                                <th>Account Name</th>
                                <th>Contact Name</th>
                                <th>Contact Phone</th>
                                <th>Contact Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isAccountDataLoading ? allAccounts.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.name}</td>
                                    <td>{account.contactName}</td>
                                    <td>{account.contactPhone}</td>
                                    <td>{account.contactEmail}</td>
                                    <td>
                                        <a target="_blank" rel="noreferrer noopener" href={`/accounts/edit/${account.id}`}>
                                            <FontAwesomeIcon
                                                icon={faPen}
                                                title="Edit Account"
                                                className="me-2 text"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </a>
                                        <a target="_blank" rel="noreferrer noopener" href={`/accounts/view/${account.id}`}>
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                title="View Account"
                                                className="me-2"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </a>

                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            title="Delete Account"
                                            className="me-1"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </td>
                                </tr>
                            )) :
                                <tr>
                                    <td>Add an account first</td>
                                    <td>Click the green button</td>
                                    <td>You can do it!</td>
                                    <td>I believe in you!</td>
                                </tr>
                            }

                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}