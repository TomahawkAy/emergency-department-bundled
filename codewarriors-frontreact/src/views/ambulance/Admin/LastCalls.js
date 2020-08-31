import React from 'react';
import {connect} from "react-redux";
import axios from "axios";


class LastCalls extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {

        this.setState({data: this.props.data})
        this.props.socket.on('PhoneCallEndsAmbulance', (data) => {
            this.setState({data: data.calls})

        });
    }


    render() {
        return this.state.data !== null && this.state.data.map((call, index) =>
            <tr key={index}>
                <td>
                    {call.cin}
                </td>
                <td>
                    {call.name}
                </td>
                <td>
                    {call.lastName}
                </td>
                <td>
                    {call.phoneNumber}
                </td>
                <td>
                    {call.email}
                </td>
                <td>
                    {call.date}
                </td>
                <td>
                    {call.answred === true ? <> Answered</>:<> Missed </>}
                </td>

            </tr>
        )
    }
}

const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, null)(LastCalls);
