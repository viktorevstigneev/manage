import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Header from '../../common/Header';
import './style.css';

import { API_URL } from '../../../constants';

const klass = ['1 class', '2 class', '3 class', '4 class', '5 class', '6 class', '6A class'];

const klub = ['ЗОЖ клуб', 'Клуб автолюбителей', 'Клуб цветоводов', 'Клуб караблестроения', 'Клуб Юнеско'];

const olympy = ['Олимпиада по математике', 'Олимпиада по Истории', 'Олимпиада по Химии'];

const Editor = (props) => {
	const [choice, setChoice] = useState();

	const [addtion, setAddition] = useState({
		Clasy: false,
		kluby: false,
		Olimpiady: false,
	});

	const [add, setAdd] = useState(false);

	const [classer, setClasser] = useState(klass);
	console.log('classer: ', classer);
	const [kluber, setKluber] = useState(klub);
	const [olymper, setOlymper] = useState(olympy);

	const [currentClass, setCurrentClass] = useState();
	const [currentKlub, setCurrentKlub] = useState();
	const [currentOlymp, setCurrentOlymp] = useState();

	const [isOpenAddStudent, setIsopenStudent] = useState(false);
	const [students, setStudents] = useState();
	const [settedStudent, setSettedStudent] = useState();
	const [openEdit, setOpenEdit] = useState(false);
	console.log('openEdit: ', openEdit);

	const [isOpenAddTeacher, setIsopenTeacher] = useState(false);
	const [teachers, setTeachers] = useState();
	console.log('teachers: ', teachers);
	const [settedTeacher, setSettedTeacher] = useState();

	const [isOpenParents, setIsOpenParents] = useState(false);

	const handleGetAllStudents = async (evt) => {
		setAddition({
			Clasy: false,
			kluby: false,
			Olimpiady: false,
		});
		setChoice(evt.target.textContent);
		const responseData = await axios
			.get(`${API_URL}/team`, { withCredentials: true })
			.then((response) => setStudents(response.data));
	};

	const handleGetAllTeachers = async (evt) => {
		setAddition({
			Clasy: false,
			kluby: false,
			Olimpiady: false,
		});
		setChoice(evt.target.textContent);
		const responseData = await axios
			.get(`${API_URL}/teacher`, { withCredentials: true })
			.then((response) => setTeachers(response.data));
	};

	const handleAddClick = () => {
		if (choice === 'Ученики') {
			setAddition({
				Clasy: false,
				kluby: false,
				Olimpiady: false,
			});
			setIsopenTeacher(false);
			setOpenEdit(false);

			setIsopenStudent(true);
		}
		if (choice === 'Учителя') {
			setAddition({
				Clasy: false,
				kluby: false,
				Olimpiady: false,
			});
			setIsopenStudent(false);
			setOpenEdit(false);

			setIsopenTeacher(true);
		}

		if (addtion.Clasy || addtion.kluby || addtion.Olimpiady) {
			setAdd(true);
		}
	};

	const handleDeleteClick = async () => {
		if (choice === 'Ученики') {
			const responseData = await axios
				.delete(`${API_URL}/team/${settedStudent}`, { withCredentials: true })
				.then((response) => response.data);
			console.log('responseData: ', responseData);
			await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => setStudents(response.data));
		}
		if (choice === 'Учителя') {
			const responseData = await axios
				.delete(`${API_URL}/teacher/${settedTeacher}`, { withCredentials: true })
				.then((response) => response.data);
			console.log('responseData: ', responseData);
			await axios.get(`${API_URL}/teacher`, { withCredentials: true }).then((response) => setTeachers(response.data));
		}
		if (addtion.Clasy) {
			setClasser((prev) => prev.filter((item) => item != currentClass));
		}
		if (addtion.kluby) {
			setKluber((prev) => prev.filter((item) => item != currentKlub));
		}
		if (addtion.Olimpiady) {
			setOlymper((prev) => prev.filter((item) => item != currentOlymp));
		}
	};

	const handleEditClick = () => {
		if (choice === 'Ученики' && settedStudent) {
			setChoice('');

			setOpenEdit(true);
		}
	};

	return (
		<Fragment>
			<Header />
			<div className="editor">
				<div className="editor__left">
					<div className="editor__students">
						<p
							className="student_item"
							onClick={handleGetAllStudents}
							style={choice === 'Ученики' ? { background: 'rgb(255, 228, 190)' } : {}}
						>
							Ученики
						</p>
					</div>

					<div className="editor__teachers">
						<p
							className="teacher_item"
							onClick={handleGetAllTeachers}
							style={choice === 'Учителя' ? { background: 'rgb(255, 228, 190)' } : {}}
						>
							Учителя
						</p>
					</div>
					<div className="editor__catalog">
						<p
							className="catalog_item"
							style={addtion.Clasy ? { background: 'rgb(255, 228, 190)' } : {}}
							onClick={() => {
								setChoice('');

								setAddition({
									Clasy: true,
									kluby: false,
									Olimpiady: false,
								});
							}}
						>
							Классы
						</p>
						<p
							className="catalog_item"
							style={addtion.kluby ? { background: 'rgb(255, 228, 190)' } : {}}
							onClick={() => {
								setChoice('');
								setAddition({
									Clasy: false,
									kluby: true,
									Olimpiady: false,
								});
							}}
						>
							Клубы
						</p>
						<p
							className="catalog_item"
							style={addtion.Olimpiady ? { background: 'rgb(255, 228, 190)' } : {}}
							onClick={() => {
								setChoice('');
								setAddition({
									Clasy: false,
									kluby: false,
									Olimpiady: true,
								});
							}}
						>
							Олимпиады
						</p>
					</div>
				</div>

				<div className="editor__right">
					<div className="admin_top">
						<button className="admin__button" onClick={handleAddClick}>
							Добавить
						</button>
						<button className="admin__button" onClick={handleDeleteClick}>
							Удалить
						</button>
						<button className="admin__button" onClick={handleEditClick}>
							Редактировать
						</button>
					</div>

					{/* **************** STUDENTS ******************* */}
					{isOpenAddStudent && (
						<form
							className="add__student"
							onSubmit={async (evt) => {
								evt.preventDefault();
								const formData = new FormData(evt.target);

								const responseData = await axios.post(`${API_URL}/team`, formData).then((response) => response.data);
								console.log('responseData: ', responseData);
								setIsopenStudent(false);
								await axios
									.get(`${API_URL}/team`, { withCredentials: true })
									.then((response) => setStudents(response.data));
							}}
						>
							<input className="add__input" type="text" placeholder="имя" name="name" required />
							<input className="add__input" type="text" placeholder="фамилия" name="lastname" required />
							<input className="add__input" type="text" placeholder="отчество" name="surname" required />
							<input className="add__input" type="text" placeholder="день рождения" name="birthday" required />
							<input className="add__input" type="text" placeholder="адресс" name="adress" required />
							<input className="add__input" type="text" placeholder="ФИО матери" name="mom" required />
							<input className="add__input" type="text" placeholder="ФИО отца" name="dad" required />
							<label> Секции</label>
							<select className="add__input" multiple size="4" name="sekty">
								<option value="Баскетбол">Баскетбол</option>
								<option value="Волейбол">Волейбол</option>
								<option value="Рисование">Рисование</option>
								<option value="Футбол">Футбол</option>
								<option value="Танцы">Танцы</option>
								<option value="Барабаны">Барабаны</option>
							</select>
							<button type="submit">сохранить</button>
						</form>
					)}

					{choice === 'Ученики' && students?.length > 0 && (
						<div className="admin__table">
							<div className="admin__wrap-top">
								<p className="admin__check-top"></p>
								<p className="admin__item-top">Фамилия</p>
								<p className="admin__item-top">Имя</p>
								<p className="admin__item-top">Отчество</p>
								<p className="admin__item-top">Дата рождения</p>
								<p className="admin__item-top">Адрес</p>
							</div>
							{students
								? students.map((student) => (
										<div
											className="admin__wrap"
											data-id={student._id}
											onClick={(evt) => {
												setSettedStudent(evt.currentTarget.getAttribute('data-id'));
											}}
										>
											<p className="admin__check">
												<input
													className="admin_input"
													type="checkbox"
													id="scales"
													name="scales"
													checked={settedStudent === student._id}
												/>
											</p>
											<p className="admin__item">{student.lastname}</p>
											<p className="admin__item">{student.name}</p>
											<p className="admin__item">{student.surname}</p>
											<p className="admin__item">{student.birthday}</p>
											<p className="admin__item">{student.adress}</p>
										</div>
								  ))
								: 'пусто'}
						</div>
					)}
					{/* STUDENTS */}

					{/* ***************TEACHERS*************** */}

					{isOpenAddTeacher && (
						<form
							className="add__student"
							onSubmit={async (evt) => {
								evt.preventDefault();
								const formData = new FormData(evt.target);

								const responseData = await axios.post(`${API_URL}/teacher`, formData).then((response) => response.data);
								console.log('responseData: ', responseData);
								setIsopenTeacher(false);
								await axios
									.get(`${API_URL}/teacher`, { withCredentials: true })
									.then((response) => setTeachers(response.data));
							}}
						>
							<input className="add__input" type="text" placeholder="имя" name="name" required />
							<input className="add__input" type="text" placeholder="фамилия" name="lastname" required />
							<input className="add__input" type="text" placeholder="отчество" name="surname" required />
							<input className="add__input" type="text" placeholder="день рождения" name="birthday" required />

							<input className="add__input" type="text" placeholder="адресс" name="adress" required />
							<select className="add__input" name="subject">
								<option value="математика">математика</option>
								<option value="беларусский">белорусский</option>
								<option value="химия">химия</option>
								<option value="биология">биология</option>
								<option value="физкультура">физкультура</option>
								<option value="русский" selected>
									русский
								</option>
							</select>
							<button type="submit">сохранить</button>
						</form>
					)}

					{choice === 'Учителя' && teachers?.length > 0 && (
						<div className="admin__table">
							<div className="admin__wrap-top">
								<p className="admin__check-top"></p>
								<p className="admin__item-top">Фамилия</p>
								<p className="admin__item-top">Имя</p>
								<p className="admin__item-top">Отчество</p>
								<p className="admin__item-top">Дата рождения</p>
								<p className="admin__item-top">Адрес</p>
							</div>
							{teachers
								? teachers.map((teacher) => (
										<div
											className="admin__wrap"
											data-id={teacher._id}
											onClick={(evt) => {
												setSettedTeacher(evt.currentTarget.getAttribute('data-id'));
											}}
										>
											<p className="admin__check">
												<input
													className="admin_input"
													type="checkbox"
													id="scales"
													name="scales"
													checked={settedTeacher === teacher._id}
												/>
											</p>
											<p className="admin__item">{teacher.lastname}</p>
											<p className="admin__item">{teacher.name}</p>
											<p className="admin__item">{teacher.surname}</p>
											<p className="admin__item">{teacher.birthday}</p>
											<p className="admin__item">{teacher.adress}</p>
										</div>
								  ))
								: 'пусто'}
						</div>
					)}
					{/*  TEACHERS */}

					<div className="addtional_states">
						{add && (
							<form
								className="adition__form"
								onSubmit={(evt) => {
									evt.preventDefault();
									const formData = new FormData(evt.target);
									console.log('formData: ', formData.get('item'));
									addtion.Clasy === true && setClasser([...classer, formData.get('item')]);
									addtion.kluby === true && setKluber([...kluber, formData.get('item')]);
									addtion.Olimpiady === true && setOlymper([...olymper, formData.get('item')]);
								}}
							>
								<input className="add__input" type="text" name="item" placeholder="введите значение" />
								<button type="submit">Добавить</button>
							</form>
						)}
						{addtion.Clasy === true && (
							<div className="">
								{classer.map((item) => (
									<div
										className="additional__item"
										data-id={item}
										onClick={(evt) => {
											setCurrentClass(evt.target.getAttribute('data-id'));
										}}
									>
										<input type="checkbox" checked={currentClass === item} />
										<p className="adition__right">{item}</p>
									</div>
								))}
							</div>
						)}
						{addtion.kluby === true && (
							<div className="">
								{kluber.map((item) => (
									<div
										className="additional__item"
										data-id={item}
										onClick={(evt) => {
											setCurrentKlub(evt.target.getAttribute('data-id'));
										}}
									>
										<input type="checkbox" checked={currentKlub === item} />
										<p className="adition__right">{item}</p>
									</div>
								))}
							</div>
						)}
						{addtion.Olimpiady === true && (
							<div className="">
								{olymper.map((item) => (
									<div
										className="additional__item"
										data-id={item}
										onClick={(evt) => {
											setCurrentOlymp(evt.target.getAttribute('data-id'));
										}}
									>
										<input type="checkbox" checked={currentOlymp === item} />
										<p className="adition__right">{item}</p>
									</div>
								))}
							</div>
						)}
					</div>

					{/* OPEN STUDENT EDIT */}
					{openEdit == true && (
						<div className="student__edit__block">
							<div className="edit__controls">
								<button
									className="controls__button"
									onClick={() => {
										setIsOpenParents(true);
									}}
								>
									Pодители
								</button>
							</div>
							<div className="admin__table">
								<div className="admin__wrap-top">
									<p className="admin__item-top">Фамилия</p>
									<p className="admin__item-top">Имя</p>
									<p className="admin__item-top">Отчество</p>
									<p className="admin__item-top">Дата рождения</p>
									<p className="admin__item-top">Адрес</p>
								</div>
								{openEdit == true && students
									? students
											.filter((item) => item._id === settedStudent)
											.map((student) => (
												<div className="admin__wrap">
													<p className="admin__item">{student.lastname}</p>
													<p className="admin__item">{student.name}</p>
													<p className="admin__item">{student.surname}</p>
													<p className="admin__item">{student.birthday}</p>
													<p className="admin__item">{student.adress}</p>
												</div>
											))
									: 'пусто'}
								{isOpenParents && (
									<div className="admin__table">
										<div className="admin__wrap-top">
											<p className="admin__item-top">ФИО матери</p>
											<p className="admin__item-top">ФИО отца</p>
										</div>
										{students
											? students
													.find((item) => item._id === settedStudent)
													?.roditely.map((roditel) => (
														<form
															className="admin__wrap"
															onSubmit={async (evt) => {
																evt.preventDefault();
																const formData = new FormData(evt.target);

																const responseData = await axios
																	.patch(`${API_URL}/team/${settedStudent}`, formData)
																	.then((response) => response.data);
																console.log('responseData: ', responseData);
																// setIsopenStudent(false);
																await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
																	setStudents(response.data);
																	window.location.reload();
																});
															}}
														>
															<input className="add__input admin__item" placeholder={roditel.mom} name="mom" required />
															<input className="add__input admin__item" placeholder={roditel.dad} name="dad" required />
															<button type="submit">Сохранить</button>
															<button>Отменить</button>
														</form>
													))
											: null}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

Editor.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

Editor.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Editor;
