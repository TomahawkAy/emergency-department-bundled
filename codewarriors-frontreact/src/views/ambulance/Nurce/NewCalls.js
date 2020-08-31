import React from 'react';
import {connect} from "react-redux";
import Button from "reactstrap/es/Button";
import axios from "axios";


class NewCalls extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {

        this.setState({data: this.props.data})
        this.props.socket.on('PhoneCallAmbulance', (data) => {
            console.log('socket response to adding table information is being processed');
            this.setState({data: data.calls})

        });
        this.props.socket.on('PhoneCallEndsAmbulance', (data) => {
            this.setState({data: data.calls});
            console.log('socket response to show end is being processed');
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
                    <Button
                        className="btn-outline-white btn-icon"
                        color="info"
                        onClick={() => {

                            axios({
                                method: 'put',
                                url: `http://localhost:3000/PhoneCalls/update/ans/${call.callerid}`,
                            }).then((responce) => {
                                this.setState({data: responce.data})

                                window.open(`/PhoneCALLMEETing-page/n/${call.callerid}`, "new")
                            })


                        }}
                        ><span className="nav-link-inner--text ml-1">Answer</span>
                    </Button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, null)(NewCalls);
