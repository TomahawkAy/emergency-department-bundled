import * as React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import DemoNavbar from "../components/Navbars/DemoNavbar";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import {BACKGROUND_HOME_STYLE} from "../assets/css/customStyles";
import {Logs} from "../components/extra/Logs";
import CardHeader from "reactstrap/es/CardHeader";
import connectedUsers from '../assets/img/home/group.svg';
import covid19 from '../assets/img/home/virus.svg';
import {Doughnut} from "react-chartjs-2";
import Preloader from "../components/extra/Preloader";
import axios from "axios";
import MapForHome from "./ambulance/home/MapForHome";
import Form from "reactstrap/es/Form";
import {FormGroup, Input} from "@material-ui/core";
import InputGroup from "reactstrap/es/InputGroup";
import InputGroupAddon from "reactstrap/es/InputGroupAddon";
import InputGroupText from "reactstrap/es/InputGroupText";
import $ from 'jquery';
export class Home extends React.Component {
    constructor(params) {
        super(params);
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let colors = ['#ffca28', '#ff5722', '#00e5ff', '#00e676', '#ff4081'];
        if (session !== null) {
            this.state = {
                user: session.user, data: {
                    datasets: [{
                        data: [20, 91, 23, 97, 67],
                        backgroundColor: colors,
                        borderColor: 'transparent'
                    }],
                    labels: [
                        'Doctors',
                        'Nurses',
                        'Drivers',
                        'Pharmacist',
                        'Admins'
                    ],
                },
                predictions: '..',
                retrievedPrediction: false,
                connectedUsersData: []
            };
            this.searchBarActivated = this.searchBarActivated.bind(this);
            this.props.socket.emit('requesting_prediction', {data: [23, 15]});
            this.props.socket.on('ready_to_fetch', (data) => {
                console.log(data);
                let result = data.data;
                this.setState({predictions: result, retrievedPrediction: true});
            });
            if (this.props.role === 'admin') {
                this.props.socket.emit('request_connected_users', {});
                this.props.socket.on('request_granted_connected_users', (response) => {
                    console.log(response);
                    this.setState({connectedUsersData: response});
                });
                this.props.socket.on('user_connected', (response) => {
                    console.log(response);
                    this.setState({connectedUsersData: response});
                });
            }

        }

    }
    searchBarActivated() {
        let searchBar = $('#search-bar');
        let suggestions = $('#suggestions');
        suggestions.empty();
        let list = ['loula', 'thenya', 'theltha', 'rab3a'];
        this.props.socket.emit('requesting_search_bar', {query: searchBar.val()});
        if (searchBar.val() !== "") {
            list.forEach((e) => {
                if (e.startsWith(searchBar.val())) {
                    console.log('matched...');
                    suggestions.append("<li class='list-group-item animated bounceIn'><a href='#' class='badge badge-light'>" + e + "</a></li>")
                } else {
                    console.log('not matched ...');
                }
            });
        }
    }


    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        axios.get('https://api.covid19api.com/country/Tunisia/status/confirmed/live')
            .then((response) => {
                this.setState({covid19: response.data.length - 1});
            });
    }

    render() {
        if (!this.props.user_connected && this.props.role !== "admin")
            return (<Redirect to='/login'/>);
        else
            return (
                <>
                    <DemoNavbar user={this.props}/>
                    <main>
                        <div className="position-relative">
                            {/* shape Hero */}
                            <section className="section section-lg section-shaped pb-250">
                                <div className="shape shape-style-1 shape-default" style={BACKGROUND_HOME_STYLE}
                                >
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
                                        <Row>
                                            <Col lg="12" xl="12" xs="12">
                                                <Card className="card-lift--hover shadow border-0"
                                                      style={{backgroundColor: "#5e72e4"}}>
                                                    <CardHeader className="text-center "
                                                                style={{backgroundColor: "#5e72e4"}}><h1
                                                        style={{color: 'white'}}>Glad
                                                        to see you back , <code>{this.state.user.name}</code></h1
                                                    >
                                                    </CardHeader>
                                                    <CardBody className="py-5">
                                                        <Row>
                                                            <Col lg="3" xs="12" xl="3">
                                                                <Card className="card-plain border-0">
                                                                    <CardHeader style={{backgroundColor: "#455a64"}}
                                                                                className="text-center">
                                                                            <span style={{color: "white"}}>
                                                                                <img src={connectedUsers}
                                                                                     alt="connected users" style={{
                                                                                    maxWidth: '30px',
                                                                                    maxHeight: '30px'
                                                                                }}/>
                                                                                &nbsp;
                                                                                Connected users</span>
                                                                    </CardHeader>
                                                                    <CardBody style={{
                                                                        backgroundColor: '#546e7a',
                                                                        minHeight: '200px'
                                                                    }}
                                                                              className="text-center">
                                                                        <div>
                                                                                    <span style={{
                                                                                        fontSize: '70px',
                                                                                        color: 'white'
                                                                                    }}>{this.state.connectedUsersData.length}</span>
                                                                            <br/><b style={{
                                                                            color: 'white',
                                                                            fontSize: '25px'
                                                                        }}>User</b>
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                            <Col lg="3" xs="12" xl="3">
                                                                <Card className="card-plain border-0">
                                                                    <CardHeader className="text-center"
                                                                                style={{backgroundColor: '#455a64'}}>
                                                                        <span style={{color: "white"}}>
                                                                                <img src={connectedUsers}
                                                                                     alt="connected users" style={{
                                                                                    maxWidth: '30px',
                                                                                    maxHeight: '30px'
                                                                                }}/>&nbsp; By role</span>
                                                                    </CardHeader>
                                                                    <CardBody style={{
                                                                        backgroundColor: '#546e7a',
                                                                        minHeight: '200px',
                                                                    }}>
                                                                        <Doughnut
                                                                            width={170}
                                                                            data={this.state.data}
                                                                            options={{
                                                                                responsive: true,
                                                                                maintainAspectRatio: true,
                                                                            }}
                                                                            legend={{
                                                                                display: false
                                                                            }}

                                                                        />
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                            <Col lg="3" xs="12" xl="3">
                                                                <Card className="card-plain border-0">
                                                                    <CardHeader style={{backgroundColor: "#455a64"}}
                                                                                className="text-center">
                                                                            <span style={{color: "white"}}>
                                                                                <img src={connectedUsers}
                                                                                     alt="connected users" style={{
                                                                                    maxWidth: '30px',
                                                                                    maxHeight: '30px'
                                                                                }}/>
                                                                                Predicted patients</span>
                                                                    </CardHeader>
                                                                    <CardBody style={{
                                                                        backgroundColor: '#546e7a',
                                                                        minHeight: '200px'
                                                                    }}
                                                                              className="text-center">
                                                                        <div>
                                                                            {!this.state.retrievedPrediction ?
                                                                                (
                                                                                    <span style={{
                                                                                        fontSize: '70px',
                                                                                        color: 'white'
                                                                                    }}>
                                                                                <Preloader/>
                                                                                </span>)
                                                                                :
                                                                                (<span style={{
                                                                                        fontSize: '70px',
                                                                                        color: 'white'
                                                                                    }}>{this.state.predictions}<br/><b
                                                                                        style={{
                                                                                            color: 'white',
                                                                                            fontSize: '25px'
                                                                                        }}>Patient for today</b>

                                                                                </span>
                                                                                )
                                                                            }


                                                                        </div>

                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                            <Col lg="3" xs="12" xl="3">
                                                                <Card className="card-plain border-0">
                                                                    <CardHeader style={{backgroundColor: "#455a64"}}
                                                                                className="text-center">
                                                                            <span style={{color: "white"}}>
                                                                                <img src={covid19}
                                                                                     alt="connected users" style={{
                                                                                    maxWidth: '30px',
                                                                                    maxHeight: '30px'
                                                                                }}/>&nbsp;
                                                                                Covid-19 cases</span>
                                                                    </CardHeader>
                                                                    <CardBody style={{
                                                                        backgroundColor: '#546e7a',
                                                                        minHeight: '200px'
                                                                    }}
                                                                              className="text-center">
                                                                        <div>
                                                                                    <span style={{
                                                                                        fontSize: '70px',
                                                                                        color: 'white'
                                                                                    }}>
                                                                                        {this.state.covid19 !== undefined ?
                                                                                            this.state.covid19.Cases
                                                                                            : 'fetching'
                                                                                        }

                                                                                    </span>
                                                                            <br/><b style={{
                                                                            color: 'white',
                                                                            fontSize: '25px'
                                                                        }}>Cases</b>
                                                                        </div>

                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <br/><br/>
                                        <Row>
                                            <Col xs={"12"} md={"12"} xl={"12"}>
                                            <MapForHome/>
                                            &nbsp;&nbsp;
                                            </Col>
                                        </Row>
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

                        <Logs/>
                    </main>
                </>
            )
    }
}

const mapStateToProps = state => {
    console.log(state.UserReducer.covid19);
    const {_id, role, name, email, LoggedIn} = state.UserReducer;
    return {
        user_connected: state.UserReducer.user_connected,
        role: state.UserReducer.role,
        socket: state.root.socket, _id
        , name, email, LoggedIn

    }
};

export default connect(mapStateToProps, null)(Home);
