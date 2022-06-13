import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({ details, addToOrder, index }) => {
	const { image, name, price, desc, status } = details;
	const isAvailable = status === 'available';

	const handleClick = () => {
		addToOrder(index);
	};

	return (
		<li className="menu-fish">
			<img src={image} alt={name} />
			<h3 className="fish-name">
				{name}
				<span className="price">{formatPrice(price)}</span>
			</h3>
			<p>{desc}</p>
			<button disabled={!isAvailable} onClick={handleClick}>
				{isAvailable ? 'Add to Cart' : 'Sold Out!'}
			</button>
		</li>
	);
};

Fish.propTypes = {
	details: PropTypes.shape({
		image: PropTypes.string,
		name: PropTypes.string,
		desc: PropTypes.string,
		status: PropTypes.string,
		price: PropTypes.number,
	}),
	index: PropTypes.string,
	addToOrder: PropTypes.func,
};

export default Fish;
