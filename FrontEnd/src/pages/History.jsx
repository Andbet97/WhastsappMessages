import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, message } from 'antd';
import API_URL from '../config/env';
import MessageList from '../components/MessageList';


const History = () => {
  // use states to store messages and set loading status
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // componentdidmount which brings the message history information
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/history`, { method: 'GET' });
        if (!response.ok) throw new Error('Failed to fetch history');

        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        message.error(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <h2 style={{ textAlign: 'center' }} >Message History</h2>
        {loading ? <Spin size='large' style={{ display: 'block', textAlign: 'center' }} /> : <MessageList messages={messages} />}
      </Col>
    </Row>
  );
};

export default History;
