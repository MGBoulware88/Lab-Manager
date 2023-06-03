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

    const fetchReqData = id => {
        axios
            .get(`${baseUrl}/requisitions/${id}`)
            .then((res) => {
                setReqData(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        isLoading && fetchReqData(id);
        console.log(`Req Data: ${reqData}`);

    }, [])

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