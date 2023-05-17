import React, { useState } from "react";
import { Nav, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faRightFromBracket, faHospitalUser, faBedPulse, faScrewdriverWrench, faStarOfLife, faClipboard, faHouse } from '@fortawesome/free-solid-svg-icons'
import styles from "../Style.module.css/SideNav.module.css";

export default function SideNav() {
    const [openManageLabs, setOpenManageLabs] = useState(false);
    const [openManageUsers, setOpenManageUsers] = useState(false);
    const [openManageAccounts, setOpenManageAccounts] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);


    return (
        <div className={`btn-group-vertical justify-content-start align-items-center margin-auto ${styles.sideBar}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FontAwesomeIcon icon={faBedPulse} className={`mx-3 mb-2 ${styles.brandLogo}`} />
            </div>

            <ul className={`${styles.navList}`}>
                <li>
                    <Nav.Link href="/dashboard" className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                        >
                            <FontAwesomeIcon icon={faHouse} className="mx-3" />
                            Dashboard
                        </Button>
                    </Nav.Link>
                </li>
                <li>
                    <Nav className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
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
                            <FontAwesomeIcon icon={faStarOfLife} className="mx-3" />
                            Manage Labs
                        </Button>
                    </Nav>
                </li>
                <Collapse in={openManageLabs}>
                    <ul className={`ms-4 text-light ${styles.navList}`}>
                        <li className={`${styles.subLink}`}><Nav.Link href="/requisitions">View Requisitions</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/requisitions/new">New Requisition</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/instruments">Manage Instruments</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/inventory">Manage Inventory</Nav.Link></li>
                    </ul>
                </Collapse>
                <li>
                    <Nav className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                            onClick={() => setOpenManageUsers(!openManageUsers)}
                            aria-controls="manage-lab-menu-items"
                            aria-expanded={openManageUsers}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mx-3" />
                            User Management
                        </Button>
                    </Nav>
                </li>
                <Collapse in={openManageUsers}>
                    <ul className={`ms-4 text-light ${styles.navList}`}>
                        <li className={`${styles.subLink}`}><Nav.Link href="/users">Manage Users</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/users/history">User Access History</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/users/logs">User Logs</Nav.Link></li>
                    </ul>
                </Collapse>
                <li>
                    <Nav className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                            onClick={() => setOpenManageAccounts(!openManageAccounts)}
                            aria-controls="manage-lab-menu-items"
                            aria-expanded={openManageAccounts}
                        >
                            <FontAwesomeIcon icon={faHospitalUser} className="mx-3" />
                            Account Management
                        </Button>
                    </Nav>
                </li>
                <Collapse in={openManageAccounts}>
                    <ul className={`ms-4 text-light ${styles.navList}`}>
                        <li className={`${styles.subLink}`}><Nav.Link href="/accounts">Manage Accounts</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/accounts/settings">Account Settings</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/accounts/history">Account Access History</Nav.Link></li>
                    </ul>
                </Collapse>
                <li>
                    <Nav className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#f0f5fa";
                                e.target.style.color = "#0b3818";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#50AB42";
                                e.target.style.color = "#00031C";
                            }}
                            onClick={() => setOpenAdmin(!openAdmin)}
                            aria-controls="manage-lab-menu-items"
                            aria-expanded={openAdmin}
                        >
                            <FontAwesomeIcon icon={faScrewdriverWrench} className="mx-3" />
                            Admin
                        </Button>
                    </Nav>
                </li>
                <Collapse in={openAdmin}>
                    <ul className={`ms-4 text-light ${styles.navList}`}>
                        <li className={`${styles.subLink}`}><Nav.Link href="/billing">Billing</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/settings">Site Settings</Nav.Link></li>
                        <li className={`${styles.subLink}`}><Nav.Link href="/coming_soon">Coming Soon!</Nav.Link></li>
                    </ul>
                </Collapse>
                <li>
                    <Nav.Link href="/" className={`${styles.navLink}`}>
                        <Button
                            type="button"
                            className={`btn ${styles.sideNavBtn} `}
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
