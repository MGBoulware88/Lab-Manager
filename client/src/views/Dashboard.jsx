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
            <div className="d-flex m-auto">
                <SideNav />
                <div>
                    <TopNav />
                    <Container className="d-flex row gap-2">
                        <Card className={`col-3 ${styles.tiles}`}>
                            <FontAwesomeIcon icon={faFileMedical} className={`mx-3 ${styles.tileIcons}`} />
                            <a href="/requisitions" className={`${styles.tileLinks}`}>Jump to Requisitions <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card className={`col-3 ${styles.tiles}`}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} className={`mx-3 ${styles.tileIcons}`} />
                            <a href="/accounts/add" className={`${styles.tileLinks}`}>Add Account <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card  className={`col-3 ${styles.tiles}`}>
                            <FontAwesomeIcon icon={faHospitalUser} className={`mx-3 ${styles.tileIcons}`} />
                            <a href="/accounts/providers/add" className={`${styles.tileLinks}`}>Add Provider <FontAwesomeIcon icon={faShareFromSquare}/></a>
                        </Card>
                        <Card className={`col-3 ${styles.tiles}`}>
                            <h3>New Orders - 25</h3>
                            <p>New Lab Orders entered today</p>
                        </Card>
                        <Card  className={`col-3 ${styles.tiles}`}>
                            <h3>something admin task</h3>
                            <p>desc about it</p>
                        </Card>
                        <Card className={`col-3 ${styles.tiles}`}>
                            <h3>New Payments - 76</h3>
                            <p>Reimbursements received today</p>
                        </Card>
                        <Card className={`col-3 ${styles.tiles}`}>
                            <h3>New Signups - 2</h3>
                            <p>New Accounts added today</p>
                        </Card>
                        <Card  className={`col-3 ${styles.tiles}`}>
                            <h3>Maintainence Items</h3>
                            <p>0 upkeep items requiring attention</p>
                        </Card>
                        <Card className={`col-3 ${styles.tiles}`}>
                            <h3>Orders Billed - 203</h3>
                            <p>Unpaid orders sent to billing</p>
                        </Card>
                    </Container>
                </div>
            </div>
        
        </>
    )
}