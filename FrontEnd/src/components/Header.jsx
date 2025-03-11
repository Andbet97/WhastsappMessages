import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Switch } from 'antd';


const { Header } = Layout;

const CustomHeader = ({ theme, setTheme }) => {

  return (
    <Header
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {/* Logo of project, set color because are link */}
      <Link to='/'>
        <div style={{ color: theme === 'dark' ? 'white': 'black', fontSize: '20px', fontWeight: 'bold', marginRight: 'auto' }}>
          WWeb.js Basic Integration
        </div>
      </Link>
      <Menu
        theme={theme}
        mode='horizontal'
        defaultSelectedKeys={['home']}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        {/* Switch to change theme */}
        <div style={{ paddingRight: '10px' }}>
          <Switch
            checked={theme === 'dark'}
            onChange={setTheme}
            checkedChildren='Dark'
            unCheckedChildren='Light'
          />
        </div>
        <Menu.Item key='home'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='history'>
          <Link to='/history'>History</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default CustomHeader;
