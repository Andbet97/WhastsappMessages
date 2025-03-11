import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import History from '../pages/History';


const AppRouter = () => {
  return (
    <>
        {/* Use Routes to define path routes on application */}
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
        </Routes>
    </>
  );
};

export default AppRouter;
