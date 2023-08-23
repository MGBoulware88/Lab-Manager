import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';
import RequisitionForm from '../components/RequisitionForm';

export default function EditRequisition() {
    const baseUrl = useContext(GlobalContext).SITENAV.baseurl;
    const { id } = useParams();
    const [reqData, setReqData] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const formatDates = reqData => {
        //update effective date, patientDob, gaurantorDob
        const insuranceEffectiveDate = reqData.insurance.effectiveDate.substring(0, 10);
        reqData.insurance.effectiveDate = insuranceEffectiveDate;
        
        const patientDob = reqData.patient.dob.substring(0, 10);
        reqData.patient.dob = patientDob;

        const gaurantorDob = reqData.insurance?.gaurantorDob.substring(0, 10);
        reqData.insurance.gaurantorDob = gaurantorDob;

    }

    const fetchReqData = id => {
        axios
            .get(`${baseUrl}/requisitions/${id}`)
            .then((res) => {
                setReqData(res.data);
                setIsLoading(false);
                formatDates(res.data);
                console.log("res.data: ");
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
            {isLoading ? (
                <div>Loading. . .</div>
                ) : (
                    <RequisitionForm
                        method="put"
                        reqData={reqData}
                    />
            )}
        </>
    )
}