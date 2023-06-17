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

export default function RequisitionTable() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const [requisitionData, setRequisitionData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchRecords, setSearchRecords] = useState("");
    const [searchPatientFirstName, setSearchPatientFirstName] = useState("");
    const [searchPatientLastName, setSearchPatientLastName] = useState("");
    const [searchAccountName, setSearchAccountName] = useState("");
    const [searchProviderName, setSearchProviderName] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    async function getReqData() {
        const response = await axios.get(`${baseUrl}/requisitions`);
        const reqData = response.data;
        setRequisitionData(reqData);
        setIsLoading(false);
        // console.log(requisitionData);
    }
    useEffect(() => {

        isLoading && getReqData();

    });

    const getSearchData = () => {
        let query = "";
        if (searchRecords) {
            //always first
            if (query !== "") {
                query += `&formId=${searchRecords}`;
            } else query += `formId=${searchRecords}`;
        }
        if (searchPatientFirstName.length > 0) {
            //check if not first
            if (query !== "") {
                query += `&patientFirstName=${searchPatientFirstName}`;
            } else query += `patientFirstName=${searchPatientFirstName}`;
        }
        if (searchPatientLastName.length > 0) {
            if (query !== "") {
                query += `&patientLastName=${searchPatientLastName}`;
            } else query += `patientLastName=${searchPatientLastName}`;
        }
        if (searchAccountName.length > 0) {
            if (query !== "") {
                query += `&accountName=${searchAccountName}`;
            } else query += `accountName=${searchAccountName}`;
        }
        if (searchProviderName.length > 0) {
            if (query !== "") {
                query += `&providerName=${searchProviderName}`;
            } else query += `providerName=${searchProviderName}`;
        }
        if (searchDepartment.length > 0) {
            if (query !== "") {
                query += `&department=${searchDepartment}`;
            } else query += `department=${searchDepartment}`;
        }
        if (searchStatus.length > 0) {
            if (query !== "") {
                query += `&status=${searchStatus}`;
            } else query += `status=${searchStatus}`;
        }
        console.log(`Search Query: ${query}`);

        axios
            .get(`${baseUrl}/requisitions/search?${query}`)
            .then(res => {
                setRequisitionData(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    const getDataWithDelay = debounce(() => {
        getSearchData();
    }, 250);

    const handleSearch = e => {
        e.preventDefault();
        // alert("You searched for " + searchRecords);
        getSearchData();
    }

    const handleSearchRecords = e => {
        setSearchRecords(e.target.value);
        // console.log(searchRecords);
        getDataWithDelay();
    }

    const handleSearchPatientFirstName = e => {
        setSearchPatientFirstName(e.target.value);
        getDataWithDelay();
    }

    const handleSearchPatientLastName = e => {
        setSearchPatientLastName(e.target.value);
        getDataWithDelay();
    }

    const handleSearchAccountName = e => {
        setSearchAccountName(e.target.value);
        getDataWithDelay();
    }

    const handleSearchProviderName = e => {
        setSearchProviderName(e.target.value);
        getDataWithDelay();
    }

    const handleSearchDepartmentName = e => {
        setSearchDepartment(e.target.value);
        getDataWithDelay();
    }

    const handleSearchStatus = e => {
        setSearchStatus(e.target.value);
        getDataWithDelay();
    }

    return (
        <>
            <div className="d-flex">
                <SideNav />
                <section id="requisitionTable" className="d-flex flex-column" style={{width: "100%"}}>
                    <TopNav />
                    <Container>
                        <div className='d-flex justify-content-between align-items-center'>
                            <a className="btn bg-secondary d-flex align-items-center gap-2 text-light" href="/requisitions/new">
                                +
                            </a>
                        </div>
                        <hr />
                        <Table striped bordered hover variant="light" className={`${styles.tableBorder} ${styles.tableHeader}`} >
                            <thead >
                                <tr >
                                    <th>
                                        <Form onSubmit={handleSearch} >
                                            <Form.Group controlId="inputSearchRecordsField">
                                                <Form.Control size="sm" type="text" placeholder="search records" className={`${styles.search}`} value={searchRecords} onKeyUp={e => handleSearchRecords(e)} onChange={e => setSearchRecords(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchPatientfirstNameField">
                                                <Form.Control size="sm" type="text" placeholder="search first name" className={`${styles.search}`} value={searchPatientFirstName} onKeyUp={e => handleSearchPatientFirstName(e)} onChange={e => setSearchPatientFirstName(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchPatientLastNameField">
                                                <Form.Control size="sm" type="text" placeholder="search last name" className={`${styles.search}`} value={searchPatientLastName} onKeyUp={e => handleSearchPatientLastName(e)} onChange={e => setSearchPatientLastName(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchAccountNameField">
                                                <Form.Control size="sm" type="text" placeholder="search account name" className={`${styles.search}`} value={searchAccountName} onKeyUp={e => handleSearchAccountName(e)} onChange={e => setSearchAccountName(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchProviderNameField">
                                                <Form.Control size="sm" type="text" placeholder="search provider name" className={`${styles.search}`} value={searchProviderName} onKeyUp={e => handleSearchProviderName(e)} onChange={e => setSearchProviderName(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchDepartmentField">
                                                <Form.Control size="sm" type="text" placeholder="search department" className={`${styles.search}`} value={searchDepartment} onKeyUp={e => handleSearchDepartmentName(e)} onChange={e => setSearchDepartment(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th>
                                        <Form onSubmit={handleSearch} className="d-flex justify-content-start align-items-center gap-2">
                                            <Form.Group controlId="inputSearchStatusField">
                                                <Form.Control size="sm" type="text" placeholder="search status" className={`${styles.search}`} value={searchStatus} onKeyUp={e => handleSearchStatus(e)} onChange={e => setSearchStatus(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                    </th>
                                    <th></th>
                                </tr>
                                <tr className={`${styles.stickyTop}`}>
                                    <th>Record ID</th>
                                    <th>Patient First Name</th>
                                    <th>Patient Last Name</th>
                                    <th>Account Name</th>
                                    <th>Provider Name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <tr><td colSpan={7}>Loading Requisition Data. . .</td></tr> : requisitionData.map((req, idx) => {
                                    return <tr key={idx}>
                                        <td>{req?.accessionNumber ? req.accessionNumber : req?.formId}</td>
                                        <td>{req?.patient?.firstName}</td>
                                        <td>{req?.patient?.lastName}</td>
                                        <td>{req?.account?.name}</td>
                                        <td>{req?.orderingProvider?.name}</td>
                                        <td>{req?.testOrder[0]?.department}</td>
                                        <td>{req?.status?.status}</td>
                                        <td>
                                            <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit/${req.id}`}>
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    title="Edit Req"
                                                    className="me-2"
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
                                                    icon={faTrashCan}
                                                    title="Delete Req"
                                                    className="me-1"
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
                </section>
            </div>
        </>
    )
}