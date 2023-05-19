import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button, Tabs, Tab, Card, Container } from "react-bootstrap";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import styles from "../Style.module.css/RequisitionForm.module.css"
import { Autocomplete } from '@mantine/core';

export default function RequisitionForm() {
    const navigate = useNavigate();
    //patient info fields
    const [patientFirstName, setPatientFirstName] = useState("");
    const [patientLastName, setPatientLastName] = useState("");
    const [patientDob, setPatientDob] = useState("");
    const [patientSex, setPatientSex] = useState("");
    const [patientAddressStreet, setPatientAddressStreet] = useState("");
    const [patientAddress2, setPatientAddress2] = useState("");
    const [patientAddressCity, setPatientAddressCity] = useState("");
    const [patientAddressState, setPatientAddressState] = useState("");
    const [patientAddressZip, setPatientAddressZip] = useState("");
    const [patientInsuranceInsurer, setPatientInsuranceInsurer] = useState("");
    const [patientInsurancePlanId, setPatientInsurancePlanId] = useState("");
    const [patientInsuranceGaurantor, setPatientInsuranceGaurantor] = useState("");
    const [patientInsuranceGaurantorRelationship, setPatientInsuranceGaurantorRelationship] = useState("Self");
    const [patientInsuranceEffectiveDate, setPatientInsuranceEffectiveDate] = useState("");
    const [patientInsuranceGaurantorFirstName, setPatientInsuranceGaurantorFirstName] = useState("");
    const [patientInsuranceGaurantorLastName, setPatientInsuranceGaurantorLastName] = useState("");
    const [patientInsuranceGaurantorDob, setPatientInsuranceGaurantorDob] = useState("");
    //provider info fields
    const allAccounts = useState(["A", 'B', 'C', 'D', 'E', 'F', 'G']);
    const [account, setAccount] = useState(null)
    //testing info fields

    //add all tab fields to state

    const handleReqFormSubmit = () => {
        //grab all the form data from state
        return navigate("/requisitions/new");
    }
    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <div className="d-flex flex-column align-items-start justify-content-start px-3">
                    <div>
                        <Tabs
                            defaultActiveKey={"patientInfo"}
                            id="uncontrolled-req-tab"
                            className={`${styles.tabHeader}`}
                        >
                            <Tab eventKey="patientInfo" title="Patient Info" className={`mb-2`}>
                                <div className="d-flex gap-2">
                                    <Card border="primary" className={`px-2 mb-2 ${styles.tabBody}`} >
                                        <h1 className="h5 mt-2 ms-2">Patient Demographics</h1>
                                        {/* save all to state onChange */}
                                        <Form.Group controlId="formPatientFirstName">
                                            <FloatingLabel controlId="formPatientFirstName" label="First Name" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="First Name"
                                                    onChange={e => setPatientFirstName(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientLastName">
                                            <FloatingLabel controlId="formPatientLastName" label="Last Name" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Last Name"
                                                    onChange={e => setPatientLastName(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientDob">
                                            <FloatingLabel controlId="formPatientDob" label="Date of Birth" className="mb-2">
                                                <Form.Control type="date"
                                                    placeholder="Date of Birth"
                                                    onChange={e => setPatientDob(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientSex">
                                            <h3 className="h6 mt-1 ms-1">Patient Sex</h3>
                                            <Form.Check
                                                inline
                                                label="Female"
                                                value="Female"
                                                checked={patientSex === "Female"}
                                                name="patientSex"
                                                type="radio"
                                                id="female"
                                                className="ms-1 mb-1"
                                                onClick={e => setPatientSex(e.target.value)}
                                            />
                                            <Form.Check
                                                inline
                                                label="Male"
                                                value="Male"
                                                checked={patientSex === "Male"}
                                                name="patientSex"
                                                type="radio"
                                                id="male"
                                                onClick={e => setPatientSex(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddressStreet">
                                            <FloatingLabel controlId="formPatientAddressStreet" label="Address" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Address"
                                                    onChange={e => setPatientAddressStreet(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddress2">
                                            <FloatingLabel controlId="formPatientAddress2" label="Address 2" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Address 2"
                                                    onChange={e => setPatientAddress2(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddressCity">
                                            <FloatingLabel controlId="formPatientAddressCity" label="City" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="City"
                                                    onChange={e => setPatientAddressCity(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddressState">
                                            <FloatingLabel controlId="formPatientAddressState" label="State" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="State"
                                                    onChange={e => setPatientAddressState(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientAddressZip">
                                            <FloatingLabel controlId="formPatientAddressZip" label="Zip" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Zip"
                                                    onChange={e => setPatientAddressZip(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Card>
                                    <Card className={`px-2 mb-2 ${styles.tabBody}`}>
                                        <h1 className="h5 mt-2 ms-2">Insurance Details</h1>
                                        {/* save all to state onChange */}
                                        <Form.Group controlId="formPatientInsuranceInsurer">
                                            <FloatingLabel controlId="formPatientInsuranceInsurer" label="Insurance Provider" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Insurance"
                                                    onChange={e => setPatientInsuranceInsurer(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientInsuranceId">
                                            <FloatingLabel controlId="formPatientInsuranceId" label="Insurance Plan ID" className="mb-2">
                                                <Form.Control type="text"
                                                    placeholder="Insurance Plan ID"
                                                    onChange={e => setPatientInsurancePlanId(e.target.value)}
                                                    className={`${styles.tabField}`}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group controlId="formPatientInsuranceGaurantorRelationship">
                                            <h3 className="h5 mt-1 ms-1">Relationship to Insured</h3>
                                            <div className="d-flex mb-2">
                                                <Form.Check
                                                    inline
                                                    label="Self"
                                                    value="Self"
                                                    checked={patientInsuranceGaurantorRelationship === "Self"}
                                                    name="relationship"
                                                    type="radio"
                                                    id="self"
                                                    className="ms-1"
                                                    onClick={e => setPatientInsuranceGaurantorRelationship(e.target.value)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Other"
                                                    value="Other"
                                                    checked={patientInsuranceGaurantorRelationship !== "Self"}
                                                    name="relationship"
                                                    type="radio"
                                                    id="other"
                                                    className="ms-1"
                                                    onClick={e => setPatientInsuranceGaurantorRelationship(e.target.value)}
                                                />
                                                {patientInsuranceGaurantorRelationship !== "Self" &&
                                                    <Form.Select
                                                        className={`py-1 `}
                                                        value={patientInsuranceGaurantorRelationship}
                                                        onChange={e => setPatientInsuranceGaurantorRelationship(e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Dependent">Dependent</option>
                                                        <option value="Parent">Parent</option>
                                                        <option value="Legal Guardian">Legal Guardian</option>
                                                    </Form.Select>
                                                }
                                            </div>
                                        </Form.Group>
                                        {/* conditionally render this if Relationship isnot Self */}
                                        {patientInsuranceGaurantorRelationship !== "Self" &&
                                            <>
                                                <h4 className="h6 mt-1 ms-1">Insured Details:</h4>
                                                <Form.Group controlId="formPatientInsuranceGaurantorFirstName">
                                                    <FloatingLabel controlId="formPatientInsuranceGaurantorFirstName" label="First Name" className="mb-2">
                                                        <Form.Control type="text"
                                                            placeholder="First Name"
                                                            onChange={e => setPatientInsuranceGaurantorFirstName(e.target.value)}
                                                            className={`${styles.tabField}`}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group controlId="formPatientInsuranceGaurantorLastName">
                                                    <FloatingLabel controlId="formPatientInsuranceGaurantorLastName" label="Last Name" className="mb-2">
                                                        <Form.Control type="text"
                                                            placeholder="Last Name"
                                                            onChange={e => setPatientInsuranceGaurantorLastName(e.target.value)}
                                                            className={`${styles.tabField}`}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group controlId="formPatientInsuranceGaurantorDob">
                                                    <FloatingLabel controlId="formPatientInsuranceGaurantorDob" label="Date of Birth" className="mb-2">
                                                        <Form.Control type="date"
                                                            placeholder="Date of Birth"
                                                            onChange={e => setPatientInsuranceGaurantorDob(e.target.value)}
                                                            className={`${styles.tabField}`}
                                                        />
                                                    </FloatingLabel>
                                                </Form.Group>
                                            </>
                                        }
                                    </Card>
                                </div>
                            </Tab>
                            <Tab eventKey="providerInfo" title="Provider Info">
                                <Card>
                                    {/* <Autocomplete
                                        label="Account"
                                        placeholder="Account"
                                        date={["A", 'B', 'C', 'D', 'E', 'F', 'G']}
                                    /> */}
                                </Card>
                            </Tab>
                            <Tab eventKey="testingInfo" title="Test Selection">
                                <Card>
                                    <input type="text" />
                                    testingInfo
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                    <Form action="/requisitions/submit" method="POST" className="mt-1">
                        <Button className="bg-primary mb-2 p-2 text-dark" onClick={handleReqFormSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}