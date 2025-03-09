import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import API_URL from '../config/env'; // Import API_URL from env.js

const MessageForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send request to the backend
      const response = await fetch(`${API_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: '+573208181086', message: values.message }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      message.success('Message sent successfully');
    } catch (error) {
      message.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout='inline'>
      {/* Input field for message */}
      <Form.Item
        name='message'
        rules={[{ required: true, message: 'Please enter a message' }]}
      >
        <Input placeholder='Type a message' />
      </Form.Item>
      {/* Submit button */}
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessageForm;
