import React from 'react';
import GetInfo from "./GetInfo";
import {connect} from "react-redux";




class CurrentTask extends React.Component{

    state = {
        data: null,
    }

    componentDidMount() {
        this.setState({data: this.props.data})
        this.props.socket.on('GetAllCurrent', (data) => {
            this.setState({data: data.task})
        });
    }


    render(){
        return  this.state.data !== null  && this.state.data.map((task, index) =>

            <tr key={index}>
                <td>
                    <GetInfo  id={task.user} type={"Caller"}/>
                </td>
                <td>
                    <GetInfo  id={task.nurce} type={"Nurce"}/>
                </td>
                <td>
                    <GetInfo  id={task.driver} type={"Driver"}/>
                </td>
                <td>
                    <GetInfo   id={task.endPos} type={"map"}/>
                </td>
                <td>
                    {task.CurrentWay}
                </td>
            </tr>
        )
    }
}
const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, null)(CurrentTask);
