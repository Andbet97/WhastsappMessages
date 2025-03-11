import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import API_URL from '../config/env'; // Import API_URL from env.js


const MessageForm = ({ openNotification }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Hook para manejar el formulario

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send request to the backend
      const response = await fetch(`${API_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: values.number, message: values.message }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      // show notification success
      openNotification('success', 'Success', 'Message sent successfuly')

      // cler message value if success only
      form.setFieldsValue({ message: '' });

    } catch (error) {
      // show notification error
      openNotification('error', 'Error', error.message || 'An error occurred')
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      {/* Input field for number */}
      <Form.Item
        name='number'
        label='Phone number'
        rules={[
          { required: true, message: 'Please enter a phone number' },
          { pattern: /^\+\d{10,15}$/, message: 'Phone number invalid' },
        ]}
      >
        <Input placeholder='Type a phone number' />
      </Form.Item>
      {/* Input field for message */}
      <Form.Item
        name='message'
        label='Message'
        rules={[{ required: true, message: 'Please enter a message' }]}
      >
        <Input placeholder='Type a message' />
      </Form.Item>
      {/* Submit button (Center) */}
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessageForm;
