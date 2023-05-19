import React, { useState, useContext } from 'react';
import { Form, Button, Stack, FloatingLabel } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { AuthContext, GlobalContext } from '../GlobalContext';

export default function LoginForm() {
    //Uncomment these when server is connected:
        // AuthContext, loginErrors
    const {SITENAV} = useContext(GlobalContext);
    // const { authToken, setAuthorizationToken } = useContext(AuthContext);
    // const { loggedUserId, setLoggedUserId } = useContext(AuthContext);
    // const [loginErrors, setLoginErrors] = useState([]);

    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const navigate = useNavigate();


    // const handleLoginAttempt = e => {
    //     e.preventDefault();

    //     const loginAttempt = {
    //         email: formEmail,
    //         password: formPassword
    //     };

    //     axios
    //         .post(`${BASEURL}/users/login`, loginAttempt)
    //         .then(res => {
    //             const results = res.data;
    //             const user = results.user;
    //             const newAuthToken = results.token;

    //             user && setLoggedUserId(user.id);
    //             newAuthToken && setAuthorizationToken(newAuthToken);
    //         })
    //         .then(() => {
    //             return navigate(USERDASHBOARD);
    //         })
    //         .catch(err => {
    //             console.log(err.response.data);
    //             setLoginErrors(err.response.data.message);
    //         });
    // };

    /* 
    *** Placeholders before server connection ***
    */
    const handleLoginAttempt = e => {
        e.preventDefault();
        console.log(SITENAV.dashboard);
        return navigate(`${SITENAV.dashboard}`);
    }

    return (
        <Form onSubmit={handleLoginAttempt}>
            {/* <h1>Login</h1> */}
            {/* display any errors in the form */}
            {/* <p style={{ color: 'red' }} >{loginErrors}</p> */}

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
            <Stack gap={3} className="p-2 m-auto">
                <div>
                    Trouble logging in? <Link to={'/password'}>Reset Password</Link>
                </div>

                <Button type="submit" className="me-2 bg-primary text-dark">
                    Login
                </Button>
                {/* This needs to close login modal and open reg modal --else redirect to a new reg page */}
                {/* <div>
                    Don't have an account? <Link to={'/register'}>Sign Up</Link>
                </div> */}
            </Stack>
        </Form>
    );
}