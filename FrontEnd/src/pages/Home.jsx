import React from 'react';
import { Row, Col, notification } from 'antd';
import MessageForm from '../components/MessageForm';
import EnqueueMessages from '../components/EnqueueMessages';


const Home = () => {

  // Define notifications at home to show send messages sucess or error
  const [api, contextHolder] = notification.useNotification();
  // Function to show notification
  const openNotification = (type, message, description=null) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  return (
    <>
      {/* Stablish contextHolder here */}
      { contextHolder }
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} >
          <h2 style={{ textAlign: 'center' }} >Send A Message</h2>
          <MessageForm openNotification={openNotification}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <h2 style={{ textAlign: 'center' }} >Enqueue Mesages</h2>
          <EnqueueMessages />
        </Col>
      </Row>
    </>
  );
};

export default Home;
