import React from 'react';
import axios from "axios";
import {Button, Modal} from "reactstrap";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import './map1css.css';
import {connect} from "react-redux";
import moment from 'moment';
import { redIcon} from "../../../assets/js/leaflet-color-markers";
import Cercle from "../../../assets/js/Cercle";
import {Selected} from "../../../assets/js/mapLayer"

class GetInfo extends React.Component {
    state = {
        data: null,
        type: null,
        id: null,
        verif: true,
        isMapInit: false,
    }
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };



    componentDidMount() {
        this.setState({type: this.props.type, id: this.props.id})
        // if (this.props.type === 'map' && this.props.LoggedIn) {
        //     this.props.socket.on('PositionInfo', (d) => {
        //         this.setState({data: d.data, verif: false})
        //     });
        // }
    }
    GetLocation = () => {
        axios({
            method: 'get',
            url: `http://localhost:3000/Coordinate/Coordinate/${this.state.id}`,
        }).then((d) => {
            this.setState({data: d.data, verif: false})

        }).catch(error => console.log(error));


        //this.props.socket.emit("PositionInfo", {id: this.state.id});
    };
    GetUser = () => {
        let session=JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.state.id);
        console.log(session);
        axios({
            method: 'get',
            url: `http://localhost:3000/${this.state.id}`,
            headers: {
                token: session.token
            }
        }).then((d) => {
            this.setState({data: d.data, verif: false})

        }).catch(error => console.log(error));
    };

    GetNBTasks = () => {
        let session=JSON.parse(localStorage.getItem('currentUser'));
        let today = moment();
        console.log(today.format('YYYY-MM-DD'));
        axios({
            method: 'get',
            url: `http://localhost:3000/taskD/getOneBy/IdAndDate/${this.state.id}/${today.format('YYYY-MM-DD')}`,
            headers: {
                token: session.token
            }
        }).then((d) => {
            console.log(d);
            console.log(d.data.length);
            this.setState({data: d.data, verif: false})
        }).catch(error => console.log(error));
    }
    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };

    componentWillUnmount() {
        this.setState({isMapInit: false})
    }

    render() {

        switch (this.state.type) {
            case 'taskNB': {
                if (this.state.verif) {
                    this.GetNBTasks();
                }
                return (
                    this.state.data && <>
                        {this.state.data.length}
                    </>
                )
            }
            case 'map': {
                if (this.state.verif) {
                    this.GetLocation();
                }
                return (
                    this.state.data && <>
                        {this.state.data.address.state} : {this.state.data.address.state_district}<br/>
                        {this.state.data.address.suburb}, {this.state.data.address.county}<br/>
                        <Button size="sm" onClick={() => this.toggleModal("defaultModal")}>
                            GO MAP
                        </Button>
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.defaultModal}
                            toggle={() => this.toggleModal("defaultModal")}
                        >
                            <div className="modal-header">
                                <h6 className="modal-title" id="modal-title-default">
                                    Live MAP
                                </h6>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <Map className="mapN1" center={[this.state.data.lat, this.state.data.lon]} zoom={16} ref={this.saveMap}>
                                    <TileLayer
                                        url={Selected}
                                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    />
                                    {this.state.isMapInit &&
                                    <Marker key={[this.state.data.lat, this.state.data.lon]}
                                            position={[this.state.data.lat, this.state.data.lon]}
                                            icon={redIcon}>
                                        <Cercle map={this.map} pos={[this.state.data.lat, this.state.data.lon]}
                                                color={"red"} fillColor={"red"} fillOpacity={0.4} radius={50}/>
                                        <Popup>
                                            <div className='poup-text'>
                                                {this.state.data.display_name}
                                            </div>
                                        </Popup>
                                    </Marker>
                                    }
                                </Map>

                            </div>
                            <div className="modal-footer">
                                <Button
                                    className="ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("defaultModal")}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
                    </>
                )
            }
            case "Driver":
            case "Nurce":
            case "Caller": {
                if (this.state.verif) {
                    this.GetUser();
                }
                return this.state.data && <>{this.state.data.name} <br/>
                    <Button size="sm" onClick={() => this.toggleModal("defaultxModal")}>
                        More
                    </Button>
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultxModal}
                        toggle={() => this.toggleModal("defaultxModal")}
                    >
                        <div className="modal-header">
                            <h6 className="modal-title " id="modal-title-default">
                                {this.state.type} InFo
                            </h6>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultxModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-borderless table-light" style={{textAlign: "center"}}>
                                <tbody>
                                <tr>
                                    <td className="text-blue">CIN</td>
                                    <td>{this.state.data.cin}</td>
                                </tr>
                                <tr>
                                    <td className="text-blue">First Name</td>
                                    <td>{this.state.data.name}</td>
                                </tr>
                                <tr>
                                    <td className="text-blue">Last Name</td>
                                    <td>{this.state.data.lastName}</td>
                                </tr>
                                <tr>
                                    <td className="text-blue">Phone Number</td>
                                    <td>{this.state.data.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td className="text-blue">E-mail</td>
                                    <td>{this.state.data.email}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultxModal")}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>

                </>
            }
            default:
                return <>Loding </>
        }

    }


}

const mapStateToProps = state => {
    const {socket} = state.root;
    return {socket};
};
export default connect(mapStateToProps, null)(GetInfo);

