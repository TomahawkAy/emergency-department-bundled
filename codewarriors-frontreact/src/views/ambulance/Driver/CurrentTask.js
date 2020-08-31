import React from 'react'
import {connect} from "react-redux";
import {
    GEO_FAILURE,
    GEO_SUCCESS_DRIVER,
    GEO_SUCCESS_PATIENT,
    READY_MAP,
    RESET_MAP,
} from "../../../actions/PositionAction";
import {SET_CURRENT_WAY} from "../../../actions/DriverAmbulanceAction";
import MapOn from "./MapOn";
import MapBack from "./MapBack";


class CurrentTask extends React.Component {

    state = {
        session: null, _id: ''
    };

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session, _id: session.user._id});
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailure, {
            /* enableHighAccuracy ==> true  for  GPS   -- false for WIFI position */
            enableHighAccuracy: true,
            /* maximun  for    retruving error  location .. */
            timeOut: 10000,
            /*  period  between  retriving position  even  if changed    period respected ==>   0  for   real time  position  */
            maximumAge: 5000
        });
        this.WATCH_POSITION();
    }

    componentWillUnmount() {
        this.setState({isMapInit: false})
    }


    geoSuccess = (position) => {
        this.props.socket.emit("PositionChange", {
            id: this.state._id, coord: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });

        this.props.GEO_SUCCESS_DRIVER({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        this.props.READY_MAP();
        this.props.socket.emit("MyPosChange");
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


    //  getDistance=(lo1, la1,lo2,la2)=> {
    //     // return distance in meters
    //     var lon1 = this.toRadian(lo1),
    //         lat1 = this.toRadian(la1),
    //         lon2 = this.toRadian(lo2),
    //         lat2 = this.toRadian(la2);
    //
    //     var deltaLat = lat2 - lat1;
    //     var deltaLon = lon2 - lon1;
    //
    //     var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    //     var c = 2 * Math.asin(Math.sqrt(a));
    //     var EARTH_RADIUS = 6371;
    //     return  Math.trunc(c * EARTH_RADIUS * 1000);
    // }
    //  toRadian=(degree) =>{
    //     return degree*Math.PI/180;
    // }
    // degreesToRadians=(degrees)=>{
    //     return degrees * Math.PI / 180;
    // }
    //  haversine_distance=(lng1 , lat1,lng2 ,lat2)=> {
    //     let R = 6378137; // Radius of the Earth in miles
    //      let dLat = this.degreesToRadians(lat2 - lat1);
    //      let dLong = this.degreesToRadians(lng2 - lng1);
    //      let a = Math.sin(dLat / 2)
    //          *
    //          Math.sin(dLat / 2)
    //          +
    //          Math.cos(this.degreesToRadians(lat1))
    //          *
    //          Math.cos(this.degreesToRadians(lat1))
    //          *
    //          Math.sin(dLong / 2)
    //          *
    //          Math.sin(dLong / 2);
    //
    //      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //      let distance = R * c;
    //
    //      return distance;
    // }

    //<Button className="btn-1 ml-1" color="danger" outline type="button" onClick={() => {this.props.socket.emit("MyPosChange");this.props.GEO_SUCCESS_DRIVER({latitude: 34.796508, longitude: 10.711929,});}}>change 1 </Button>
    render() {
        const {id} = this.props;
        return (this.props.ready ? <>

                {
                    this.props.CurrentWay === "OnWay" ?
                        <MapOn id={id}/>
                        :
                        <MapBack id={id}/>
                }

            </> : <>LoaDing</>
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
export default connect(mapStateToProps, actions)(CurrentTask);
