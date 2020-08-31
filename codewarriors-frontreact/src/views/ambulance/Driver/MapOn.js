import React from "react";
import {
    GEO_FAILURE,
    GEO_SUCCESS_DRIVER,
    GEO_SUCCESS_PATIENT,
    READY_MAP,
    RESET_MAP
} from "../../../actions/PositionAction";
import {SET_CURRENT_WAY} from "../../../actions/DriverAmbulanceAction";
import {connect} from "react-redux";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {greenIcon} from "../../../assets/js/leaflet-color-markers";
import Cercle from "../../../assets/js/Cercle";
import Routing from "./RoutingMachine";
import {Selected} from "../../../assets/js/mapLayer";

class MapOn extends React.Component {
    state = {
        isMapInit: false,
    }

    componentDidMount() {

    }

    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };

    //
    // <Marker key={[this.props.PatientPos.lat, this.props.PatientPos.lng]}
    //         position={[this.props.PatientPos.lat, this.props.PatientPos.lng]}
    //         icon={redIcon}>
    //
    //     <Popup>
    //         <div className='poup-text'>Patient</div>
    //     </Popup>
    // </Marker>


    render() {
        const {id} = this.props;
        return (
            <Map className='mapP1' center={[this.props.DriverPos.lat, this.props.DriverPos.lng]}
                 zoom={this.props.zoom} ref={this.saveMap} animate={true}>
                <TileLayer
                    url={Selected}

                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <Marker key={[this.props.BasePos.lat, this.props.BasePos.lng]}
                        position={[this.props.BasePos.lat, this.props.BasePos.lng]} icon={greenIcon}>
                    <Cercle map={this.map}
                            pos={[this.props.BasePos.lat, this.props.BasePos.lng]}
                            color={"green"} fillColor={"green"} fillOpacity={0.4} radius={100}/>
                    <Popup>
                        <div className='poup-text'>BasePos</div>
                    </Popup>
                </Marker>

                {
                    this.state.isMapInit && this.props.PatientPos.lat && <>
                        <Routing PatientPos={this.props.PatientPos} id={id} map={this.map}/>
                        <Cercle map={this.map}
                                         pos={[this.props.PatientPos.lat, this.props.PatientPos.lng]}
                                         color={"red"} fillColor={"red"} fillOpacity={0.4} radius={100}/>
                    </>
                }
            </Map>
        )
    }
}


const actions = {
    GEO_SUCCESS_DRIVER, GEO_SUCCESS_PATIENT, GEO_FAILURE, READY_MAP, RESET_MAP, SET_CURRENT_WAY
};
const mapStateToProps = state => {
    const {ready, error, zoom, PatientPos, DriverPos, BasePos} = state.PositionReducer;
    const {CurrentWay} = state.DriverAmbulanceReducer;
    const {socket} = state.root;

    return {socket, PatientPos, ready, DriverPos, BasePos, error, zoom, CurrentWay};
};
export default connect(mapStateToProps, actions)(MapOn);
