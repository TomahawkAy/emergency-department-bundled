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
import {Map,  TileLayer} from "react-leaflet";
import Cercle from "../../../assets/js/Cercle";
import RoutingBack from "./RoutingMachineBack";
import {Selected} from "../../../assets/js/mapLayer";

class MapBack extends React.Component{
    state={
        isMapInit: false,
        session: null, _id: ''
    };

    componentDidMount(){
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session, _id: session.user._id});
    }
    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };

    render(){
        const {id} =this.props;
        return(
            <Map className='mapP1' center={[this.props.DriverPos.lat, this.props.DriverPos.lng]}
                 zoom={this.props.zoom} ref={this.saveMap} animate={true}>
                <TileLayer
                    url={Selected}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Cercle map={this.map}
                        pos={[this.props.BasePos.lat, this.props.BasePos.lng]}
                        color={"green"} fillColor={"green"} fillOpacity={0.4} radius={100}/>
                {/*<Marker key={[this.props.BasePos.lat, this.props.BasePos.lng]}*/}
                {/*        position={[this.props.BasePos.lat, this.props.BasePos.lng]} icon={greenIcon}>*/}
                {/*   */}
                {/*    <Popup>*/}
                {/*        <div className='poup-text'>BasePos</div>*/}
                {/*    </Popup>*/}
                {/*</Marker>*/}

                {
                    this.state.isMapInit && this.props.PatientPos.lat &&
                    <RoutingBack
                        id={id}
                        BasePos={this.props.BasePos}
                        DriverPos={this.props.DriverPos}
                        map={this.map}/>
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

    return { socket, PatientPos, ready, DriverPos, BasePos, error, zoom, CurrentWay};
};
export default connect(mapStateToProps, actions)(MapBack);
