import React from "react";
import {GEO_FAILURE, GEO_SUCCESS_DRIVER, GEO_SUCCESS_PATIENT, READY_MAP} from "../../../actions/PositionAction";
import {connect} from "react-redux";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {blueIcon, greenIcon, redIcon} from "../../../assets/js/leaflet-color-markers";
import Cercle from "../../../assets/js/Cercle";
import Label from "reactstrap/es/Label";
import {Selected} from "../../../assets/js/mapLayer";


class MapCenterDriver extends React.Component {
    state = {
        isMapInit: false,
        taskData:null,
    };

    componentDidMount() {

    }

    componentWillMount() {
        this.setState({ taskData: this.props.taskData})
    }
    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };
    render() {
        const PatientPos = [this.props.PatientPos.lat, this.props.PatientPos.lng];
        const BasePos = [this.props.BasePos.lat, this.props.BasePos.lng];

        return (
             this.props.ready ? (
                    <Map className='mapP1' center={[this.props.DriverPos.lat, this.props.DriverPos.lng]} zoom={this.props.zoom}
                         ref={this.saveMap}>
                        <TileLayer
                            url={Selected}

                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker key={PatientPos} position={PatientPos} icon={redIcon}>
                            <Cercle map={this.map} pos={PatientPos}
                                    color={"red"} fillColor={"red"} fillOpacity={0.4} radius={100}/>
                            <Popup>
                                <div className='poup-text'>Your Position</div>
                            </Popup>
                        </Marker>
                        <Marker key={[this.props.DriverPos.lat, this.props.DriverPos.lng]} position={[this.props.DriverPos.lat, this.props.DriverPos.lng]} icon={blueIcon}>
                            <Cercle map={this.map} pos={[this.props.DriverPos.lat, this.props.DriverPos.lng]}
                                    color={"blue"} fillColor={"blue"} fillOpacity={0.4} radius={100}/>
                            <Popup>
                                <div className='poup-text'>Your Position</div>
                            </Popup>
                        </Marker>
                        <Marker key={BasePos} position={BasePos} icon={greenIcon}>
                            <Popup>
                                <div className='poup-text'>BasePos</div>
                            </Popup>
                        </Marker>
                    </Map>
                ) : (
                    <Label>Loding</Label>
                )

        )
    }
}
const actions = {
    GEO_SUCCESS_DRIVER, GEO_SUCCESS_PATIENT, GEO_FAILURE, READY_MAP
};
const mapStateToProps = state => {
    const {ready, error, isMapInit, zoom, PatientPos, DriverPos, BasePos} = state.PositionReducer;
    const {socket} = state.root;
    return { ready, error, isMapInit, zoom, PatientPos, socket, DriverPos, BasePos};
};
export default connect(mapStateToProps, actions)(MapCenterDriver);



