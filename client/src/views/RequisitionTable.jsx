import React, { useState, useEffect, useContext } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, FloatingLabel, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlassArrowRight, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/RequisitionTable.module.css";
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';

export default function RequisitionTable() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const [searchTerm, setSearchTerm] = useState("");
    // const [isFilterReqModalOpen, setIsFilterReqModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [requisitionData, setRequisitionData] = useState([]);

    useEffect(() => {
        async function getReqData() {
            const response = await axios.get(`${baseUrl}/requisitions`);
            const reqData = response.data;
            setRequisitionData(reqData);
            setIsLoading(false);
            // console.log(requisitionData);
        }

        isLoading && getReqData();

    });

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
                                <th>Account Name</th>
                                <th>Provider Name</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan={7}>Loading Requisition Data. . .</td></tr> :  requisitionData.map((req, idx) => {
                                return <tr key={idx}>
                                    <td>{req?.accessionNumber ? req.accessionNumber : req?.formId}</td>
                                    <td>{req?.patient?.firstName} {req?.patient?.lastName}</td>
                                    <td>{req?.account?.name}</td>
                                    <td>{req?.orderingProvider?.name}</td>
                                    <td>{req?.testOrder[0]?.department}</td>
                                    <td>{req?.status?.status}</td>
                                    <td>
                                        <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit/${req.id}`}>
                                            <FontAwesomeIcon
                                                icon={faPen}
                                                title="Edit Req"
                                                className="me-2 text-success"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </a>
                                        <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view/${req.id}`}>
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                title="View Req"
                                                className="me-2"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </a>
                                        <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${req.id}`}>
                                            <FontAwesomeIcon
                                                icon={faX}
                                                title="Delete Req"
                                                className="me-1 text-danger"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </a>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                    {requisitionData.map((req, idx) => {
                        return req?.status[0]?.status
                    })}
                </Container>

            </div>
        </>
    )
}