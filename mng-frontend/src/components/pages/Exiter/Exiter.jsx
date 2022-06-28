import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Header from '../../common/Header';
import './style.css';

import { API_URL } from '../../../constants';

const Main = (props) => (
	<Fragment>
		<Header />
		<div className="main">
			

		</div>
	</Fragment>
);

Main.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

Main.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default Main;
