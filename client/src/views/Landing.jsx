import React from "react";
import { Container } from "react-bootstrap";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faClipboard } from '@fortawesome/free-solid-svg-icons';

export default function Landing() {
    return (
        <>
            <TopNav />
            <Container className="container d-flex flex-column align-content-center gap-2" style={{height: "77vh"}}>
                <div className="d-flex align-items-center gap-1">
                    <div className="col-1 d-flex flex-column align-items-center justify-content-center gap-1">
                        <FontAwesomeIcon icon={faClipboard} style={{color: "#0b2447", marginTop: "0.1rem", height: "80px"}} />
                        <p style={{fontSize: ".75rem", color: "#00031C"}}>Never miss a test</p>
                    </div>
                    <p className="col-11 p-1" style={{fontSize: "26px", color: "#00031C"}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore quos sunt, aliquid quidem suscipit numquam saepe officiis, doloribus eius accusamus labore mollitia consequatur, tempore consectetur libero illo reiciendis quo natus.
                    </p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <p className="col-11 p-1" style={{fontSize: "26px", color: "#00031C"}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore quos sunt, aliquid quidem suscipit numquam saepe officiis, doloribus eius accusamus labore mollitia consequatur, tempore consectetur libero illo reiciendis quo natus.</p>   
                    <div className="col-1 d-flex flex-column align-items-center justify-content-center gap-1">
                        <FontAwesomeIcon icon={faHospital} style={{color: "#0b2447", marginTop: "0.1rem", height: "80px"}} />
                        <p style={{fontSize: ".75rem", color: "#00031C" }}>Automation</p>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <div className="col-1 d-flex flex-column align-items-center justify-content-center gap-1">
                        <FontAwesomeIcon icon={faClipboard} style={{color: "#0b2447", marginTop: "0.1rem", height: "80px"}} />
                        <p style={{fontSize: ".75rem", color: "#00031C"}}>LTC Management</p>
                    </div>
                    <p className="col-11 p-1" style={{fontSize: "26px", color: "#00031C"}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore quos sunt, aliquid quidem suscipit numquam saepe officiis, doloribus eius accusamus labore mollitia consequatur, tempore consectetur libero illo reiciendis quo natus.
                    </p>
                </div>
                <div className="d-flex align-items-center gap-1">
                    <p className="col-11 p-1" style={{fontSize: "26px", color: "#00031C"}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore quos sunt, aliquid quidem suscipit numquam saepe officiis, doloribus eius accusamus labore mollitia consequatur, tempore consectetur libero illo reiciendis quo natus.</p>   
                    <div className="col-1 d-flex flex-column align-items-center justify-content-center gap-1">
                        <FontAwesomeIcon icon={faHospital} style={{color: "#0b2447", marginTop: "0.1rem", height: "80px"}} />
                        <p style={{fontSize: ".75rem", color: "#00031C" }}>Automation</p>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-1">
                    <p>***this is where images of the app will go***</p>
                </div>
            </Container>
            <Footer />
        </>

    );
}