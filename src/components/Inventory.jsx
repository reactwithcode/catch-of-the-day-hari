import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

const Inventory = ({
	addFish,
	loadSampleFishes,
	fishes,
	updateFish,
	deleteFish,
	storeId,
}) => {
	const [uid, setUid] = useState(null);
	const [owner, setOwner] = useState(null);

	const authHandler = async (authData) => {
		// handle user information / authData
		// 1. Look up the current store in the Firebase database.
		const store = await base.fetch(storeId, {});
		console.log(store);
		// 2. Claim it if there is no user
		if (!store.owner) {
			// save it as our own
			await base.post(`${storeId}/owner`, {
				data: authData.user.uid,
			});
		}

		// 3. Set the store of the inventory component to reflect the current user
		setUid(authData.user.uid);
		setOwner(store.owner || authData.user.uid);

		console.log(authData);
	};
	const authenticate = (provider) => {
		// 1. Get auth provider
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		// 2. Sign in with auth provider
		firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
	};

	const handleLogout = async () => {
		console.log('Logging out!');
		await firebase.auth().signOut();
		setUid(null);
	};

	const logout = <button onClick={handleLogout}>Log Out</button>;

	// Check if user is logged in when reloading the page
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				authHandler({ user }, storeId);
			}
		});
	}, []);

	// 1. Check if they are logged in
	if (!uid) {
		return <Login authenticate={authenticate} />;
	}

	// 2. Check if they are not the owner of the store
	if (uid !== owner) {
		return (
			<div>
				<p>Sorry you are not the owner!</p>
				{logout}
			</div>
		);
	}

	// 3. They must the owner, just render the inventory
	return (
		<div className="inventory">
			<h2>Inventory</h2>
			{logout}
			{Object.keys(fishes).map((key) => (
				<EditFishForm
					key={key}
					fish={fishes[key]}
					index={key}
					updateFish={updateFish}
					deleteFish={deleteFish}
				/>
			))}
			<AddFishForm addFish={addFish} />
			<button onClick={loadSampleFishes}>Load Sample Fishes</button>
		</div>
	);
};

Inventory.propTypes = {
	addFish: PropTypes.func,
	loadSampleFishes: PropTypes.func,
	fishes: PropTypes.object,
	updateFish: PropTypes.func,
	deleteFish: PropTypes.func,
};

export default Inventory;
