import {useState, useEffect} from 'react';
import {db} from './data/db';
import Guitar from './components/Guitar';
import Header from './components/Header';

function App() {
	const [data, setData] = useState(db);
	const [cart, setCart] = useState([]);

	const MAX_QUANTITY = 5;
	const MIN_QUANTITY = 1;
	console.log(MIN_QUANTITY);
	function addToCart(item) {
		const itemInCart = cart.findIndex((product) => product.id === item.id);
		if (itemInCart >= 0) {
			const updateCart = [...cart];
			updateCart[itemInCart].quantity++;
			setCart(updateCart);
		} else {
			item.quantity = 1;
			setCart([...cart, item]);
		}
	}

	function removeToCart(id) {
		const removeItem = cart.filter((product) => product.id !== id);
		setCart(removeItem);
	}

	function increaseQuantity(id) {
		const updateCart = cart.map((product) => {
			if (product.id === id && product.quantity < MAX_QUANTITY) {
				return {
					...product,
					quantity: product.quantity + 1,
				};
			}
			return product;
		});
		setCart(updateCart);
	}

	function decreaseQuantity(id) {
		const updateCart = cart.map((product) => {
			if (product.id === id && product.quantity > MIN_QUANTITY) {
				return {
					...product,
					quantity: product.quantity - 1,
				};
			}
			return product;
		});
		setCart(updateCart);
	}
	return (
		<>
			<Header
				cart={cart}
				removeToCart={removeToCart}
				increaseQuantity={increaseQuantity}
				decreaseQuantity={decreaseQuantity}
			/>
			<main className='container-xl mt-5'>
				<h2 className='text-center'>Nuestra Colección</h2>

				<div className='row mt-5'>
					{data.map((guitar) => (
						<Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
					))}
				</div>
			</main>

			<footer className='bg-dark mt-5 py-5'>
				<div className='container-xl'>
					<p className='text-white text-center fs-4 mt-4 m-md-0'>
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
