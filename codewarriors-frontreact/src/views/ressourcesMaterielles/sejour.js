import FilterResults from 'react-filter-search';
import React from "react";
import './sejour.css'
import axios from "axios";
import AddSejour from "./addSejour";


import {
    Card, CardImg, CardText, CardBody,CardHeader, CardFooter,
    Modal, TextField, CardTitle, CardSubtitle, CardLink, Button, Container, Col,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import {indexOf} from "leaflet/src/core/Util";


class Sejour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            data: [],
            value: ''
        };
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };


    componentDidMount () {
        const script2 = document.createElement("script2");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        const script = document.createElement("script");

        script.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        script.async = true;

        document.body.appendChild(script);
    }
    componentWillMount() {
        fetch('http://localhost:3000/sejour')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
        fetch('http://localhost:3000/autReleaseNurseAndBed')
            .then(response => response.json())
            .then(json => console.log(json));
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/sejour')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }


    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };


    render() {

        const { data, value } = this.state;
        return (
            <>
                <DemoNavbar/>

                <section className="section section-lg section-shaped pb-250">
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
                    </div>
                    <Container className="py-lg-md d-flex">
                        <div className="col px-0">

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
                <div className="container-fluid" >

                    <div className="main">
                   <AddSejour/>
                        <br/>
                        <Col sm="12">
                            <h1 align="center" className="display-4 mb-0">Liste Des Séjours Hospitalier</h1>
                        </Col>
                        <br/>
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input value={value} onChange={this.handleChange} type="text" className="form-control" placeholder="Search"/>
                        </div>

                    </div>

                    <FilterResults
                        value={value}
                        data={data}
                        renderResults={results => (
                            <div className="cadreCartes">
                                {results.map(el => (
                                    <div className="cadreCarte" key={el._id}>
                                        <br/>

                                        <Card className="card bg-gradient-white text-white"  >
                                              <CardHeader className="text-center" tag="h4"><i className="fa fa-procedures ni-2x"></i> <b>Numéro De Lit: {el.lit[0].num_lit}</b></CardHeader>
                                            <CardHeader tag="h5"><b>Patient En Cours: {el.patient[0].name}</b> <Button
                                                color="info"
                                                onClick={() => this.toggleModal("notificationModal")}
                                            >
                                                <i className='fas fa-head-side-mask ni-2x'></i> Détails Patient
                                            </Button> </CardHeader>
                                            <CardHeader tag="h5"><b>Infirmière Affecté: {el.nurse[0].name}</b> <Button
                                                    color="danger"
                                                    onClick={() => this.toggleModal("notificationModal2")}
                                                >
                                                <i className="fas fa-user-nurse ni-2x"> </i> Détails Inférmiére
                                                </Button> </CardHeader>
                                            <CardBody className="cardBack">
                                                <CardTitle className="text-center text-green" tag="h5"><b><i className="far fa-calendar-alt ni-1x"></i> Debut Séjour: {el.date_debut.substring(0,10)}</b> <b>Temps: {el.date_debut.substring(11,19)} </b></CardTitle>
                                                <CardTitle className="text-center text-danger" tag="h5"><b><i className="far fa-calendar-alt ni-1x"></i> Fin Séjour: {el.date_fin.substring(0,10)}</b> <b>Temps: {el.date_fin.substring(11,19)} </b></CardTitle>

                                                <Modal
                                                    className="modal-dialog-centered modal-danger"
                                                    contentClassName="bg-gradient-info"
                                                    isOpen={this.state.notificationModal}
                                                    toggle={() => this.toggleModal("notificationModal")}
                                                >
                                                    <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-notification">
                                                            <i className='fas fa-head-side-mask ni-2x'></i>    Détails Du Patient
                                                        </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("notificationModal")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="py-3 text-center">
                                                            <i className="fas fa-id-card-alt ni-2x"></i>
                                                            <h4 className="heading mt-4">Nom Du Patient: {el.patient[0].name}</h4>
                                                            <h4 className="heading mt-4">Email Du Patient: {el.patient[0].email}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                            className="text-white ml-auto"
                                                            color="link"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("notificationModal")}
                                                        >
                                                            Fermer
                                                        </Button>
                                                    </div>
                                                </Modal>
                                                <Modal
                                                    className="modal-dialog-centered modal-danger"
                                                    contentClassName="bg-gradient-danger"
                                                    isOpen={this.state.notificationModal2}
                                                    toggle={() => this.toggleModal("notificationModal2")}
                                                >
                                                    <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-notification">
                                                            <i className="fas fa-user-nurse ni-2x"> </i>   Détails De L'inférmiére
                                                        </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("notificationModal2")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="py-3 text-center">
                                                            <i className="fas fa-id-card ni-2x "></i>
                                                            <h4 className="heading mt-4">Nom De L'Inférmiére: {el.nurse[0].name}</h4>
                                                            <h4 className="heading mt-4">Email De L'Inférmiére: {el.nurse[0].email}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                            className="text-white ml-auto"
                                                            color="link"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("notificationModal2")}
                                                        >
                                                            Fermer
                                                        </Button>
                                                    </div>
                                                </Modal>
                                            </CardBody>
                                            <CardFooter tag="h5" className="text-center"><b><i
                                                className='fas fa-hourglass-half ni-1x'></i> Jours Restants: {String(((new Date(el.date_fin).getTime())-(new Date().getTime()))/ (1000 * 3600 * 24)).substring(0,String(((new Date(el.date_fin).getTime())-(new Date().getTime()))/ (1000 * 3600 * 24)).indexOf("."))} <i
                                                className='fas fa-clock ni-1x'></i> Heures Restantes: {String(((new Date(el.date_fin).getTime())-(new Date().getTime()))/ (1000 * 3600)).substring(0,String(((new Date(el.date_fin).getTime())-(new Date().getTime()))/ (1000 * 3600)).indexOf("."))}</b></CardFooter>

                                        </Card>

                                    </div>

                                ))}
                            </div>

                        )}
                    />
                </div>

                <CardsFooter/>

            </>
        );
    }
}


export default Sejour ;
