import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Header from '../../common/Header';
import { signIn } from '../SignIn/utils';
import './style.css';

import { API_URL } from '../../../constants';

const Main = (props) => {
	const [users, setUsers] = useState();
	const [currentUser, setCurrentUser] = useState();
	const [addNewUser, setAddNewUser] = useState(false);

	const getUsers = async () => {
		const responseData = await axios
			.get(`${API_URL}/users`, { withCredentials: true })
			.then((response) => setUsers(response.data));
	};

	useEffect(() => {
		getUsers();
	}, []);

	const handleDeleteUser = async () => {
		const responseData = await axios
			.delete(`${API_URL}/profile/${currentUser}`, { withCredentials: true })
			.then((response) => response.data);
		getUsers();
	};

	const handleFormSubmit = async (evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		await axios({
			method: 'POST',
			data: {
				username: formData.username,
				password: formData.password,
			},
			withCredentials: true,
			url: `${API_URL}/signup`,
		})
			.then((response) => response.data)
			.catch((error) => {
				console.log('error: ', error);
			});

		getUsers();
	};

	return (
		<Fragment>
			<div className="admin">
				<Header />

				<div className="admin_top">
					<button
						className="admin__button"
						onClick={() => {
							setAddNewUser(true);
						}}
					>
						Добавить
					</button>
					<button className="admin__button" onClick={handleDeleteUser}>
						Удалить
					</button>
				</div>

				{addNewUser && (
					<form className="add-user__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
						<div className="sign-in__wrap">
							<label className="sign-in__label" htmlFor="username">
								Логин
							</label>
							<input className="sign-in__input" name="username" id="username" type="text" required={true} />
						</div>
						<div className="sign-in__wrap">
							<label className="sign-in__label" htmlFor="password">
								Пароль
							</label>
							<input className="sign-in__input" name="password" id="password" type="password" required={true} />
						</div>
						<button className="sign-in__button" type="submit">
							Добавить пользователя
						</button>
					</form>
				)}
				<div className="admin__table">
					<div className="admin__wrap-top">
						<p className="admin__check-top"></p>
						<p className="admin__item-top">Логин</p>
						<p className="admin__item-top">Пароль</p>
					</div>
					{users &&
						users.map((item) => (
							<div
								data-id={item._id}
								className="admin__wrap"
								onClick={(evt) => {
									setAddNewUser(false);
									setCurrentUser(evt.currentTarget.getAttribute('data-id'));
								}}
							>
								<p className="admin__check">
									<input type="checkbox" id="scales" name="scales" checked={currentUser === item._id} />
								</p>
								<p className="admin__item">{item.username}</p>
								<p className="admin__item">{item.password}</p>
							</div>
						))}
				</div>
			</div>
		</Fragment>
	);
};

Main.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

Main.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Main;
