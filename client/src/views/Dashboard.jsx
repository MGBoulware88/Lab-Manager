import React, { useState, useContext, useNavigate, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedical, faHospitalUser, faFileInvoiceDollar, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from "../Style.module.css/Dashboard.module.css";

export default function Dashboard() {

    return (
        <>
            <TopNav />
            <div className="d-flex m-auto">
                <SideNav />
                <div>
                    <Container className="d-flex row justify-content-center gap-4 px-3">
                    <h1 className="h2 text-center p-0 m-0">Welcome, username!</h1>
                        <Card className={`col-3 ${styles.newTiles}`}>
                            <FontAwesomeIcon icon={faFileMedical} className={`mx-3 ${styles.darkIcons}`} />
                            <a href="/requisitions" className={`${styles.darkLinks}`}>Jump to Requisitions <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card className={`col-3 ${styles.billingTiles}`}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} className={`mx-3 ${styles.lightIcons}`} />
                            <a href="/billing" className={`${styles.lightLinks}`}>Jump to Billing <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card  className={`col-3 ${styles.adminTiles}`}>
                            <FontAwesomeIcon icon={faHospitalUser} className={`mx-3 ${styles.lightIcons}`} />
                            <a href="/users/manage" className={`${styles.lightLinks}`}>Jump to User Management <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card className={`col-3 ${styles.newTiles}`}>
                            <h3>New Orders - 25</h3>
                            <p>New Lab Orders entered today</p>
                        </Card>
                        <Card className={`col-3 ${styles.billingTiles} `}>
                            <h3>New Payments - 76</h3>
                            <p>Reimbursements received today</p>
                        </Card>
                        <Card  className={`col-3 ${styles.adminTiles} `}>
                            <h3>something admin task</h3>
                            <p>desc about it</p>
                        </Card>
                        <Card className={`col-3 ${styles.newTiles}`}>
                            <h3>New Signups - 2</h3>
                            <p>New Accounts added today</p>
                        </Card>
                        <Card className={`col-3 ${styles.billingTiles}`}>
                            <h3>Orders Billed - 203</h3>
                            <p>Unpaid orders sent to billing</p>
                        </Card>
                        <Card  className={`col-3 ${styles.adminTiles}`}>
                            <h3>Maintainence Items</h3>
                            <p>0 upkeep items requiring attention</p>
                        </Card>
                    </Container>
                </div>
            </div>
        
        </>
    )
}