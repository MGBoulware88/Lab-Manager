import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import { Container } from "react-bootstrap";

export default function ViewRequisition() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const { id } = useParams();
    const [reqData, setReqData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const fetchReqData = id => {
        axios
            .get(`${baseUrl}/requisitions/${id}`)
            .then((res) => {
                setReqData(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        isLoading && fetchReqData(id);
        console.log(`Req Data: ${reqData}`);

    });
    return (
        <>
            <div className="d-flex">
                <SideNav />
                <section className="d-flex flex-column" style={{width: "100%"}}>
                    <TopNav />
                    {isLoading ? <p>Loading Req Data. . .</p> : <Container>
                        <ul>
                            <li>reqData.patient</li>
                            <li>reqData.account</li>
                            <li>reqData.testOrder</li>
                            <li>reqData.address</li>
                            <li>reqData.insurance</li>
                        </ul>
                        </Container>}
                </section>
            </div>
        </>
    )
}