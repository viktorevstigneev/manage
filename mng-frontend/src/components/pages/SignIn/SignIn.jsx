import React, { Fragment, useCallback, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

import Header from '../../common/Header';

import { signIn } from './utils';

import './style.css';
import { API_URL } from '../../../store/constants';

const SignIn = () => {
	const [user, setUser] = useState({});
	console.log('user: ', user);

	const handleFormSubmit = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signIn({ formData, setUser });
	});
	return user._id ? (
		<Redirect push to={`/main`} />
	) : (
		<Fragment>
			<div className="sign-in">
				<h3 className="sign-in__title">Система учета учащихся</h3>
				<p className="sign-in__error">Null</p>
				<form className="sign-in__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
					<div className="sign-in__wrap">
						<label className="sign-in__label" htmlFor="username">
							Логин
						</label>
						<input
							className="sign-in__input"
							name="username"
							id="username"
							type="text"
							required={true}
						/>
					</div>
					<div className="sign-in__wrap">
						<label className="sign-in__label" htmlFor="password">
							Пароль
						</label>
						<input
							className="sign-in__input"
							name="password"
							id="password"
							type="password"
							required={true}
						/>
					</div>
					<button  className="sign-in__button" type="submit">
						Войти
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default SignIn;
