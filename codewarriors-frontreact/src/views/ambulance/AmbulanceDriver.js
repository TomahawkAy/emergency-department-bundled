import React from "react";
import axios from "axios";
import {Button, Container,} from "reactstrap";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import CurrentTask from "./Driver/CurrentTask";
import HistoryTask from "./Driver/HistoryTask";
import {confirmAlert} from "react-confirm-alert";
import {GEO_SUCCESS_PATIENT} from "../../actions/PositionAction";
import {SET_CURRENT_WAY} from "../../actions/DriverAmbulanceAction";
import {connect} from "react-redux";

class AmbulanceDriver extends React.Component {

    state = {
        currentTask: false,
        readyfor: false,
        id: 0,
        data: null,
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.setState({readyfor: true})
    }


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
                                    <Button
                                        className="btn-1 ml-1"
                                        color="danger"
                                        outline
                                        type="button"
                                        onClick={() => {
                                            let session=JSON.parse(localStorage.getItem('currentUser'));
                                            axios({
                                                method: 'get',
                                                url: `http://localhost:3000/taskD/CurrentTask/driver/${session.user._id}`,
                                            }).then((d) => {

                                                if (d.data.length !== 0) {
                                                    axios({
                                                        method: 'get',
                                                        url: `http://localhost:3000/Coordinate/Coordinate/${d.data[0].endPos}`,
                                                    }).then((pos) => {
                                                        this.props.GEO_SUCCESS_PATIENT({
                                                            latitude: pos.data.lat,
                                                            longitude: pos.data.lon,
                                                        })
                                                    });
                                                    this.props.SET_CURRENT_WAY({CurrentWay: d.data[0].CurrentWay});
                                                    this.setState({data: d.data[0], currentTask: true,})
                                                } else {
                                                    this.setState({currentTask: false,})
                                                    confirmAlert({
                                                        title: 'No Task',
                                                        message: `sir , there is no task for now we will let you know if new one assigned to you`,
                                                        buttons: [
                                                            {
                                                                label: 'Ok',
                                                            }
                                                        ]
                                                    })
                                                }

                                            }).catch(error => console.log(error));

                                        }}
                                    >
                                        Current task </Button>
                                    <Button
                                        className="btn-1 ml-1"
                                        color="danger"
                                        outline
                                        type="button"
                                        onClick={() => {
                                            this.setState({currentTask: false, readyfor: true})
                                        }}
                                    >
                                        History </Button>
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
                        <div className="container">
                            <div className="col-xs-12">

                                {
                                    this.state.currentTask && this.state.readyfor ? this.props.done ? this.setState({
                                        currentTask: false,
                                    }) : <CurrentTask id={this.state.data._id}/> : this.state.readyfor &&
                                        <HistoryTask />}
                            </div>
                        </div>
                    </div>
                </main>
                <CardsFooter/>
            </>
        );
    }
}

const actions = {
    GEO_SUCCESS_PATIENT, SET_CURRENT_WAY
};
const mapStateToProps = state => {
    const {CurrentWay, done} = state.DriverAmbulanceReducer;
    const {socket} = state.root;

    return {socket, CurrentWay, done};
};
export default connect(mapStateToProps, actions)(AmbulanceDriver);
