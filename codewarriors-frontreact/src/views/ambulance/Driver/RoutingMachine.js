import {MapLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import {withLeaflet} from "react-leaflet";
import axios from "axios";
import {SET_CURRENT_WAY} from "../../../actions/DriverAmbulanceAction";
import {connect} from "react-redux";
import {blueIcon, redIcon} from "../../../assets/js/leaflet-color-markers";

class Routing extends MapLayer {


    state = {
        klm: null,
        doneklm: null,
        dataLoaded: false,
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:3000/taskD/getOneById/${this.props.id}`,
        }).then((d) => {
            this.setState({klm: d.data.klm, doneklm: d.data.doneklm, dataLoaded: true})
        });
    }

    createLeafletElement() {
        const {map, PatientPos} = this.props;

        let leafletElement = L.Routing.control({
            position: 'topright',
            waypoints: [
                L.latLng(this.props.DriverPos.lat, this.props.DriverPos.lng),
                L.latLng(PatientPos.lat, PatientPos.lng),
            ],
            lineOptions: {
                styles: [{color: 'red', opacity: 0.8, weight: 4}]
            },
            addWaypoints: false,
            collapsible: true,
            draggableWaypoints: true,
            summaryTemplate: '<h2>Your Location: {name}</h2><h3>Distance: {distance} | Time : {time}</h3>',
            units: 'metric', //imperial
            unitNames: {
                meters: 'm',
                kilometers: 'km',
                yards: 'yd',
                miles: 'mi',
                hours: 'h',
                minutes: 'mín',
                seconds: 's'
            },
            language: 'en',
            createMarker: function (i, wp, nWps) {
                // || i === nWps - 1
                if (i === 0) {
                    // here change the starting and ending icons
                    return L.marker(wp.latLng, {
                        icon: blueIcon, // here pass the custom marker icon instance
                        draggable:true

                    });
                } else {
                    // here change all the others
                    return  L.marker(wp.latLng, {icon: redIcon})
                    //L.circle(wp.latLng, {radius: 50, color: 'red', fillColor: 'red', fillOpacity: 0.3,})
                }
            }
        }).on('routesfound', (e) => {
            let d=e.routes[0].summary.totalDistance;
            let distance = Math.round(d/100)/10;
            if (this.state.dataLoaded === true && this.state.klm === 0) {
                axios({
                    method: 'put',
                    url: `http://localhost:3000/taskD/getOneById/${this.props.id}`,
                    data: {klm: distance}
                }).then((d) => {
                    this.setState({klm: distance, doneklm: false, dataLoaded: true,})
                });
            }
            if (d < 50) {
                axios({
                    method: 'put',
                    url: `http://localhost:3000/taskD/getOneById/${this.props.id}`,
                    data: {CurrentWay: "WayBack"}
                }).then((d) => {

                    this.props.SET_CURRENT_WAY({CurrentWay: "WayBack"});
                    this.setState({klm: d.data.klm, doneklm: false, dataLoaded: true})
                    this.props.socket.emit("GetAllCurrent")
                });
            }
        }).addTo(map.leafletElement);


        this.props.socket.on('MyPosChange', () => {
            leafletElement.getRouter().options.waypoints[0].lat = this.props.DriverPos.lat;
            leafletElement.getRouter().options.waypoints[0].lng = this.props.DriverPos.lng;
            leafletElement.route();
        });

        return leafletElement.getPlan();

    }


}


const actions = {
    SET_CURRENT_WAY
};
const mapStateToProps = state => {
    const {DriverPos} = state.PositionReducer;
    const {socket} = state.root;
    const {CurrentWay} = state.DriverAmbulanceReducer;
    return {CurrentWay, DriverPos, socket};
};
export default connect(mapStateToProps, actions)(withLeaflet(Routing));
