import React from "react";
import {connect} from "react-redux";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {greenIcon} from "../../../assets/js/leaflet-color-markers";
import Cercle from "../../../assets/js/Cercle";
import {Selected} from "../../../assets/js/mapLayer";
import {Button, Col, Container, DropdownItem, Row} from "reactstrap";
import './map1css.css'
import {Link} from "react-router-dom";

class MapForHome extends React.Component {
    state = {
        isMapInit: false,
    }

    componentDidMount() {

    }

    saveMap = map => {
        this.map = map;
        this.setState({isMapInit: true})
    };


    render() {
        return (
            <section className="section section-shaped">
                <div className="shape shape-style-1 shape-default">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <Container className="py--1">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-6 col-lg-6 col-md-10 col-sm-10    mb-lg-4">
                            <h1 className="text-white font-weight-light">
                                Hospital Location
                            </h1>
                            <p className="lead text-white mt-4">
                                some information about ... i don't know what to write here ....
                            </p>
                        </div>
                        <div className=" col-xl-4 col-lg-4 col-md-8 col-sm-8    mb-auto" >
                            <Map className='mapH1' center={[this.props.BasePos.lat, this.props.BasePos.lng]}
                                 zoom={this.props.zoom} ref={this.saveMap} animate={true}>
                                <TileLayer url={Selected} attribution="Mahjoub"/>
                                <Marker key={[this.props.BasePos.lat, this.props.BasePos.lng]}
                                        position={[this.props.BasePos.lat, this.props.BasePos.lng]} icon={greenIcon}>
                                    <Cercle map={this.map}
                                            pos={[this.props.BasePos.lat, this.props.BasePos.lng]}
                                            color={"green"} fillColor={"green"} fillOpacity={0.4} radius={100}/>
                                    <Popup>
                                        <div className='poup-text'>Hospital</div>
                                    </Popup>
                                </Marker>
                            </Map>
                            <Button
                                className="btn-white mt-4 center"
                                color="default"
                                to="/ambulancepatient-page" tag={Link}
                            >
                                Need An Ambulance
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>
        )
    }
}

const mapStateToProps = state => {
    const {zoom, BasePos} = state.PositionReducer;

    return {BasePos, zoom};
};
export default connect(mapStateToProps, null)(MapForHome);
