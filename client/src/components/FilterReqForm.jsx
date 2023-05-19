import React, {useState} from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export default function FilterReqForm(props) {
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const reqData = props.reqData;

    const handleFilter = e => {
        e.preventDefault();
        console.log("Filtering. . .");
        //query with filters
        const filteredByDepartment = departmentFilter === "" ? false : departmentFilter;
        const filteredByStatus = statusFilter === "" ? false : statusFilter;
    }

    return (
        <Form onSubmit={handleFilter}>
            <FloatingLabel controlId="formDepartmentFilter" label="Department" className="p-1 mb-2">
                <Form.Select
                    className={`py-1 `}
                    value={departmentFilter}
                    onChange={e => setDepartmentFilter(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="Dependent">Dependent</option>
                    <option value="Parent">Parent</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="formStatusFilter" label="Status" className="p-1 mb-2">
                <Form.Select
                    className={`py-1 `}
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="New Order">New Order</option>
                    <option value="Received">Received</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resulted">Resulted</option>
                    <option value="Billed">Billed</option>
                </Form.Select>
            </FloatingLabel>
            <div className="text-end"><Button type="submit" className="bg-primary text-dark">Filter</Button></div>
        </Form>
    )
}