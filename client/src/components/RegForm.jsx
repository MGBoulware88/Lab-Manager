import React, { useState, useContext } from 'react';
import { Form, Button, Stack, FloatingLabel } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { AuthContext, GlobalContext } from '../GlobalContext';

export default function RegForm() {
    //Uncomment these when server is connected:
        // AuthContext, BASEURL, regErrors

    // const BASEURL = useContext(GlobalContext);
    const {SITENAV} = useContext(GlobalContext);
    // const { authToken, setAuthorizationToken } = useContext(AuthContext);
    // const { loggedUserId, setLoggedUserId } = useContext(AuthContext);
    // const [regErrors, setRegErrors] = useState([]);

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [formConfirmPassword, setFormConfirmPassword] = useState("");
    const navigate = useNavigate();


    //ADD - axios call for reg attempt

    /* 
    *** Placeholders before server connection ***
    */
    const handleRegAttempt = e => {
        e.preventDefault();
        console.log(formEmail, formPassword, formConfirmPassword);
        navigate(`${SITENAV.dashboard}`);
    }

    return (
        <Form onSubmit={handleRegAttempt}>
            {/* <h1>Login</h1> */}
            {/* display any errors in the form */}
            {/* <p style={{ color: 'red' }} >{RegErrors}</p> */}

            <Form.Group controlId="formBasicEmail">
                <FloatingLabel
                    controlId="formBasicEmail"
                    label="Email"
                    className="mb-2"
                >
                    <Form.Control type="email" placeholder="Email" onChange={e => setFormEmail(e.target.value)} />
                </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FloatingLabel
                    controlId="formBasicPassword"
                    label="Password"
                    className="mb-2"
                >
                    <Form.Control type="password" placeholder="Password" onChange={e => setFormPassword(e.target.value)} />
                </FloatingLabel>
            </Form.Group>
            
            <Form.Group controlId="formBasicConfirmPassword">
                <FloatingLabel
                    controlId="formBasicConfirmPassword"
                    label="Confirm Password"
                    className="mb-2"
                >
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setFormConfirmPassword(e.target.value)} />
                </FloatingLabel>

            </Form.Group>
            <Stack gap={3} className="p-2 m-auto">

                <Button variant="login" type="submit" className="me-2 bg-primary text-dark">
                    Create Account
                </Button>
            </Stack>
        </Form>
    );
}