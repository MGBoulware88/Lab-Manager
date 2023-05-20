import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function RequisitionRedirect() {
    const redirect = useNavigate();
    useEffect(() => {
        console.log("Redirecting!");
        return redirect("/requisitions/new");
    })
}