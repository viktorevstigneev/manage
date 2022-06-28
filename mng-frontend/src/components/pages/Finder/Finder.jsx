import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Header from '../../common/Header';
import './style.css';

import { API_URL } from '../../../constants';


const Finder = (props) => {
	const [finded, setFinded] = useState();
	const [choise, setChoice] = useState('Ученики');

	const handleFormSubmit = async (evt) => {
		evt.preventDefault();
		const formData = new FormData(evt.target);
		console.log('formData: ', ...formData);

		const responseData = await axios.post(`${API_URL}/person`, formData).then((response) => setFinded(response.data));
		console.log('responseData: ', responseData);
	};

	const handleFormSubmitForTeacher = async (evt) => {
		evt.preventDefault();
		const formData = new FormData(evt.target);
		console.log('formData: ', ...formData);

		const responseData = await axios
			.post(`${API_URL}/findteacher`, formData)
			.then((response) => setFinded(response.data));
		console.log('responseData: ', responseData);
	};

	return (
		<Fragment>
			<Header />
			<div className="finder">
				<div className="finder__left">
					<p
						className="finder__item"
						style={choise === 'Ученики' ? { background: 'rgb(255, 228, 190)' } : {}}
						onClick={(evt) => {
							setChoice(evt.target.textContent);
						}}
					>
						Ученики
					</p>
					<p
						className="finder__item"
						style={choise === 'Учителя' ? { background: 'rgb(255, 228, 190)' } : {}}
						onClick={(evt) => {
							setChoice(evt.target.textContent);
						}}
					>
						Учителя
					</p>
				</div>

				{choise === 'Ученики' && (
					<form className="finder__form" onSubmit={handleFormSubmit}>
						<button className="finder__button" type="submit">
							Поиск
						</button>

						<div className="finder__wrap">
							<label className="finder__label">имя</label>
							<input className="finder__input" type="text" name="name" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">фамилия</label>
							<input className="finder__input" type="text" name="lastname" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">отчество</label>
							<input className="finder__input" type="text" name="surname" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">день рождения</label>
							<input className="finder__input" type="text" name="birthday" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">адресс</label>
							<input className="finder__input" type="text" name="adress" required />
						</div>
					</form>
				)}

				{choise === 'Учителя' && (
					<form className="finder__form" onSubmit={handleFormSubmitForTeacher}>
						<button className="finder__button" type="submit">
							Поиск
						</button>

						<div className="finder__wrap">
							<label className="finder__label">имя</label>
							<input className="finder__input" type="text" name="name" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">фамилия</label>
							<input className="finder__input" type="text" name="lastname" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">отчество</label>
							<input className="finder__input" type="text" name="surname" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">день рождения</label>
							<input className="finder__input" type="text" name="birthday" required />
						</div>

						<div className="finder__wrap">
							<label className="finder__label">Предмет</label>
							<select className="finder__input" name="subject">
								<option value="математика">математика</option>
								<option value="русский" selected>
									русский
								</option>
							</select>
						</div>
					</form>
				)}
			</div>

			{finded &&
				finded.map((item) => (
					<div className="finded__block">
						<p className="finded">{item?.name}</p>
						<p className="finded">{item?.surname}</p>
						<p className="finded">{item?.lastname}</p>
						<p className="finded">{item?.birthday}</p>
						<p className="finded">{item?.adress}</p>
					</div>
				))}
			<button onClick={() => window.print()}>Печать</button>
		</Fragment>
	);
};

Finder.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

Finder.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Finder;
