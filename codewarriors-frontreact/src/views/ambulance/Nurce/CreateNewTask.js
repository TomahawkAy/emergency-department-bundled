import React from "react";
import {connect} from "react-redux";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import CardsFooter from "../../../components/Footers/CardsFooter";
import classnames from "classnames";
import {Link} from "react-router-dom";
import axios from "axios";
import {GEO_FAILURE, READY_MAP} from "../../../actions/PositionAction";
import {SET_SEARCH_DATA, SET_COORD,SET_TASK_ID_CHOOSED} from "../../../actions/NurceAmbulanceAction";
import {Map, Marker, TileLayer} from "react-leaflet";
import {Selected} from "../../../assets/js/mapLayer";
import {greenIcon} from "../../../assets/js/leaflet-color-markers";
import Cercle from "../../../assets/js/Cercle";
import {Combobox} from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

class CreateNewTask extends React.Component {


    state = {
        callerid: null,
        session:null,
        _id:'',
        assignToCaller: false,
        callerinfo: null,
        caller: null,
        newpos: null,
        taskid:null,
        posSetted: null,
        phaseNumber: 1,
        cin: null,
        cinSetted: false,
        formclassCin: "",
        formclassinfo: "",
        inputclassinfo: "",
        inputclassCin: "",
        next: false,
        nextbtn: false,
        isMapInit: false,
    }


    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session, _id: session.user._id});
        this.timer();
    }

    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };
    timer = () => {

        setTimeout(() => {
            let session=JSON.parse(localStorage.getItem('currentUser'));
            if (this.state.assignToCaller === true) {
                if (this.state.cin && this.state.cin.length === 8) {
                    this.setState({inputclassCin: "is-valid", formclassCin: "has-success"});
                    axios({
                        method: 'get',
                        url: `http://localhost:3000/GetOneBy/CIN/${this.state.cin}`,
                        headers: {
                            token: session.token
                        }
                    }).then((d) => {
                        if (d.data) {
                            let info = d.data.lastName ? `${d.data.role} :  ${d.data.name}  ${d.data.lastName}` : `${d.data.role} :  ${d.data.name}`;
                            this.setState({
                                caller: d.data,
                                callerinfo: info,
                                inputclassinfo: "is-valid",
                                formclassinfo: "has-success",
                                nextbtn: false
                            })
                        } else {
                            this.setState({
                                caller: null,
                                callerinfo: "No Patient Found",
                                inputclassinfo: "is-invalid",
                                formclassinfo: "has-danger",
                                nextbtn: true
                            })
                        }
                    });
                } else {
                    this.setState({
                        inputclassCin: "is-invalid",
                        formclassCin: "has-danger",
                        caller: null,
                        callerinfo: "",
                        inputclassinfo: "is-invalid",
                        formclassinfo: "has-danger",
                        nextbtn: true
                    })
                }
            }
            if (this.state.next === false) {
                this.timer()
            }

        }, 500)


    };
    onDragEnd = (e) => {
        this.props.SET_COORD({
            latitude: e.target._latlng.lat,
            longitude: e.target._latlng.lng,
        })

    }


    render() {
        return (<>
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
                            <span/>
                            <span/>
                        </div>
                        <Container className="py-lg-md d-flex">
                            <div className="col px-0">

                            </div>
                        </Container>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1"
                                 viewBox="0 0 2560 100" x="0" y="0">
                                <polygon className="fill-white" points="2560 0 2560 100 0 100"/>
                            </svg>
                        </div>
                    </section>
                    {/* 1st Hero Variation */}
                </div>
                <div className="  justify-content-center">
                    <br/>
                    <Row className="justify-content-center ">

                        <Col lg="8">
                            <Card className="bg-gradient-secondary shadow">
                                {this.state.phaseNumber === 1 && <CardBody className="p-lg-5">
                                    <h4 className="mb-1">New task</h4>
                                    <FormGroup
                                        className={classnames("mt-5", {
                                            focused: this.state.nameFocused
                                        })}
                                    >
                                        <div className="col">
                                            <div className="custom-control custom-radio ">
                                                <input
                                                    className="custom-control-input"
                                                    defaultChecked
                                                    id="customRadio1"
                                                    name="custom-radio-1"
                                                    type="radio"
                                                    onClick={() => {
                                                        this.setState({assignToCaller: false, nextbtn: false})
                                                    }}
                                                />
                                                <label className="custom-control-label" htmlFor="customRadio1">
                                                    <span>Assign  task to Your Account</span>
                                                </label>
                                            </div>
                                            <br/>
                                            <div className="custom-control custom-radio ">
                                                <input
                                                    className="custom-control-input"

                                                    id="customRadio2"
                                                    name="custom-radio-1"
                                                    type="radio"
                                                    onClick={() => {
                                                        this.setState({assignToCaller: true, nextbtn: true})
                                                    }}
                                                />
                                                <label className="custom-control-label" htmlFor="customRadio2">
                                                    <span>Assign  task to Caller </span>
                                                </label>
                                            </div>
                                        </div>
                                        <br/>
                                        {this.state.assignToCaller && <>
                                            <div className="row">
                                                <div className="col-4">
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend"
                                                                         className={this.state.formclassCin}>
                                                            <InputGroupText>
                                                                <i className="ni ni-zoom-split-in"/>
                                                                {/*<i className="ni ni-pin-3"/>*/}
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className={this.state.inputclassCin}
                                                            value={this.state.cin}
                                                            placeholder="CIN"
                                                            type="number"
                                                            onChange={(e) => {
                                                                this.setState({cin: e.target.value})
                                                            }}
                                                        />
                                                    </InputGroup>
                                                </div>
                                                <div className="col">
                                                    <InputGroup className={this.state.formclassinfo}>
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>
                                                                <i className="ni ni-single-02"/>
                                                                {/*<i className="ni ni-pin-3"/>*/}
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className={this.state.inputclassinfo}
                                                            placeholder="Caller First/Last Name"
                                                            type="text"
                                                            Disabled="true"
                                                            value={this.state.callerinfo}
                                                        />
                                                    </InputGroup>
                                                </div>

                                            </div>
                                        </>}

                                    </FormGroup>
                                    <div className="row ">
                                        <div className="col-3">
                                            <Button disabled={this.state.nextbtn} className="btn-round" color="default"
                                                    size="lg" type="button"
                                                    onClick={() => {
                                                        let session = JSON.parse(localStorage.getItem('currentUser'));
                                                        if (this.state.assignToCaller === true) {
                                                            this.setState({
                                                                next: true,
                                                                nextbtn: true,
                                                                phaseNumber: 2,
                                                                callerid: this.state.caller._id
                                                            })
                                                        }
                                                        else{
                                                            this.setState({
                                                                next: true,
                                                                nextbtn: true,
                                                                phaseNumber: 2,
                                                                callerid: session.user._id
                                                            })
                                                        }
                                                    }}>Next</Button>
                                        </div>

                                        <div className="col-3">
                                            <Button className="btn-white" color="default" type="button"
                                                    to="/ambulancenurce-page" tag={Link}>Cancel </Button>
                                        </div>
                                    </div>

                                </CardBody>}

                                {this.state.phaseNumber === 2 && <CardBody className="p-lg-5">
                                    <h4 className="mb-1">Select Location</h4>


                                    <Combobox
                                        data={this.props.searchData}
                                        onChange={(e) => {
                                            axios({
                                                method: 'get',
                                                url: `https://nominatim.openstreetmap.org/search?format=json&limit=60&q=${e}`,
                                            }).then((d) => {
                                                this.props.SET_SEARCH_DATA({searchData: d.data})
                                            });
                                        }}
                                        onSelect={(e) => {
                                            this.props.SET_COORD({
                                                latitude: e.lat,
                                                longitude: e.lon
                                            })
                                        }}
                                        textField='display_name'
                                        caseSensitive={false}
                                        filter='contains'
                                    />


                                    <Map className='mapN3' center={[this.props.coord.lat, this.props.coord.lng]}
                                         zoom={this.props.zoom} ref={this.saveMap} animate={true}>

                                        <TileLayer
                                            url={Selected}
                                        />


                                        <Marker key={[this.props.coord.lat, this.props.coord.lng]}
                                                position={[this.props.coord.lat, this.props.coord.lng]}
                                                draggable="true" ondragend={this.onDragEnd} icon={greenIcon}>
                                            <Cercle map={this.map}
                                                    pos={[this.props.coord.lat, this.props.coord.lng]}
                                                    color={"green"} fillColor={"green"} fillOpacity={0.4} radius={100}/>
                                        </Marker>
                                    </Map>
                                    <br/>

                                    <div className="row ">
                                        <div className="col-3">
                                            <Button className="btn-round" color="default"
                                                    size="lg" type="button"
                                                    onClick={() => {

                                                        axios.post(`http://localhost:3000/taskD/getAll`, {
                                                            user: this.state.callerid,
                                                        }).then((response) => {
                                                            this.props.SET_TASK_ID_CHOOSED({id: response.data._id});
                                                            axios.post(`http://localhost:3000/Coordinate/StartPos/${response.data._id}`, {
                                                                latitude: this.props.BasePos.lat,
                                                                longitude: this.props.BasePos.lng,
                                                            }).then(
                                                                () => {
                                                                    axios.post(`http://localhost:3000/Coordinate/EndPos/${response.data._id}`, {
                                                                        latitude: this.props.coord.lat,
                                                                        longitude: this.props.coord.lng,
                                                                    }).then(() => {
                                                                        this.props.socket.emit("GetAllWait")
                                                                        this.setState({next: true, nextbtn: true, phaseNumber: 3})
                                                                    })
                                                                }
                                                            )
                                                        }).catch(error => console.log(error));
                                                    }}>Next</Button>
                                        </div>

                                        <div className="col-3">
                                            <Button className="btn-white" color="default" type="button"
                                                    to="/ambulancenurce-page" tag={Link}>Cancel </Button>
                                        </div>
                                    </div>
                                </CardBody>}

                                {this.state.phaseNumber === 3 && <CardBody className="p-lg-5">
                                    <h4 className="mb-1">New task</h4>

                                    <Button
                                        className="btn-primary"
                                        color="info"
                                        to="/driverpick-page" tag={Link}><span
                                        className="nav-link-inner--text ml-1">Choose Driver and start task</span>
                                    </Button>
                                </CardBody>}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </main>
            <CardsFooter/>
        </>);
    }
}

const actions = {
    GEO_FAILURE, READY_MAP, SET_COORD, SET_SEARCH_DATA,SET_TASK_ID_CHOOSED
}
const mapStateToProps = state => {
    const {ready, error, zoom,BasePos} = state.PositionReducer;
    const {socket} = state.root;
    const {coord, searchData} = state.NurceAmbulanceReducer;
    return {socket, coord, ready, error, zoom, searchData,BasePos};
}
export default connect(mapStateToProps, actions)(CreateNewTask);
