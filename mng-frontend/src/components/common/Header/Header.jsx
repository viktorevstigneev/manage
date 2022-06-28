import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './style.css';
import { API_URL } from '../../../store/constants';

const Header = ({ loadProfileData, profile }) => {
	const currentLink = window.location.href.split('/')[window.location.href.split('/').length - 1];

	const [user, setUser] = useState();
	console.log('user: ', user);

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	const adminRoute = () => (
		<>
			<button className="header__item" style={currentLink === 'adminer' ? { background: 'rgb(179, 178, 176)' } : {}}>
				<Link to={`/adminer`} className="header__link">
					Администрирование
				</Link>
			</button>
			<button className="header__item" style={currentLink === 'editor' ? { background: 'rgb(179, 178, 176)' } : {}}>
				<Link to={`/profile/${user?._id}`} className="header__link">
					Редактирование
				</Link>
			</button>
			<button className="header__item" style={currentLink === 'finder' ? { background: 'rgb(179, 178, 176)' } : {}}>
				<Link to={`/finder`} className="header__link">
					Поиск
				</Link>
			</button>
			<button className="header__item" style={currentLink === 'exitor' ? { background: 'rgb(179, 178, 176)' } : {}}>
				<Link to={`/exitor`} className="header__link">
					Выйти
				</Link>
			</button>
		</>
	);

	return (
		<Fragment>
			<div className="header">
				<nav className="header__havbar">
					<ul className="header__menu">
						{user && user.isAdmin === true ? (
							adminRoute()
						) : (
							<>
								<button
									className="header__item"
									style={currentLink === 'editor' ? { background: 'rgb(179, 178, 176)' } : {}}
								>
									<Link to={`/editor`} className="header__link">
										Редактирование
									</Link>
								</button>
								<button
									className="header__item"
									style={currentLink === 'finder' ? { background: 'rgb(179, 178, 176)' } : {}}
								>
									<Link to={`/finder`} className="header__link">
										Поиск
									</Link>
								</button>
								<button
									className="header__item"
									style={currentLink === 'exitor' ? { background: 'rgb(179, 178, 176)' } : {}}
								>
									<Link to={`/exitor`} className="header__link">
										Выйти
									</Link>
								</button>
							</>
						)}
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default Header;
