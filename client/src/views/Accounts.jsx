import React, { useState, useEffect, useContext, useCallback } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, FloatingLabel, Table, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilter, faMagnifyingGlassArrowRight, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/RequisitionTable.module.css";
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';


export default function RequisitionTable() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl + '/accounts';

    const [searchTerm, setSearchTerm] = useState("");
    // const [isFilterReqModalOpen, setIsFilterReqModalOpen] = useState(false);
    const [allAccounts, setAllAccounts] = useState(null);

    //fetch all accounts
    const fetchAccounts = () => {
        axios
            .get(`${baseUrl}`)
            .then(res => {
                const data = res.data;
                data && setAllAccounts(data);
                console.log(allAccounts);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //fetch all accounts on render w/ empty dependency array so it only fetches once
    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleSearch = e => {
        e.preventDefault();
        alert("You searched for " + searchTerm);
    }

    // const showFilterModal = () => {
    //     setIsFilterReqModalOpen(true);
    // }

    // const hideFilterModal = () => {
    //     setIsFilterReqModalOpen(false);
    // }

    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <Container>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                            <Form.Group controlId="inputSearchField">
                                <FloatingLabel
                                    controlId="inputSearchField"
                                    label="search"
                                    className=""
                                >
                                    <Form.Control type="text" placeholder="search" className={`${styles.search}`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                </FloatingLabel>

                            </Form.Group>
                            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} title="Search" style={{ color: "50AB42", height: "2rem", cursor: "pointer" }} onClick={handleSearch} />
                            {/* <FontAwesomeIcon icon={faFilter} title="Filter" style={{ color: "#485794", height: "1.75rem", cursor: "pointer" }} onClick={showFilterModal} /> */}
                        </Form>
                        {/* {isFilterReqModalOpen &&
                            <Modal show={isFilterReqModalOpen} onHide={hideFilterModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Filter Requisitions</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FilterReqForm reqData={requisitionData}/>
                                </Modal.Body>
                            </Modal>
                        } */}
                        <a className="btn bg-success d-flex align-items-center gap-2 text-light" href="/accounts/new">
                            +
                        </a>
                    </div>
                    <hr />
                    <Table striped bordered hover variant="light" className={`${styles.tableBorder} ${styles.tableHeader}`} >
                        <thead >
                            <tr className={`${styles.tableHeader}`}>
                                <th>Account Name</th>
                                <th>Contact Name</th>
                                <th>Contact Phone</th>
                                <th>Contact Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAccounts?.length > 0 ? allAccounts.map((account) => (
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
                                            className="me-2 text-success"
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
                                                icon={faX}
                                                title="Delete Account"
                                                className="me-1 text-danger"
                                                style={{ cursor: "pointer" }}
                                            />
                                    </td>
                                </tr>
                            )):
                            <tr>
                                <td>Add an account first</td>
                                <td>Click the green button</td>
                                <td>You can do it!</td>
                                <td>I beleive in you!</td>
                            </tr>
                            }

                        </tbody>
                    </Table>
                </Container>

            </div>
        </>
    )
}