import React from 'react';
import GetInfo from "./GetInfo";
import {Link} from "react-router-dom";
import Button from "reactstrap/es/Button";
import {connect} from "react-redux";
import {RESET_TASK_ID_CHOOSED, SET_TASK_ID_CHOOSED} from '../../../actions/NurceAmbulanceAction'


class NewTask extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        this.props.RESET_TASK_ID_CHOOSED();

        this.setState({data: this.props.data})
        this.props.socket.on('GetAllWait', (data) => {
                this.setState({data: data.task})
        });
    }



    render() {
        return this.state.data !== null  && this.state.data.map((task, index) =>
            <tr key={index}>
                <td>
                    <GetInfo id={task.user} type={"Caller"}/>
                </td>
                <td>
                    <GetInfo id={task.endPos} type={"map"}/>
                </td>
                <td>
                    <Button
                        className="btn-outline-white btn-icon"
                        color="info"
                        onClick={() => {
                            this.props.SET_TASK_ID_CHOOSED({id: task._id});
                        }}
                        to="/driverpick-page" tag={Link}><span
                        className="nav-link-inner--text ml-1">Choose Driver and start task</span>
                    </Button>
                </td>
            </tr>
        )
    }
}

const actions = {RESET_TASK_ID_CHOOSED, SET_TASK_ID_CHOOSED};
const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, actions)(NewTask);
