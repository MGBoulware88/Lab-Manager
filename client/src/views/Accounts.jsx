import React, { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, FloatingLabel, Table, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFilter, faMagnifyingGlassArrowRight, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/RequisitionTable.module.css";
import FilterReqForm from '../components/FilterReqForm';


export default function RequisitionTable() {
    const [searchTerm, setSearchTerm] = useState("");
    // const [isFilterReqModalOpen, setIsFilterReqModalOpen] = useState(false);
    const [allAccounts, setAllAccounts] = useState([]);

    useEffect(() => {
        //axios call to fetch req data from db
        const allAccounts = [{ name: "Example Account A", id: "1", contact: "John" }, { name: "Example Account B", id: "2", contact: "John"  }, { name: "Example Account C", id: "3", contact: "John"  }, { name: "Example Account D", id: "4", contact: "John"  }, { name: "Example Account E", id: "5", contact: "John"  }, { name: "Example Account F", id: "6", contact: "John"  }, { name: "Example Account G", id: "7", contact: "John"  }];
        setAllAccounts(allAccounts)
    }, [])

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

    const handleEditReq = id => {
        console.log(id);
    }
    const handleViewReq = id => {
        console.log(id);
    }
    const handleDeleteReq = id => {
        console.log(id);
    }

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
                                    <Form.Control type="text" placeholder="search" className={`${styles.search}`}value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
                                <th>Account Id</th>
                                <th>Account Name</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAccounts.map((account, idx) => (
                                <tr key={idx}>
                                    <td>{account.id}</td>
                                    <td>{account.name}</td>
                                    <td>{account.contact}</td>
                                    <td>
                                    {/* <a target="_blank" rel="noreferrer noopener" href={`/accounts/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            title="Edit Req"
                                            className="me-2 text-success"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/accounts/view?${"req_id"}`}>
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            title="View Req"
                                            className="me-2"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </a> */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/accounts/delete/${"account_id"}`}>
                                        <FontAwesomeIcon
                                            icon={faX}
                                            title="Delete Account"
                                            className="me-1 text-danger"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleDeleteReq("account_id")}
                                        />
                                    </a>
                                </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                </Container>

            </div>
        </>
    )
}