import React from "react";
import {connect} from "react-redux";
import CardsFooter from "../../components/Footers/CardsFooter";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import {Button, Container, Modal} from "reactstrap";
import {GEO_FAILURE, GEO_SUCCESS_DRIVER, GEO_SUCCESS_PATIENT, READY_MAP} from "../../actions/PositionAction";

import axios from "axios";
import './patient/map1css.css'
import {confirmAlert} from "react-confirm-alert";
import MapCenterPatient from "./patient/MapCenterPatient";
import MapCenterDriver from "./patient/MapCenterDriver";


class AmbulancePatient extends React.Component {

    state = {
        callingAlert: false,
        taskData: null,
        BtnTrackingDriver: false,
        TaskExist: false,
        DriverSettedForTask: false,
        CurrentTask: false,
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, {
            /* enableHighAccuracy ==> true  for  GPS   -- false for WIFI position */
            enableHighAccuracy: true,
            /* maximun  for    retruving error  location .. */
            timeOut: 10000,
            /*  period  between  retriving position  even  if changed    period respected ==>   0  for   real time  position  */
            maximumAge: 5000
        });
    }

    componentDidMount() {
        this.WATCH_POSITION();
        this.props.socket.on('PositionChange', (data) => {
            if (this.state.DriverSettedForTask && this.state.taskData.driver === data.dataU._id) {
                // alert('Driver position changed')
                this.props.GEO_SUCCESS_DRIVER({
                    latitude: data.dataC.latitude,
                    longitude: data.dataC.longitude,
                })
            }
        });
        this.props.socket.on('DriverSetted', (data) => {
            let session = JSON.parse(localStorage.getItem('currentUser'));
            axios({
                method: 'get',
                url: `http://localhost:3000/taskD/CurrentTask/user/${session.user._id}`,
            }).then((res) => {
                if (data.task._id === res.data[0]._id) {
                    this.props.GEO_SUCCESS_DRIVER({
                        latitude: data.latitude,
                        longitude: data.longitude,
                    })
                    this.setState({
                        taskData: data.task,
                        TaskExist: true,
                        DriverSettedForTask: true,
                        CurrentTask: true
                    });
                }
            })


        });

        setTimeout(() => {
            let session = JSON.parse(localStorage.getItem('currentUser'));
            axios({
                method: 'get',
                url: `http://localhost:3000/taskD/WaitTask/user/${session.user._id}`,
                headers: {token: session.token}
            }).then((responce) => {
                if (responce.data.length !== 0) {
                    this.setState({taskData: responce.data[0], TaskExist: true});
                } else {
                    axios({
                        method: 'get',
                        url: `http://localhost:3000/taskD/CurrentTask/user/${session.user._id}`,
                        headers: {token: session.token}
                    }).then((responce) => {
                        if (responce.data.length !== 0) {
                            axios({
                                method: 'get',
                                url: `http://localhost:3000/Coordinate/GetCoordByUserID/${responce.data[0].driver}`,
                                headers: {token: session.token}
                            }).then((coordinate) => {
                                this.props.GEO_SUCCESS_DRIVER({
                                    latitude: coordinate.data.latitude,
                                    longitude: coordinate.data.longitude,
                                })
                                this.setState({
                                    taskData: responce.data[0],
                                    TaskExist: true,
                                    DriverSettedForTask: true,
                                    CurrentTask: true
                                });
                            })

                        }


                    })
                }
            });
        }, 1000)

    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    geoSuccess = (position) => {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        console.log(position);
        this.props.socket.emit("PositionChange", {
            id: session.user._id, coord: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });
        this.props.GEO_SUCCESS_PATIENT({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
        this.props.READY_MAP();
    }
    geoFailure = (err) => {
        this.props.GEO_FAILURE({error: err.message})
    }

    WATCH_POSITION = () => {
        return navigator.geolocation.watchPosition(this.geoSuccess, this.geoFailure, {
            /* enableHighAccuracy ==> true  for  GPS   -- false for WIFI position */
            enableHighAccuracy: true,
            /* maximun  for    retruving error  location .. */
            timeOut: 20000,
            /*  period  between  retriving position  even  if changed    period respected ==>   0  for   real time  position  */
            maximumAge: 500,
            /*  The minimum distance from the previous location to exceed before returning a new location. Set to 0 to not filter locations. Defaults to 100m. */
            distanceFilter: 0,
            /*  Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE.
                uses  for low batterie only */
            useSignificantChanges: false
        });
    }
    // STOP_WATCH_POSITION = (watchID) => {
    //     navigator.geolocation.clearWatch(watchID);
    // }

    trakingAmbulance = () => {
        if (this.state.DriverSettedForTask) {
            this.setState({BtnTrackingDriver: true})
        } else {
            this.toggleModal("notificationModal")
        }
    };
    MyPosition = () => {
        this.setState({BtnTrackingDriver: false})
    };
    callForAmbulanceBtn = () => {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({callingAlert: true});
        confirmAlert({
            closeOnClickOutside: false,
            title: 'Sure !!',
            message: `Once you confirm, ambulance driver will be on his way    as soon as possible   `,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post(`http://localhost:3000/taskD/getAll`, {
                            token: session.token,
                            user: session.user._id,
                        }).then((response) => {
                            axios.post(`http://localhost:3000/Coordinate/StartPos/${response.data._id}`, {
                                token: session.token,
                                latitude: this.props.BasePos.lat,
                                longitude: this.props.BasePos.lng,
                            }).then(() => {
                                axios.post(`http://localhost:3000/Coordinate/EndPos/${response.data._id}`, {
                                    token: session.token,
                                    latitude: this.props.PatientPos.lat,
                                    longitude: this.props.PatientPos.lng,
                                }).then(() => {
                                    this.props.socket.emit("GetAllWait")
                                    this.setState({TaskExist: true})
                                    this.WATCH_POSITION();
                                })
                            })
                        }).catch(error => console.log(error));
                        this.setState({callingAlert: false})
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        this.setState({callingAlert: false})
                    }
                }
            ]
        });
    };

    componentWillUnmount() {
        this.setState({isMapInit: false})
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
                                    <Button className="btn-warning ml-1"
                                            type="button"
                                            onClick={
                                                () => {
                                                    let session=JSON.parse(localStorage.getItem('currentUser'));
                                                    this.props.socket.emit("PhoneCallAmbulance", {id: session.user._id});
                                                    window.open(`/PhoneCALLMEETing-page/p/${session.user._id}`, "new")
                                                }
                                            }
                                    >Make a phone Call </Button>
                                    {this.state.TaskExist ?
                                        this.state.BtnTrackingDriver ?
                                            <Button className="btn-1 ml-1" color="danger" outline type="button"
                                                    onClick={this.MyPosition}>my position</Button>
                                            :
                                            <Button className="btn-1 ml-1" color="danger" outline type="button"
                                                    onClick={this.trakingAmbulance}>traking ambulance</Button>
                                        : <>
                                            <Button className="btn-1 ml-1" color="danger" outline type="button"
                                                    onClick={this.callForAmbulanceBtn}>call for ambulance</Button>
                                        </>
                                    }
                                    <br/>
                                    {
                                        this.state.CurrentTask && <h3 className="text-darker font-weight-light mb-2">
                                            Driver on his way </h3>
                                    }
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
                    {this.state.callingAlert === false && <div className="container">
                        <Modal
                            className="modal-dialog-centered modal-danger"
                            isOpen={this.state.notificationModal}
                            toggle={() => this.toggleModal("notificationModal")}
                        >
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-notification">
                                    Sorry
                                </h6>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    <span aria-hidden={true}>X</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="py-3 text-center">
                                    <i className="ni ni-bell-55 ni-3x"/>
                                    <h4 className="heading mt-4">Your call steel in progress!</h4>
                                    <p>
                                        please wait for a bit
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className="text-white ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
                        <div className="col-xs-12">

                            {
                                this.state.BtnTrackingDriver
                                    ?
                                    <>
                                        <h1>Driver Position</h1>
                                        <div className="card">
                                            <MapCenterDriver taskData={this.state.taskData}
                                                             isDriver={this.state.DriverSettedForTask}/>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h1>My Position</h1>
                                        <div className="card">
                                            <MapCenterPatient taskData={this.state.taskData}
                                                              isDriver={this.state.DriverSettedForTask}/>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>}


                </main>
                <CardsFooter/>
            </>
        );
    }
}

const actions = {
    GEO_SUCCESS_DRIVER, GEO_SUCCESS_PATIENT, GEO_FAILURE, READY_MAP
};
const mapStateToProps = state => {
    const {PatientPos, DriverPos, BasePos} = state.PositionReducer;
    const {socket} = state.root;
    return {PatientPos, socket, DriverPos, BasePos};
};
export default connect(mapStateToProps, actions)(AmbulancePatient);
