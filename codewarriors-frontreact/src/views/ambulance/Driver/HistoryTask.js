import React from 'react'
import GetInfo from "../Nurce/GetInfo";
import axios from "axios";


class HistoryTask extends React.Component {
    state = {
        data: null,
        session: null, _id: ''
    };

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem("currentUser"));


        axios({
            method: 'get',
            url: `http://localhost:3000/taskD/userDriver/driver/${session.user._id}`,
        }).then((d) => {
            this.setState({data: d.data, _id: session.user._id, session: session});
        }).catch(error => console.log(error));
    }

    componentWillUnmount() {
        this.setState({data: null})
    }

    render() {
        return (<>
                <table className="table table-bordered" style={{textAlign: "center"}}>
                    <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Nurse</th>
                        <th scope="col">Patient Location</th>
                        <th scope="col">NB KLM</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data && this.state.data.map((task, index) =>
                            <tr key={index}>
                                <td>
                                    <GetInfo id={task.user} type={"Caller"}/>
                                </td>
                                <td>
                                    <GetInfo id={task.nurce} type={"Nurce"}/>
                                </td>
                                <td>
                                    <GetInfo id={task.endPos} type={"map"}/>
                                </td>
                                <td>
                                    {task.klm}
                                </td>
                                <td>
                                    {task.date}
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </>
        )
    }


}

export default HistoryTask;
