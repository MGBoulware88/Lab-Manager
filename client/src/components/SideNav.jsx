import React, { useState } from "react";
import { Nav, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faHospitalUser, faScrewdriverWrench, faStarOfLife, faHouse, faBars, faArrowAltCircleRight, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import styles from "../Style.module.css/SideNav.module.css";

export default function SideNav() {
    const [openManageLabs, setOpenManageLabs] = useState(false);
    // const [openManageUsers, setOpenManageUsers] = useState(false);
    const [openManageAccounts, setOpenManageAccounts] = useState(false);
    const [openAdmin, setOpenAdmin] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);
    const [isSideNavForceOpen, setIsSideNavForceOpen] = useState(true);

    const handleSideNavHover = e => {
        if (!isSideNavOpen) {
            setIsSideNavOpen(true);
            e.target.className = `btn-group-vertical justify-content-start align-items-center py-2 ${styles.sideNavOpen}`;
        }

    };

    const handleSideNavLeave = e => {
        if (!isSideNavForceOpen) {
            if (isSideNavOpen) {
                setIsSideNavOpen(false);
            }
            e.target.className = `btn-group-vertical justify-content-start align-items-center py-2 ${styles.sideNavClosed}`;
        }
    };

    const handleCollapse = () => {
        setIsSideNavForceOpen(false);
    }

    return (
        <>
            <nav className={`btn-group-vertical justify-content-start align-items-center py-2 ${styles.sideNavOpen}`}
                onMouseEnter={e => handleSideNavHover(e)}
                onMouseLeave={e => handleSideNavLeave(e)}
            >
                {isSideNavOpen ? (
                    <>
                        {/* Replace with MUI Drawer later */}
                        {isSideNavForceOpen ? (
                        <FontAwesomeIcon icon={faArrowCircleLeft} className={`mx-3 text-light fs-4 align-self-end ${styles.collapseIcon}`}
                            onClick={handleCollapse}
                        />) : (
                            <FontAwesomeIcon icon={faArrowCircleRight} className={`mx-3 text-light fs-4 align-self-start ${styles.collapseIcon}`}
                                onClick={() => setIsSideNavForceOpen(true)}
                            />
                        )}
                        <ul className={`${styles.navList} ${styles.stickyTop}`}>
                            <li>
                                <Nav.Link href="/dashboard" className={`${styles.navLink}`}>
                                    <Button
                                        type="button"
                                        className={`btn ${styles.sideNavBtn} `}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f0f5fa";
                                            e.target.style.color = "#0b2447";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#576cbc";
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
                                        className={`${styles.sideNavBtn} `}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f0f5fa";
                                            e.target.style.color = "#0b2447";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#576cbc";
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
                                </ul>
                            </Collapse>
                            <li>
                                <Nav className={`${styles.navLink}`}>
                                    <Button
                                        type="button"
                                        className={`btn ${styles.sideNavBtn} `}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f0f5fa";
                                            e.target.style.color = "#0b2447";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#576cbc";
                                            e.target.style.color = "#00031C";
                                        }}
                                        onClick={() => setOpenManageAccounts(!openManageAccounts)}
                                        aria-controls="manage-lab-menu-items"
                                        aria-expanded={openManageAccounts}
                                    >
                                        <FontAwesomeIcon icon={faHospitalUser} className="mx-3" />
                                        Accounts
                                    </Button>
                                </Nav>
                            </li>
                            <Collapse in={openManageAccounts}>
                                <ul className={`ms-4 text-light ${styles.navList}`}>
                                    <li className={`${styles.subLink}`}><Nav.Link href="/accounts">Manage Accounts</Nav.Link></li>
                                    <li className={`${styles.subLink}`}><Nav.Link href="/accounts/new">Add Account</Nav.Link></li>
                                    <li className={`${styles.subLink}`}><Nav.Link href="/accounts/providers/new">Add Provider</Nav.Link></li>
                                </ul>
                            </Collapse>
                            <li>
                                <Nav className={`${styles.navLink}`}>
                                    <Button
                                        type="button"
                                        className={`btn ${styles.sideNavBtn} `}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f0f5fa";
                                            e.target.style.color = "#0b2447";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#576cbc";
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
                                    <li className={`${styles.subLink}`}><Nav.Link href="/coming_soon">Coming Soon!</Nav.Link></li>
                                </ul>
                            </Collapse>
                            <li>
                                <Nav.Link href="/" className={`mb-3 ${styles.navLink}`}>
                                    <Button
                                        type="button"
                                        className={`btn ${styles.sideNavBtn} `}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = "#f0f5fa";
                                            e.target.style.color = "#0b2447";
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = "#576cbc";
                                            e.target.style.color = "#00031C";
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
                                        Logout
                                    </Button>
                                </Nav.Link>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faBars} className={`mx-3 text-light fs-4 align-self-center ${styles.expandIcon}`}
                            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                        />
                        <ul className={`${styles.navList} ${styles.stickyTop}`}>
                            <li>
                                <Nav.Link href="/dashboard" className={`${styles.navLinkClosed}`}>
                                    <FontAwesomeIcon icon={faHouse} className="mx-3" />
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav className={`${styles.navLinkClosed}`}>
                                    <FontAwesomeIcon icon={faStarOfLife} className="mx-3" />
                                </Nav>
                            </li>
                            <li>
                                <Nav className={`${styles.navLinkClosed}`}>
                                    <FontAwesomeIcon icon={faHospitalUser} className="mx-3" />
                                </Nav>
                            </li>
                            <li>
                                <Nav className={`${styles.navLinkClosed}`}>
                                    <FontAwesomeIcon icon={faScrewdriverWrench} className="mx-3" />
                                </Nav>
                            </li>
                            <li>
                                <Nav.Link href="/" className={`mb-3 ${styles.navLinkClosed}`}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="mx-3" />
                                </Nav.Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav >

        </>
    );
};
