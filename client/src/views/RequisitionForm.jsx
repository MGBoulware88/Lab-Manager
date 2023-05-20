import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button, Tabs, Tab, Card } from "react-bootstrap";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import styles from "../Style.module.css/RequisitionForm.module.css"

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
    const [patientInsuranceEffectiveDate, setPatientInsuranceEffectiveDate] = useState("");
    const [patientInsuranceGaurantor, setPatientInsuranceGaurantor] = useState({});
    const [patientInsuranceGaurantorRelationship, setPatientInsuranceGaurantorRelationship] = useState("Self");
    const [patientInsuranceGaurantorFirstName, setPatientInsuranceGaurantorFirstName] = useState("");
    const [patientInsuranceGaurantorLastName, setPatientInsuranceGaurantorLastName] = useState("");
    const [patientInsuranceGaurantorDob, setPatientInsuranceGaurantorDob] = useState("");
    //provider info fields
    const allAccounts = [{ name: "Example Account A", id: "1" }, { name: "Example Account B", id: "2" }, { name: "Example Account C", id: "3" }, { name: "Example Account D", id: "4" }, { name: "Example Account E", id: "5" }, { name: "Example Account F", id: "6" }, { name: "Example Account G", id: "7" }];
    const [account, setAccount] = useState({});
    const [accountProviders, setAccountProviders] = useState([{
        firstName: "Example",
        lastName: "Provider1",
        npi: "125489636"
    },
    {
        firstName: "Example",
        lastName: "Provider2",
        npi: "306489639"
    },
    {
        firstName: "Example",
        lastName: "Provider3",
        npi: "985489636"
    }
    ])
    const [orderingProvider, setOrderingProvider] = useState({})

    const handleAccountChange = e => {
        console.log("target is: ", e.target);
        const accountSelection = e.target.value;
        console.log(accountSelection);
        setAccount(e.target.value);
        console.log("value is: ", account);
        //clear out any previous selection
        setAccountProviders([]);
        setOrderingProvider({});
        //query DB to retrieve doctors of this account
    }
    //testing info fields
    const [testOrder, setTestOrder] = useState([]);

    const handleTestOrderChange = e => {
        if (testOrder.includes(e.target.value)) {
            setTestOrder(testOrder.filter((removedTest) => removedTest !== e.target.value));
        } else setTestOrder([...testOrder, e.target.value]);
    }

    const handleGaurantorFirstName = e => {
        setPatientInsuranceGaurantorFirstName(e.target.value);
        const gaurantorFirstName = patientInsuranceGaurantorFirstName;
        const gaurantorLastName = patientInsuranceGaurantorLastName;
        const gaurantorDob = patientInsuranceGaurantorDob;
        const gaurantor = {
            gaurantorFirstName,
            gaurantorLastName,
            gaurantorDob
        };
        setPatientInsuranceGaurantor(gaurantor);
    }
    const handleGaurantorLastName = e => {
        setPatientInsuranceGaurantorLastName(e.target.value);
        const gaurantorFirstName = patientInsuranceGaurantorFirstName;
        const gaurantorLastName = patientInsuranceGaurantorLastName;
        const gaurantorDob = patientInsuranceGaurantorDob;
        const gaurantor = {
            gaurantorFirstName,
            gaurantorLastName,
            gaurantorDob
        };
        setPatientInsuranceGaurantor(gaurantor);
    }
    const handleGaurantorDob = e => {
        setPatientInsuranceGaurantorDob(e.target.value);
        const gaurantorFirstName = patientInsuranceGaurantorFirstName;
        const gaurantorLastName = patientInsuranceGaurantorLastName;
        const gaurantorDob = patientInsuranceGaurantorDob;
        const gaurantor = {
            gaurantorFirstName,
            gaurantorLastName,
            gaurantorDob
        };
        setPatientInsuranceGaurantor(gaurantor);
    }

    const [reqFormErrors, setReqFormErrors] = useState([]);

    const handleReqFormSubmit = e => {
        e.preventDefault();
        // alert("Saving. . .Saved!");
        //grab all the form data from state

        //post to server w/ error handling
        // try {
        //     //axios call
        //     console.log("Saving New Order. Please Wait. . .")
        // } catch(err)  {
        //     //errors
        //     setReqFormErrors("Form Errors: ", err)
        // }

        //reset patient fields to default
        // setPatientFirstName("");
        // setPatientLastName("");
        // setPatientDob("");
        // setPatientSex("");
        // setPatientAddressStreet("");
        // setPatientAddress2("");
        // setPatientAddressCity("");
        // setPatientAddressState("");
        // setPatientAddressZip("");
        // setPatientInsuranceInsurer("");
        // setPatientInsurancePlanId("");
        // setPatientInsuranceEffectiveDate("");
        // setPatientInsuranceGaurantorRelationship("Self");
        // setPatientInsuranceGaurantorFirstName("");
        // setPatientInsuranceGaurantorLastName("");
        // setPatientInsuranceGaurantorDob("");
        // setPatientInsuranceGaurantor({});
        // //for better UX, Account & Provider can stay selected
        // //reset test selection
        // setTestOrder([]);
        // //reload new req page
        return navigate("/requisitions/success");
    }

    return (
        <>
            <TopNav />
            <div className="d-flex">
                <SideNav />
                <Form onSubmit={handleReqFormSubmit}>
                    <div className="d-flex flex-column px-3">
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
                                                    readOnly
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
                                                    readOnly
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
                                                        readOnly
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
                                                        readOnly
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
                                                                onChange={handleGaurantorFirstName}
                                                                className={`${styles.tabField}`}
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPatientInsuranceGaurantorLastName">
                                                        <FloatingLabel controlId="formPatientInsuranceGaurantorLastName" label="Last Name" className="mb-2">
                                                            <Form.Control type="text"
                                                                placeholder="Last Name"
                                                                onChange={handleGaurantorLastName}
                                                                className={`${styles.tabField}`}
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPatientInsuranceGaurantorDob">
                                                        <FloatingLabel controlId="formPatientInsuranceGaurantorDob" label="Date of Birth" className="mb-2">
                                                            <Form.Control type="date"
                                                                placeholder="Date of Birth"
                                                                onChange={handleGaurantorDob}
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
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <Form.Group controlId="formOrderingAccount">
                                            <h1 className="h6 mt-2 ms-2">Ordering Account:</h1>
                                            <Form.Select
                                                className={`py-1 `}
                                                value={account}
                                                onChange={handleAccountChange}
                                            >
                                                <option value="">Select Account</option>
                                                {allAccounts.map((account, idx) => {
                                                    return <option value={account.name} key={idx}>{account.name}</option>
                                                })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group controlId="formOrderingProvider">
                                            <h1 className="h6 mt-2 ms-2">Ordering Provider:</h1>
                                            <Form.Select
                                                className={`py-1 `}
                                                value={orderingProvider}
                                                onChange={e => setOrderingProvider(e.target.value)}
                                            >
                                                <option value="">Select Provider</option>
                                                {accountProviders.map((provider, idx) => {
                                                    return <option
                                                        value={`${provider.firstName} ${provider.lastName} - ${provider.npi}`}
                                                        key={idx}
                                                    >{provider.firstName} {provider.lastName} - {provider.npi}</option>
                                                })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Card>
                                </Tab>
                                <Tab eventKey="testingInfo" title="Test Selection">
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <Form.Group>
                                            <h1 className="h6">Pathology</h1>
                                            <Form.Check
                                                label="Biopsy"
                                                value="Biopsy"
                                                readOnly
                                                type="checkbox"
                                                name="pathology"
                                                id="biopsy"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Pap Smear"
                                                value="Pap Smear"
                                                readOnly
                                                type="checkbox"
                                                name="pathology"
                                                id="papSmear"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Cytopathology (Other)"
                                                value="Cytopathology (Other)"
                                                readOnly
                                                type="checkbox"
                                                name="pathology"
                                                id="cytopathology"
                                                onChange={handleTestOrderChange}
                                            />
                                        </Form.Group>
                                    </Card>
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <Form.Group>
                                            <h1 className="h6">Infectious Disease</h1>
                                            <Form.Check
                                                label="COVID-19"
                                                value="COVID-19"
                                                readOnly
                                                type="checkbox"
                                                name="infectiousDisease"
                                                id="covid19"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="RPP"
                                                value="RPP"
                                                readOnly
                                                type="checkbox"
                                                name="infectiousDisease"
                                                id="rpp"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Gastrointestinal"
                                                value="Gastrointestinal"
                                                readOnly
                                                type="checkbox"
                                                name="infectiousDisease"
                                                id="gastro"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="UTI"
                                                value="UTI"
                                                readOnly
                                                type="checkbox"
                                                name="infectiousDisease"
                                                id="uti"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Wound/Nail"
                                                value="Wound/Nail"
                                                readOnly
                                                type="checkbox"
                                                name="infectiousDisease"
                                                id="woundNail"
                                                onChange={handleTestOrderChange}
                                            />
                                        </Form.Group>
                                    </Card>
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <Form.Group>
                                            <h1 className="h6">Toxicology</h1>
                                            <Form.Check
                                                label="Drug Screen"
                                                value="Drug Screen"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="screen"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Amphetamines"
                                                value="Amphetamines"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="amphetamines"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Antidepressants"
                                                value="Antidepressants"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="antidepressants"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Barbiturates"
                                                value="Barbiturates"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="barbs"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Benzodiazepines"
                                                value="Benzodiazepines"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="benzodiazepines"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Buprenorphine"
                                                value="Buprenorphine"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="buprenorphine"
                                                onChange={handleTestOrderChange}
                                            />
                                            <Form.Check
                                                label="Opioids"
                                                value="Opioids"
                                                readOnly
                                                type="checkbox"
                                                name="toxicology"
                                                id="opioids"
                                                onChange={handleTestOrderChange}
                                            />
                                        </Form.Group>
                                    </Card>
                                </Tab>
                            </Tabs>
                            <Button className="bg-success mb-2 me-1 p-2 px-3 text-dark" type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}