import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Adminer from '../pages/Adminer';
import Finder from '../pages/Finder'
import Exitor from '../common/ModalWindow'
import Editor from '../pages/Editor';
import './App.css';

const App = () => (
	<Switch>
		<Route path="/singin" component={SignIn} />
		<Route path="/adminer" component={Adminer} />
		<Route path="/editor" component={Editor} />
		<Route path="/finder" component={Finder} />
		<Route path="/exitor" component={Exitor} />
		<Redirect to="/editor" />
	</Switch>
);

export default App;
