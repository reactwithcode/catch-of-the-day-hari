import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StorePicker from './StorePicker';
import NotFound from './NotFound';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<StorePicker />} />
				<Route exact path="/store/:storeId" element={<App />} />
				<Route element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
