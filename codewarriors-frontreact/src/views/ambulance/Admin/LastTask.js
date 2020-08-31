import React from 'react';
import GetInfo from "../Nurce/GetInfo";
import {connect} from "react-redux";


class LastTask extends React.Component {


    state = {
        data: null,
    }

    componentDidMount() {
        this.setState({data: this.props.data})
        this.props.socket.on('GetAllDone', (data) => {
            this.setState({data: data.task})
        });
    }


    render() {
        return this.state.data !== null && this.state.data.map((task, index) =>
            <tr key={index}>
                <td>
                    <GetInfo id={task.user} type={"Caller"}/>
                </td>
                <td>
                    <GetInfo id={task.nurce} type={"Nurce"}/>
                </td>
                <td>
                    <GetInfo id={task.driver} type={"Driver"}/>
                </td>
                <td>
                    <GetInfo id={task.endPos} type={"map"}/>
                </td>
                <td>
                    {task.date}
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, null)(LastTask);
