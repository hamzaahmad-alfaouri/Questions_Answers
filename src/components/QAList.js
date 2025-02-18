import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { questions } from '../data';

const QAList = ({ data, deleteOnItem }) => {
    const dataLocal = JSON.parse(localStorage.getItem("items"));

    // حذف عنصر
    const onDeleteItem = (ID) => {
        if (localStorage.getItem("items") != null) {
            const index = questions.findIndex((item) => item.id === ID);
            questions.splice(index, 1);
            deleteOnItem(questions);
        }
    };

    // التصويت على عنصر
    const handleVote = (ID, type) => {
        const index = questions.findIndex((item) => item.id === ID);
        if (index !== -1) {  // ✅ تأكدي أن العنصر موجود قبل التعديل
            if (type === "up") {
                questions[index].votes += 1;
            } else if (type === "down") {
                questions[index].votes -= 1;
            }
            deleteOnItem([...questions]); // تحديث القائمة
        } else {
            console.error("العنصر غير موجود!");
        }
    };


    return (
        <Accordion>
            {localStorage.getItem("items") != null ? (
                dataLocal.map((item, index) => {
                    return (
                        <Accordion.Item key={index} eventKey={item.id}>
                            <Accordion.Header>
                                <div className="m-auto">
                                    {item.q} <span className="text-muted">({item.votes} أصوات)</span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="text-end">
                                <div className="px-3 d-inline">{item.a}</div>
                                <div className="mt-3">
                                    <Button
                                        variant="success"
                                        className="me-2"
                                        onClick={() => handleVote(item.id, "up")}
                                    >
                                        👍 تصويت إيجابي
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="me-2"
                                        onClick={() => handleVote(item.id, "down")}
                                    >
                                        👎 تصويت سلبي
                                    </Button>
                                    <Button className='me-2' variant="danger" onClick={() => onDeleteItem(item.id)}>
                                        مسح
                                    </Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })
            ) : (
                <h2 className="text-center p-5 fs-4">لا يوجد أسئلة الآن</h2>
            )}
        </Accordion>
    );
};

export default QAList;