import React from 'react';
import {Form, FloatingLabel} from 'react-bootstrap';
import styles from '../Style.module.css/AccountForm.module.css';

export default function ProviderFields({ val1, val2, onChange1, onChange2 }) {
    return (
        <>
            <Form.Group controlId='formAccountProviderName'>
                <FloatingLabel controlId="formAccountProviderName" label="Provider Name" className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Provider Name"
                        value={val1}
                        onChange={onChange1}
                        className={`${styles.formField}`}
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group controlId='formAccountProviderNPI'>
                <FloatingLabel controlId="formAccountProviderNPI" label="Provider NPI" className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Provider NPI"
                        value={val2}
                        onChange={onChange2}
                        className={`${styles.formField}`}
                    />
                </FloatingLabel>
            </Form.Group>
        </>
    );
}