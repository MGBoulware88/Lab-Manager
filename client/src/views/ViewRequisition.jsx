import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import { Accordion, Container } from "react-bootstrap";

export default function ViewRequisition() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const { id } = useParams();
    const [reqData, setReqData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [pathologyTests, setPathologyTests] = useState(null);
    const [infectiousDiseaseTests, setInfectiousDiseaseTests] = useState(null);
    const [toxicologyTests, setToxicologyTests] = useState(null);

    const setTests = data => {
        setPathologyTests(data.testOrder.map(test => {
            return test.department === "Pathology" && 
            (
                pathologyTests !== null ? [...pathologyTests, test.name] : [test.name]
            )
        }));
        
        setInfectiousDiseaseTests(data.testOrder.map(test => {
            return test.department === "Infectious Disease" && 
            (
                infectiousDiseaseTests !== null ? [...infectiousDiseaseTests, test.name] : [test.name]
            )
        }));

        setToxicologyTests(data.testOrder.map(test => {
            return test.department === "Toxicology" &&
            (
                toxicologyTests !== null ? [...toxicologyTests, test.name] : [test.name]
            )
        }));
    }
    
    const fetchReqData = id => {
        axios
            .get(`${baseUrl}/requisitions/${id}`)
            .then((res) => {
                setReqData(res.data);
                setIsLoading(false);
                setTests(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        isLoading && fetchReqData(id);
        console.log(`Req Data: ${reqData}`);

    });

    console.log(`Tests: ${reqData.testOrder}`);

    return (
        <>
            <div className="d-flex">
                <SideNav />
                <section className="d-flex flex-column" style={{width: "100%"}}>
                    <TopNav />
                    {isLoading ? <p>Loading Req Data. . .</p> : 
                        <Container>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Patient Demographics</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-between py-2 px-5">
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary fw-bold">First Name:</p>
                                                    <p className="text-primary fw-bold">Last Name:</p>
                                                    <p className="text-primary fw-bold">DOB:</p>
                                                    <p className="text-primary fw-bold">Sex:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.patient.firstName}</p>
                                                    <p className="text-primary">{reqData.patient.lastName}</p>
                                                    <p className="text-primary">{reqData.patient.dob.substring(0, 10)}</p>
                                                    <p className="text-primary">{reqData.patient.sex}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary fw-bold">Patient Address:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.address.street}</p> {reqData.address.street2 && <p className="text-primary">{reqData.address.street2}</p>}
                                                    <p className="text-primary">{reqData.address.city}, {reqData.address.state} {reqData.address.zip}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Insurance Details</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-between py-2 px-5">
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary fw-bold">Insurance Name:</p>
                                                    <p className="text-primary fw-bold">Plan ID:</p>
                                                    <p className="text-primary fw-bold">Effective Date:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.insurance.insurer}</p>
                                                    <p className="text-primary">{reqData.insurance.planId}</p>
                                                    <p className="text-primary">{reqData.insurance.effectiveDate.substring(0, 10)}</p>
                                                </div>
                                            </div>
                                            {reqData.insurance.gaurantorRelationship !== "Self" ? 
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary fw-bold">Gaurantor Relationship:</p>
                                                    <p className="text-primary fw-bold">Gaurantor Name:</p>
                                                    <p className="text-primary fw-bold">Gaurantor DOB:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.insurance.gaurantorRelationship}</p>
                                                    <p className="text-primary">{reqData.insurance.gaurantorFirstName} {reqData.insurance.gaurantorLastName}</p>
                                                    <p className="text-primary">{reqData.insurance.gaurantorDob.substring(0, 10)}</p>
                                                </div>
                                            </div>
                                            : <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex">
                                                    <p className="text-primary fw-bold">Gaurantor Relationship:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.insurance.gaurantorRelationship}</p>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Provider Details</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="d-flex justify-content-between py-2 px-5">
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary"><span className="fw-bold">Provider Name:</span></p>
                                                    <p className="text-primary"><span className="fw-bold">Provider NPI:</span></p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.orderingProvider.name}</p>
                                                    <p className="text-primary">{reqData.orderingProvider.npi}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between gap-2">
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary fw-bold">Account Name:</p>
                                                    <p className="text-primary fw-bold">Account Contact:</p>
                                                    <p className="text-primary fw-bold">Phone:</p>
                                                    <p className="text-primary fw-bold">Email:</p>
                                                    <p className="text-primary fw-bold">Address:</p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <p className="text-primary">{reqData.account.name}</p>
                                                    <p className="text-primary">{reqData.account.contactName}</p>
                                                    <p className="text-primary">{reqData.account.contactPhone}</p>
                                                    <p className="text-primary">{reqData.account.contactEmail}</p>
                                                    <p className="text-primary">{reqData.account.address.street} {reqData.account.address.street2 && reqData.account.address.street2}</p>
                                                    <p className="text-primary">{reqData.account.address.city}, {reqData.account.address.state} {reqData.account.address.zip}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Tests Ordered</Accordion.Header>
                                    <Accordion.Body>
                                        {/* using 0 idx because default is null */}
                                        {pathologyTests[0] && (
                                        <div className="d-flex justify-content-start gap-5 py-2 px-5">
                                            <div className="d-flex flex-column">
                                                <p className="text-primary fw-bold"><span className="fw-bold">Pathology:</span></p>
                                                {pathologyTests.map((test, idx) => {
                                                    return (<p id={idx} className="text-primary">{test}</p>)
                                                })}
                                            </div>
                                        </div>
                                        )}
                                        {infectiousDiseaseTests[0] && (
                                        <div className="d-flex justify-content-start gap-5 py-2 px-5">
                                            <div className="d-flex flex-column">
                                                <p className="text-primary fw-bold"><span className="fw-bold">Infectious Disease:</span></p>
                                                {infectiousDiseaseTests.map((test, idx) => {
                                                    return (<p id={idx} className="text-primary">{test}</p>)
                                                })}
                                            </div>
                                        </div>
                                        )}
                                        {toxicologyTests[0] && (
                                        <div className="d-flex justify-content-start gap-5 py-2 px-5">
                                            <div className="d-flex flex-column">
                                                <p className="text-primary fw-bold"><span className="fw-bold">Toxicology:</span></p>
                                                {toxicologyTests.map((test, idx) => {
                                                    return (<p id={idx} className="text-primary">{test}</p>)
                                                })}
                                            </div>
                                        </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                       
                        </Container>}
                </section>
            </div>
        </>
    )
}