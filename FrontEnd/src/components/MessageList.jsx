import React from 'react';
import { List } from 'antd';


const MessageList = ({ messages }) => {
  // Component List to antd, render list item from server data
  return (
    <List
      bordered
      dataSource={messages}
      renderItem={(msg) => (
        <List.Item>
          <div>
            <strong>{msg.from}:</strong> {msg.body} <br />
            <small>{new Date(msg.timestamp * 1000).toLocaleString()}</small>
          </div>
        </List.Item>
      )}
    />
  );
}

export default MessageList;
