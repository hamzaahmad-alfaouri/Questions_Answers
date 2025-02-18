import { Container, Col, Row } from 'react-bootstrap';
import FormInput from './components/FormInput';
import QAList from "./components/QAList";
import './index.css';
import { useState } from 'react';
import { questions } from './data';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [data, setData] = useState(questions);

  //to add new item 

  const addItem = () => {
    localStorage.setItem('items', JSON.stringify([...questions]));
    setData([...questions]);
    notify("تم الاضافة بنجاح ", "Success");
  };

  //to delete all data item
  const deleteAllItems = () => {
    localStorage.removeItem('items');
    questions.splice(0, questions.length);
    setData([])
    notify("تم حذف الكل بنجاح ", "Success");

  }
  //to delete one item for array
  const deleteOnItem = (items) => {
    localStorage.setItem('items', JSON.stringify([...items]));
    setData([...items]);
    if (items.length <= 0) {
      deleteAllItems();
      notify("تم حذف السؤال بنجاح", "Success");
    }
  };
  // to push notification
  const notify = (message, type) => {
    if (type === "Error")
      toast.error(message);
    else if (type === "Success")
      toast.success(message)

  }

  return (
    <div className="font text-center color-body">
      <Container className='p-5'></Container>
      <Row className='justify-content-center' >
        <Col sm="4">
          <div className='fs-3 text-center py-2 '>اسئلة واجوبة شائعة</div></Col>
        <Col sm="8" >
          <FormInput onAdd={addItem} notify={notify} />
          <QAList data={data} deleteOnItem={deleteOnItem} />

          {localStorage.getItem("items") != null ? (<button onClick={deleteAllItems} className='btn-color w-100 my-3'>مسح الكل</button>
          ) : null}
        </Col>


      </Row>
      <ToastContainer />

    </div>
  );
}

export default App;
