import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, Layout, theme as antdTheme } from 'antd';
import CustomHeader from './components/Header';
import AppRouter from './routes/AppRoutes';


const { Content } = Layout;

const App = () => {

  // Recover theme from localstorage or set 'dark' default
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Like componentdidmount, set theme with the same value or create with dark as default
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to change theme and save on state theme
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      {/* Router is used to manage the two routes that exist */}
      <Router>
        {/* Antd provide a config provider to change global theme, configuration taken from the documentation */}
        <ConfigProvider
          theme={{
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          }}
        >
          {/* Layout to all content, head and content */}
          <Layout style={{ minHeight: '100vh' }}>
            <CustomHeader theme={theme} setTheme={changeTheme} />
            <Content style={{ padding: '20px', flex: 1 }}>
              <AppRouter />
            </Content>
          </Layout>
        </ConfigProvider>
      </Router>
    </>
  );
};

export default App;
