import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFunName } from '../helpers';

const StorePicker = () => {
	const myInput = useRef(null);

	const navigate = useNavigate();

	const goToStore = (event) => {
		// 1. Stop the form from submitting
		event.preventDefault();
		// 2. get the text from that input
		const storeName = myInput.current.value;
		// 3. Change the page to /store/whatever-they-entered
		navigate(`/store/${storeName}`);
	};
	return (
		<>
			<form className="store-selector" onSubmit={goToStore}>
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					ref={myInput}
					required
					placeholder="Store Name"
					defaultValue={getFunName()}
				/>
				<button type="submit">Visit Store →</button>
			</form>
		</>
	);
};

export default StorePicker;
