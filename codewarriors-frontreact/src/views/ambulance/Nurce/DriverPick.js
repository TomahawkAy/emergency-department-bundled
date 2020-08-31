import React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {Container} from "reactstrap";
import './map1css.css';
import CardsFooter from "../../../components/Footers/CardsFooter";
import axios from "axios";
import {connect} from "react-redux";
import GetInfo from "./GetInfo";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
class DriverPick extends React.Component {

    state = {
        data: null,
    };



    LoadAllDriver = () => {
        let session=JSON.parse(localStorage.getItem('currentUser'));
        axios({
            method: 'get',
            url: `http://localhost:3000/GetAllFreeDriver`,
            headers: {
                token: session.token
            }
        }).then((d) => {
            this.setState({data: d.data})
        }).catch(error => console.log(error));
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.LoadAllDriver();
    }

    Alert = (dr) => {
        let session=JSON.parse(localStorage.getItem('currentUser'));
        confirmAlert({
            title: 'Confirm to Assign',
            message: `Are you sure to assign ${dr.name} for  this task `,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.socket.emit("DriverSetted", {id: this.props.taskIdChoosed, nurce:session.user._id ,driver:dr._id});
                        this.props.history.push('/ambulancenurce-page')
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };
    render() {

        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped ">
                            <div className="shape shape-style-1 shape-default">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <Container className="py-lg-md d-flex">
                                <div className="col px-0">
                                </div>
                            </Container>
                            {/* SVG separator */}
                            <div className="separator separator-bottom separator-skew">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    version="1.1"
                                    viewBox="0 0 2560 100"
                                    x="0"
                                    y="0"
                                >
                                    <polygon
                                        className="fill-white"
                                        points="2560 0 2560 100 0 100"
                                    />
                                </svg>
                            </div>
                        </section>
                        {/* 1st Hero Variation */}
                    </div>
                    <br/>
                    <div align="center">
                        <div className="col-11">
                            <table className="table table-bordered" style={{textAlign: "center"}}>
                                <thead>
                                <tr>
                                    <th scope="col">Driver Info</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Number Task for Today</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data && this.state.data.map((dr, index) =>
                                        <tr key={index}>
                                            <td>
                                                <GetInfo  id={dr._id} type={"Driver"}/>
                                            </td>
                                            <td>
                                                <GetInfo  id={dr.coordinate} type={"map"}/>
                                            </td>
                                            <td>
                                                <GetInfo  id={dr._id} type={"taskNB"}/>
                                            </td>
                                            <td>
                                                <button onClick={()=>{
                                                    this.Alert(dr)
                                                }}>Assign</button>
                                            </td>

                                        </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <CardsFooter/>
            </>
        )
            ;
    }
}


const mapStateToProps = state => {
    const {socket} = state.root;
    const {taskIdChoosed} = state.NurceAmbulanceReducer;
    return {socket,taskIdChoosed};
};
export default connect(mapStateToProps, null)(DriverPick);


