import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { questions } from '../data';
const FormInput = ({ onAdd, notify }) => {
    const [qu, setQu] = useState("")
    const [an, setAn] = useState("")

    const addNewItem = () => {
        if (qu === "" || an === "") {
            notify("من فضلك اكمل البيانات", "Error");
            return;
        }
        // إضافة تصويت افتراضي (0) عند إنشاء سؤال جديد
        questions.push({ id: Math.random(), q: qu, a: an, votes: 0 });
        setQu("");
        setAn("");
        onAdd();
    };
    return (
        <Row className='my-3' >
            <Col sm="5">
                <Form.Control value={qu} onChange={(e) => setQu(e.target.value)} type="text" placeholder="ادخل السؤال" />
            </Col>
            <Col sm="5">
                <Form.Control value={an} onChange={(e) => setAn(e.target.value)} type="text" placeholder="ادخل الاجابة" />
            </Col>
            <Col sm="2">
                <button onClick={addNewItem} className="btn-color w-100" type="submit">
                    اضافة
                </button>
            </Col>

        </Row>
    )
}

export default FormInput
