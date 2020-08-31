import {MapLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import {withLeaflet} from "react-leaflet";
import axios from "axios";
import {SET_DONE} from "../../../actions/DriverAmbulanceAction";
import {connect} from "react-redux";
import {blueIcon, greenIcon} from "../../../assets/js/leaflet-color-markers";

class RoutingBack extends MapLayer {


    state = {
        klm: null,
        doneklm: null,
        dataLoaded: false,
        session: null, _id: ''
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session, _id: session.user._id});
        axios({
            method: 'get',
            url: `http://localhost:3000/taskD/getOneById/${this.props.id}`,
        }).then((d) => {
            this.setState({klm: d.data.klm, doneklm: d.data.doneklm, dataLoaded: true})
        });
    }

    createLeafletElement() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        const {map, BasePos} = this.props;

        let leafletElement = L.Routing.control({
            position: 'topright',
            waypoints: [
                L.latLng(this.props.DriverPos.lat, this.props.DriverPos.lng),
                L.latLng(BasePos.lat, BasePos.lng),
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
                        icon: blueIcon,
                        draggable:true
                    });
                } else {
                    // here change all the others
                    return L.marker(wp.latLng, {icon: greenIcon})
                    //L.circle(wp.latLng, {radius: 50, color: 'red', fillColor: 'red', fillOpacity: 0.3,})
                }
            }

        }).on('routesfound', (e) => {
            let d=e.routes[0].summary.totalDistance;

            let distance = Math.round(d/100)/10;
            if (this.state.dataLoaded === true && this.state.doneklm === false) {

                axios({
                    method: 'put',
                    url: `http://localhost:3000/taskD/update/klmdone/${this.props.id}`,
                    data: {klm: distance}
                }).then((d) => {
                    this.setState({klm: d.data.klm + distance, doneklm: true, dataLoaded: true,})
                });
            }

            if (d < 50) {
                axios({
                    method: 'put',
                    url: `http://localhost:3000/taskD/getOneById/${this.props.id}`,
                    data: {done: true, currentTask: false}
                }).then((d) => {
                    axios({
                        method: 'put',
                        url: `http://localhost:3000/${session.user._id}`,
                        data: {driverState: false},
                        headers: {
                            token: session.token,
                        }
                    }).then(
                        () => {

                            this.props.SET_DONE();
                            this.setState({klm: d.data.klm + distance, doneklm: true, dataLoaded: true,})
                            this.props.socket.emit("GetAllCurrent")
                            this.props.socket.emit("GetAllDone")
                        }
                    )
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
    SET_DONE
};
const mapStateToProps = state => {
    const {DriverPos} = state.PositionReducer;
    const {socket} = state.root;
    const {done} = state.DriverAmbulanceReducer;
    return {done, DriverPos, socket};
};
export default connect(mapStateToProps, actions)(withLeaflet(RoutingBack));
