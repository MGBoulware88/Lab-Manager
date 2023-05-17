import React, { useState } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Form, FloatingLabel, Table, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faEye, faFilter, faMagnifyingGlassArrowRight, faPen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/RequisitionTable.module.css";


export default function RequisitionTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isNewReqModalOpen, setIsNewReqModalOpen] = useState(false);

    const handleSearch = () => {
        alert("You searched for " + searchTerm);
    }

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
                    <h1>Requisition Table Page</h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Form className="d-flex justify-content-start align-items-center gap-2">
                            <Form.Group controlId="inputSearchField">
                                <FloatingLabel
                                    controlId="inputSearchField"
                                    label="search"
                                    className=""
                                >
                                    <Form.Control type="text" placeholder="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                                </FloatingLabel>

                            </Form.Group>
                            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} style={{ color: "50AB42", height: "2rem", cursor: "pointer", title: "Search" }} onClick={handleSearch}/>
                            <FontAwesomeIcon icon={faFilter} title="filter" style={{ color: "#485794", height: "1.75rem", cursor: "pointer" }}/>
                        </Form>
                        <Button className="bg-success d-flex align-items-center gap-2 text-light" title="New Req" onClick={() => setIsNewReqModalOpen(!isNewReqModalOpen)}>
                            +
                        </Button>
                    </div>
                    <hr />
                    <Table  striped bordered hover variant="light" className={`${styles.tableBorder}`} >
                        <thead>
                            <tr>
                                <th>Record ID</th>
                                <th>Patient Name</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>00124092</td>
                                <td>John Doe</td>
                                <td>Pathology</td>
                                <td>In Progress</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>00124089</td>
                                <td>Jane Doe</td>
                                <td>Toxicology</td>
                                <td>In Progress</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>I231310154</td>
                                <td>Jim Bean</td>
                                <td>Infectious Disease</td>
                                <td>Billed</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>M231200254</td>
                                <td>LaFonda</td>
                                <td>Microbiology</td>
                                <td>Billed</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>P231200058</td>
                                <td>Alice Doe</td>
                                <td>Pathology</td>
                                <td>Received</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>P231320087</td>
                                <td>James Dean</td>
                                <td>Pathology</td>
                                <td>Resulted</td>
                                <td>
                                    {/* Edit Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        {/* View Req */}
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    {/* Delete Req --special permissions */}
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* <Table  striped bordered hover variant="light" >
                        <thead>
                            <tr>
                                <th>Record ID</th>
                                <th>Patient Name</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>00124092</td>
                                <td>John Doe</td>
                                <td>Pathology</td>
                                <td>In Progress</td>
                                <td>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>00124089</td>
                                <td>Jane Doe</td>
                                <td>Toxicology</td>
                                <td>In Progress</td>
                                <td>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>I231310154</td>
                                <td>Jim Bean</td>
                                <td>Infectious Disease</td>
                                <td>Billed</td>
                                <td>
                                
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>M231200254</td>
                                <td>LaFonda</td>
                                <td>Microbiology</td>
                                <td>Billed</td>
                                <td>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>P231200058</td>
                                <td>Alice Doe</td>
                                <td>Pathology</td>
                                <td>Received</td>
                                <td>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>P231320087</td>
                                <td>James Dean</td>
                                <td>Pathology</td>
                                <td>Resulted</td>
                                <td>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/edit?${"req_id"}`}>
                                        <FontAwesomeIcon
                                        icon={faPen}
                                        title="Edit Req"
                                        className="me-2 text-success"
                                        style={{cursor: "pointer"}}
                                        onClick={handleEditReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/view?${"req_id"}`}>
                                        
                                        <FontAwesomeIcon
                                        icon={faEye}
                                        title="View Req"
                                        className="me-2 text-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={handleViewReq("req_id")}
                                        />
                                    </a>
                                    
                                    <a target="_blank" rel="noreferrer noopener" href={`/requisitions/delete/${"req_id"}`}> 
                                        <FontAwesomeIcon
                                        icon={faX}
                                        title="Delete Req"
                                        className="me-1 text-danger"
                                        style={{cursor: "pointer"}}
                                        onClick={handleDeleteReq("req_id")}
                                        target="_blank"
                                        />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table> */}
                </Container>

            </div>
        </>
    )
}