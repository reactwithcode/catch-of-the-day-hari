import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';

const App = () => {
	const [fishes, setFishes] = useState({});
	const [order, setOrder] = useState(
		JSON.parse(localStorage.getItem(storeId)) || {}
	);

	const { storeId } = useParams();

	useEffect(() => {
		// first reinstate our localstorage
		const localStorageRef = localStorage.getItem(storeId);
		if (localStorageRef) {
			setOrder(JSON.parse(localStorageRef));
		}

		firebase
			.database()
			.ref(`${storeId}/fishes`)
			.on('value', (snapshot) => {
				if (snapshot.val()) setFishes(snapshot.val());
			});
	}, []);

	useEffect(() => {
		const ref = firebase.database().ref(`${storeId}/fishes`).update(fishes);
		return () => {
			// to remove previous data listener
			base.removeBinding(ref);
		};
	}, [fishes]);

	useEffect(() => {
		localStorage.setItem(storeId, JSON.stringify(order));
	}, [order]);

	const addFish = (fish) => {
		// 1. Take a copy of the existing fishes
		const fishes = { ...fishes };
		// 2. Add our new fish to that fishes variable
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state
		setFishes(fishes);
	};

	const updateFish = (key, updatedFish) => {
		// 1. Take a copy of the current state
		const fishes = { ...fishes };
		// 2. Update that state
		fishes[key] = updatedFish;
		// 3. Set that to state
		setFishes(fishes);
	};

	const deleteFish = (key) => {
		// 1. take a copy of state
		const fishesCopy = { ...fishes };
		// 2. update the state
		fishesCopy[key] = {};
		// 3. update state
		setFishes(fishesCopy);
	};

	const loadSampleFishes = () => {
		setFishes(SampleFishes);
	};

	const addToOrder = (key) => {
		// 1. Take a copy of state
		const orderCopy = { ...order };
		// 2. Either add to the order, or update the number in our order
		orderCopy[key] = orderCopy[key] + 1 || 1;
		// 3. Call setState to update our state object
		setOrder(orderCopy);
	};

	const removeFromOrder = (key) => {
		// 1. Take a copy of state
		const orderCopy = { ...order };
		// 2. remove that item from order
		delete orderCopy[key];
		// 3. Call setState to update our state object
		setOrder(orderCopy);
	};

	return (
		<div className="catch-of-the-day">
			<div className="menu">
				<Header tagline="Fresh Seafood Market" />
				<ul className="fishes">
					{Object.keys(fishes).map((key) => (
						<Fish
							key={key}
							index={key}
							details={fishes[key]}
							addToOrder={addToOrder}
						/>
					))}
				</ul>
			</div>
			<Order fishes={fishes} order={order} removeFromOrder={removeFromOrder} />
			<Inventory
				fishes={fishes}
				addFish={addFish}
				updateFish={updateFish}
				deleteFish={deleteFish}
				loadSampleFishes={loadSampleFishes}
				storeId={storeId}
			/>
		</div>
	);
};

export default App;
