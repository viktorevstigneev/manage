import { connect } from 'react-redux';
import Editor from './Editor';
import loadTeamData from '../../../store/actions/loadTeamData/loadTeamData';

const mapStateToProps = (state) => ({
	team: state.team,
});

const mapDispatchToProps = (dispatch) => ({
	loadTeamData: (id) => dispatch(loadTeamData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
