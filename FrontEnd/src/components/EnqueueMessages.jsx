import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import API_URL from '../config/env'; // Import API_URL from env.js
import MessageList from './MessageList';


const EnqueueMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    // get messages from server and set on state messages
    try {
      const response = await fetch(`${API_URL}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();

      setMessages(data.messages); // Update the list with new messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <>
      <MessageList messages={messages} />
      {/* Container to center button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button type='primary' onClick={fetchMessages}>
          Load Messages
        </Button>
      </div>
    </>
  );
}

export default EnqueueMessages;
