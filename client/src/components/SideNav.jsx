import React, { useState } from "react";
import { Navbar, Nav, Button, Image, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserGear, faChartLine, faRightFromBracket, faHospitalUser, faBedPulse } from '@fortawesome/free-solid-svg-icons'
import styles from "../Style.module.css/SideNav.module.css";

export default function SideNav() {
    const [openManageLabs, setOpenManageLabs] = useState(false);
    const [openManageUsers, setOpenManageUsers] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);


    return (
        <div className={`btn-group-vertical justify-content-start align-items-center ${styles.sideBar}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <FontAwesomeIcon icon={faBedPulse} className={`mx-3 ${styles.brandLogo}`} />
            </div>

            <ul className={`${styles.navList}`}>
                <li>
                    <Nav.Link href="/leads" className={`accordion ${styles.marginY}`}>
                        <Button
                            type="button"
                            className={`btn btn-primary accordion-content ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                        >
                            <FontAwesomeIcon icon={faChartLine} className="mx-3" />
                            Dashboard
                        </Button>
                    </Nav.Link>
                </li>
                <li>
                    <Navbar.Toggle className={`${styles.marginY}`}>
                        <Button
                            type="button"
                            className={`btn btn-primary ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                            onClick={() => setOpenManageLabs(!openManageLabs)}
                            aria-controls="manage-lab-menu-items"
                            aria-expanded={openManageLabs}
                        >
                            <FontAwesomeIcon icon={faHospitalUser} className="mx-3" />
                            Manage Labs
                        </Button>
                    </Navbar.Toggle>
                    <Collapse in={openManageLabs}>
                        <ul className={`ms-4 ${styles.navList}`}>
                            <li><Nav.Link href="/requisitions">Requisitions</Nav.Link></li>
                            <li><Nav.Link href="/tests">Test Configuration</Nav.Link></li>
                            <li><Nav.Link href="/instruments">Instruments</Nav.Link></li>
                            <li><Nav.Link href="/inventory">Inventory</Nav.Link></li>
                        </ul>
                    </Collapse>
                </li>
                <li>
                    <Nav.Link href="/user_profile" className={`${styles.marginY}`}>
                        <Button
                            type="button"
                            className={`btn btn-primary ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mx-3" />
                            Manage Users
                        </Button>
                    </Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/" className={`${styles.marginY}`}>
                        <Button
                            type="button"
                            className={`btn btn-primary ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
                            Admin
                        </Button>
                    </Nav.Link>
                </li>
                <li>
                    <Nav.Link href="/" className={`${styles.marginY}`}>
                        <Button
                            type="button"
                            className={`btn btn-primary ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
                            Logout
                        </Button>
                    </Nav.Link>
                </li>
            </ul>


        </div>
    );
};
