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
    const [requisitionData, setRequisitionData] = useState([]);

    useEffect(() => {
        //axios call to fetch req data from db
        const allRequisitions = [{
            id: "00124092",
            firstName: "John",
            lastName: "Doe",
            department: "Pathology",
            status: "In Progress"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        },
        {
            id: "00124089",
            firstName: "Jane",
            lastName: "Doe",
            department: "Toxicology",
            status: "In Progress"
        },
        {
            id: "I231310154",
            firstName: "Jim",
            lastName: "Bean",
            department: "Infectious Disease",
            status: "Billed"
        },
        {
            id: "M231200254",
            firstName: "LaFonda",
            lastName: "",
            department: "Microbiology",
            status: "Billed"
        },
        {
            id: "P231200058",
            firstName: "Alice",
            lastName: "Doe",
            department: "Pathology",
            status: "Received"
        },
        {
            id: "P231320087",
            firstName: "James",
            lastName: "Dean",
            department: "Pathology",
            status: "Resulted"
        }
    ]
        setRequisitionData(allRequisitions)
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
                        <a className="btn bg-success d-flex align-items-center gap-2 text-light" href="/requisitions/new">
                            +
                        </a>
                    </div>
                    <hr />
                    <Table striped bordered hover variant="light" className={`${styles.tableBorder} ${styles.tableHeader}`} >
                        <thead >
                            <tr className={`${styles.tableHeader}`}>
                                <th>Record ID</th>
                                <th>Patient Name</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requisitionData.map((req, idx) => (
                                <tr key={idx}>
                                    <td>{req.id}</td>
                                    <td>{req.firstName} {req.lastName}</td>
                                    <td>{req.department}</td>
                                    <td>{req.status}</td>
                                    <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                            icon={faPen}
                                            title="Edit Req"
                                            className="me-2 text-success"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleEditReq("req_id")}
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            title="View Req"
                                            className="me-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}>
                                        <FontAwesomeIcon
                                            icon={faX}
                                            title="Delete Req"
                                            className="me-1 text-danger"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleDeleteReq("req_id")}
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