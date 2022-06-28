import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Header';

import './style.css';

const ModalWindow = (props) => (
	<div className="modal__window">
		<Header />
		<div className="modal__container">
			<p className="modal__title">Выйти из системы?</p>
			<div className="modal__wrapper">
				<Link
					to={`/singin`}
					className="header__link"
					onClick={async () => {
						const res = await axios.post(`${API_URL}/logout`, { withCredentials: true });
						if (res.status === 200) {
							location.reload();
						}
					}}
				>
					<button>да</button>
				</Link>
				<Link to={`/editor`} className="header__link">
					<button>нет</button>
				</Link>
			</div>
		</div>
	</div>
);

ModalWindow.propTypes = {};

ModalWindow.defaultProps = {};

export default ModalWindow;
