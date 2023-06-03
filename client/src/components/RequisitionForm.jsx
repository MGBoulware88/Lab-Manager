import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, FloatingLabel, Button, Tabs, Tab, Card } from "react-bootstrap";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import styles from "../Style.module.css/RequisitionForm.module.css"
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';


export default function RequisitionForm(props) {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const method = props;
    const navigate = useNavigate();
    //patient info fields
    const [patientFirstName, setPatientFirstName] = useState(props?.reqData.patient?.firstName || "");
    const [patientLastName, setPatientLastName] = useState(props?.reqData.patient?.lastName || "");
    const [patientDob, setPatientDob] = useState(props?.reqData.patient?.dob || "");
    const [patientSex, setPatientSex] = useState(props?.reqData.patient?.sex || "");
    const [patientAddressStreet, setPatientAddressStreet] = useState(props?.reqData.address?.street);
    const [patientAddress2, setPatientAddress2] = useState(props?.reqData.address?.address2 || "");
    const [patientAddressCity, setPatientAddressCity] = useState(props?.reqData.address?.city || "");
    const [patientAddressState, setPatientAddressState] = useState(props?.reqData.address?.state || "");
    const [patientAddressZip, setPatientAddressZip] = useState(props?.reqData.address?.zip || "");
    const [patientInsuranceInsurer, setPatientInsuranceInsurer] = useState(props?.reqData.insurance?.insurer || "");
    const [patientInsurancePlanId, setPatientInsurancePlanId] = useState(props?.reqData.insurance?.planId || "");
    const [patientInsuranceEffectiveDate, setPatientInsuranceEffectiveDate] = useState(props?.reqData.insurance?.effectiveDate || "");
    const [patientInsuranceGaurantorRelationship, setPatientInsuranceGaurantorRelationship] = useState(props?.reqData.insurance?.gaurantorRelationship || 'Self');
    const [patientInsuranceGaurantorFirstName, setPatientInsuranceGaurantorFirstName] = useState(props?.reqData.insurance?.gaurantorFirstName || "");
    const [patientInsuranceGaurantorLastName, setPatientInsuranceGaurantorLastName] = useState(props?.reqData.insurance?.gaurantorLastName || "");
    const [patientInsuranceGaurantorDob, setPatientInsuranceGaurantorDob] = useState(props?.reqData.insurance?.gaurantorDob || "");
    //provider info fields
    const [allAccounts, setAllAccounts] = useState([]);
    const [account, setAccount] = useState(props?.reqData.account?.id || {});
    const [accountProviders, setAccountProviders] = useState([]);
    const [orderingProvider, setOrderingProvider] = useState(props?.reqData.orderingProvider?.id || {});
    //test options
    const [allTestOptions, setAllTestOptions] = useState([]);
    const [testOrder, setTestOrder] = useState(props?.reqData.testOrder || []);
    console.log(`Tests: ${testOrder.map((test => test.checked))}`);
    console.log(props);

    // const handleTestOrderChange = (e) => {
    //     if (testOrder.includes(e.target.value)) {
    //         testOrder.filter((removedTest) => removedTest !== e.target.value);
    //         e.target.checked = false;
    //     } else {
    //         testOrder.push(e.target.value);
    //         e.target.checked = true;
    //     };
    // }

    const handleTestOrderChange = e => {
        //spread current state into a new array

        // .map() the tempArr to update checked value

        //setTestOrder with updated test.checked = true
        setTestOrder(prevTests => {
            return prevTests.map(test => {
                if (test.id === e.target.value) {
                    if (testOrder.includes(e.target.value)) {
                        return ([...testOrder, { ...test, checked: e.target.checked }])

                    } else return [...testOrder, { ...test, checked: e.target.checked }]
                } else return test;
            });
        });
    };

    const fetchAllAccounts = () => {
        axios
            .get(`${baseUrl}/accounts`)
            .then(res => {
                setAllAccounts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const fetchAllTestOptions = () => {
        axios
            .get(`${baseUrl}/test_options`)
            .then(res => {
                setAllTestOptions(res.data);
            })
            .catch(err => {
                console.log(err);
            }, []);
    }

    useEffect(() => {
        fetchAllAccounts();
        // console.log("fetching accounts: ", allAccounts);

        fetchAllTestOptions();
        // console.log("fetching tests: ", allTestOptions);

    }, [])

    const handleAccountChange = e => {
        setAccount(e.target.value);
        //clear out any previous selection
        setAccountProviders([]);
        setOrderingProvider({});
        //query DB to retrieve doctors of this account
        axios
            .get(`${baseUrl}/providers/${e.target.value}`)
            .then(res => {
                setAccountProviders(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // const [reqFormErrors, setReqFormErrors] = useState([]);

    const handleReqFormSubmit = async e => {
        e.preventDefault();
        //if self, set gaurantor to patient
        if (patientInsuranceGaurantorRelationship === 'Self') {
            setPatientInsuranceGaurantorFirstName(patientFirstName);
            setPatientInsuranceGaurantorLastName(patientLastName);
            setPatientInsuranceGaurantorDob(patientDob);
        }
        const testIds = [];
        testOrder.map(test => {
            return testIds.push(test.id);
        })
        //grab all the form data from state
        const data = {
            patientFirstName,
            patientLastName,
            patientDob,
            patientSex,
            patientAddressStreet,
            patientAddress2,
            patientAddressCity,
            patientAddressState,
            patientAddressZip,
            patientInsuranceInsurer,
            patientInsurancePlanId,
            patientInsuranceEffectiveDate,
            patientInsuranceGaurantorRelationship,
            patientInsuranceGaurantorFirstName,
            patientInsuranceGaurantorLastName,
            patientInsuranceGaurantorDob,
            account,
            orderingProvider,
            testOrder: testIds
        };

        //convert the testOrder
        data.testOrder = data.testOrder.join(',');

        console.log("here's the req data: ", data);
        if (method === "post") {
            //post to server w/ error handling
            try {
                const response = await axios.post(`${baseUrl}/requisitions`, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                console.log(response);
                return navigate("/requisitions/success");
            } catch (err) {
                console.log(err);
            }
        } else if (method === "put") {
            try {
                const response = await axios.put(`${baseUrl}/requisitions`, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                console.log(response);
                return navigate("/requisitions/success");
            } catch (err) {
                console.log(err);
            }
        } else console.log("missing method");
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
                                                        value={patientFirstName}
                                                        onChange={e => setPatientFirstName(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientLastName">
                                                <FloatingLabel controlId="formPatientLastName" label="Last Name" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="Last Name"
                                                        value={patientLastName}
                                                        onChange={e => setPatientLastName(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientDob">
                                                <FloatingLabel controlId="formPatientDob" label="Date of Birth" className="mb-2">
                                                    <Form.Control type="date"
                                                        placeholder="Date of Birth"
                                                        value={patientDob}
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
                                                        value={patientAddressStreet}
                                                        onChange={e => setPatientAddressStreet(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientAddress2">
                                                <FloatingLabel controlId="formPatientAddress2" label="Address 2" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="Address 2"
                                                        value={patientAddress2}
                                                        onChange={e => setPatientAddress2(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientAddressCity">
                                                <FloatingLabel controlId="formPatientAddressCity" label="City" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="City"
                                                        value={patientAddressCity}
                                                        onChange={e => setPatientAddressCity(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientAddressState">
                                                <FloatingLabel controlId="formPatientAddressState" label="State" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="State"
                                                        value={patientAddressState}
                                                        onChange={e => setPatientAddressState(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientAddressZip">
                                                <FloatingLabel controlId="formPatientAddressZip" label="Zip" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="Zip"
                                                        value={patientAddressZip}
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
                                                        value={patientInsuranceInsurer}
                                                        onChange={e => setPatientInsuranceInsurer(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientInsuranceId">
                                                <FloatingLabel controlId="formPatientInsuranceId" label="Insurance Plan ID" className="mb-2">
                                                    <Form.Control type="text"
                                                        placeholder="Insurance Plan ID"
                                                        value={patientInsurancePlanId}
                                                        onChange={e => setPatientInsurancePlanId(e.target.value)}
                                                        className={`${styles.tabField}`}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <Form.Group controlId="formPatientInsuranceEffectiveDate">
                                                <FloatingLabel controlId="formPatientInsuranceEffectiveDate" label="Insurance Effective Date" className="mb-2">
                                                    <Form.Control type="date"
                                                        placeholder="Insurance Effective Date"
                                                        value={patientInsuranceEffectiveDate}
                                                        onChange={e => setPatientInsuranceEffectiveDate(e.target.value)}
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
                                                    <h4 className="h6 mt-2 ms-1">Insured Details:</h4>
                                                    <Form.Group controlId="formPatientInsuranceGaurantorFirstName">
                                                        <FloatingLabel controlId="formPatientInsuranceGaurantorFirstName" label="First Name" className="mb-2">
                                                            <Form.Control type="text"
                                                                placeholder="First Name"
                                                                value={patientInsuranceGaurantorFirstName}
                                                                onChange={e => setPatientInsuranceGaurantorFirstName(e.target.value)}
                                                                className={`${styles.tabField}`}
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPatientInsuranceGaurantorLastName">
                                                        <FloatingLabel controlId="formPatientInsuranceGaurantorLastName" label="Last Name" className="mb-2">
                                                            <Form.Control type="text"
                                                                placeholder="Last Name"
                                                                value={patientInsuranceGaurantorLastName}
                                                                onChange={e => setPatientInsuranceGaurantorLastName(e.target.value)}
                                                                className={`${styles.tabField}`}
                                                            />
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Form.Group controlId="formPatientInsuranceGaurantorDob">
                                                        <FloatingLabel controlId="formPatientInsuranceGaurantorDob" label="Date of Birth" className="mb-2">
                                                            <Form.Control type="date"
                                                                placeholder="Date of Birth"
                                                                value={patientInsuranceGaurantorDob}
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
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <Form.Group controlId="formOrderingAccount">
                                            <h1 className="h6 mt-2 ms-2">Ordering Account:</h1>
                                            <Form.Select
                                                value={account}
                                                className={`py-1 `}
                                                onChange={handleAccountChange}
                                            >
                                                <option value="">Select Account</option>
                                                {allAccounts.map((account, idx) => {
                                                    return <option value={account.id} key={idx}>{account.name}</option>
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
                                                        value={`${provider.id}`}
                                                        key={idx}
                                                    >{provider.name} - {provider.npi}</option>
                                                })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Card>
                                </Tab>
                                <Tab eventKey="testingInfo" title="Test Selection">
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <h1 className="h6">Pathology</h1>
                                        {allTestOptions.map((test, idx) => {
                                            // const isChecked = find if testOrder includes this test
                                            return (test.department === "Pathology" && <Form.Check
                                                label={test.name}
                                                value={test.id}
                                                // checked={isChecked}
                                                readOnly
                                                type="checkbox"
                                                name={test.name}
                                                id={test}
                                                key={idx}
                                                onChange={handleTestOrderChange}
                                            />)

                                        })}
                                    </Card>
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <h1 className="h6">Infectious Disease</h1>
                                        {allTestOptions.map((test, idx) => {
                                            if (test.department === "Infectious Disease") {
                                                // const isChecked = find if testOrder includes this test
                                                return (
                                                    < Form.Check
                                                        label={test.name}
                                                        value={test.id}
                                                        // checked={isChecked}
                                                        readOnly
                                                        type="checkbox"
                                                        name={test.name}
                                                        id={test}
                                                        key={idx}
                                                        onChange={handleTestOrderChange}
                                                    />);
                                            } else return null;
                                        })}
                                    </Card>
                                    <Card border="primary" className={`p-2 mb-2 ${styles.tabBody}`}>
                                        <h1 className="h6">Toxicology</h1>
                                        {allTestOptions.map((test, idx) => {
                                            if (test.department === "Toxicology") {
                                                // const isChecked = find if testOrder includes this test
                                                return (
                                                    <Form.Check
                                                        label={test.name}
                                                        name={test.name}
                                                        type="checkbox"
                                                        value={test.id}
                                                        // checked={isChecked}
                                                        readOnly
                                                        id={test}
                                                        key={idx}
                                                        onChange={handleTestOrderChange}
                                                    />);
                                            } else return null;
                                        })}
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