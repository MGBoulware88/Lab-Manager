import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Form, Button, Tabs, Tab, Card, Container } from "react-bootstrap";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default function RequisitionForm() {

    const navigate = useNavigate();
    
    //add all tab fields to state

    const handleReqFormSubmit = () => {
        //grab all the form data from state
        return navigate("/requisitions/new");
    }
    return (
        <>
            <TopNav/>
                <div className="d-flex">
                    <SideNav/>
                    <Container className="d-flex flex-column align-items-start justify-content-start">
                    <div>
                        <Tabs
                            defaultActiveKey={"patientInfo"}
                            id="uncontrolled-req-tab"
                        >
                            <Tab eventKey="patientInfo" title="Patient Info" className="m-auto">
                                <Card>
                                    patientinfo
                                    {/* save all to state onChange */}
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                    <input type="text" />
                                </Card>
                            </Tab>
                            <Tab eventKey="providerInfo" title="Provider Info">
                                <Card>
                                    <input type="text" />
                                    providerInfo
                                </Card>
                            </Tab>
                            <Tab eventKey="testingInfo"  title="Test Selection">
                                <Card>
                                    <input type="text" />
                                    testingInfo
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                    <Form action="/requisitions/submit" method="POST" className="mt-5">
                        <Button style={{}}>
                            Submit
                        </Button>
                    </Form>
                                </Container>
                </div>
        </>
    )
}