import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faClipboard } from '@fortawesome/free-solid-svg-icons';

export default function TopNav() {
    //which data needs to come in?
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const showLoginModal = () => {
        setIsLoginModalOpen(true);
    }
    const hideLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    const [isRegModalOpen, setIsRegModalOpen] = useState(false);
    const showRegModal = () => {
        setIsRegModalOpen(true);
    }
    const hideRegModal = () => {
        setIsRegModalOpen(false);
    }

    return (
        // update to Navbar/Nav tags
        <>
            {/* if user logged in show the my acct link instead of login/reg
            <Nav.Link href="/my_account" className={`${styles.marginY}`}>
                <Button
                    type="button"
                    className={`btn btn-primary ${styles.widthBtn} `}
                    style={{
                        backgroundColor: "#6b3fa0",
                        color: "#fae206",
                        borderColor: "#000000",
                        transition: "background-color 0.2s, color 0.2s",
                        textAlign: "left"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#f0f5fa";
                        e.target.style.color = "#6b3fa0";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#6b3fa0";
                        e.target.style.color = "#fae206";
                    }}
                >
                    <FontAwesomeIcon icon={faUserGear} className="mx-3" />
                    My Account
                </Button>
            </Nav.Link>
            
            else: */}
            <div className="d-flex px-2" style={{height: "8vh"}}>
                <div className="col-3 d-flex gap-1" style={{height: "2rem"}}>
                    {/* icon + login link */}
                    
                    <FontAwesomeIcon icon={faHospital} style={{color: "#0b3818", marginTop: "0.1rem"}}/>
                    <p onClick={showLoginModal} style={{color: "green", fontWeight: "bold"}} className="modalToggle">
                        Login
                    </p>

                </div>
                <div className="col-6 d-flex justify-content-center">
                    {/* centered page title*/}
                    <h1>Lab Manager</h1>
                </div>
                <div className="col-3 d-flex align-content-center justify-content-end gap-1" style={{height: "2rem"}}>
                    {/* reg/learn more/site nav links*/}
                    <ul className="topNavLinks">
                        <li onClick={showRegModal} style={{color: "green", fontWeight: "bold"}} className="modalToggle">
                            <FontAwesomeIcon icon={faClipboard} style={{color: "#0b3818", marginTop: "0.1rem"}} />
                            Register
                        </li>
                    </ul>
                </div>

            </div>
            <hr />
            {isLoginModalOpen &&
                <Modal show={isLoginModalOpen} onHide={hideLoginModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login to access your dashboard</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                </Modal>
            }
            {isRegModalOpen &&
                <Modal show={isRegModalOpen} onHide={hideRegModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign up to access your account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegForm />
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}