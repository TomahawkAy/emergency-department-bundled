import FilterResults from 'react-filter-search';
import React from "react";
import './pharmacie.css'
import Modals from './addMedicament'
import AugmenterQuantite from "./augmenterQuantite";
import axios from "axios";
import connect from "react-redux/lib/connect/connect";
import { Card, CardImg, CardText, CardBody,
    Modal,TextField,CardTitle, CardSubtitle, CardLink,Button,Container,} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";

class PharmacieInterne extends React.Component {
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
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        script.async = true;

        document.body.appendChild(script);

        const script2 = document.createElement("script2");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        fetch('http://localhost:3000/medicament')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/medicament')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    handleDelete = (idMed) => {
            axios.delete('http://localhost:3000/medicament/' + idMed).then(
                response => console.log(response)
            )


    }
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
                <div className="container" align="center">
                    <br/>

                    <h1 className="display-4 mb-0">Liste Des Médicaments Dans La Pharmacie Interne</h1>
                    <div className="main">
                    < Modals />
                        <br/>
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input value={value} onChange={this.handleChange} type="text" className="form-control" placeholder="Search"/>
                        </div>

                    </div>
                    <div className="col-9">
                    <FilterResults
                        value={value}
                        data={data}
                        renderResults={results => (
                            <div>
                                {results.map(el => (
                                    <div key={el._id}>
                                        <br/>
                                        <Card className="card bg-white border-info text-blue" >
                                            <CardBody>
                                                <CardTitle><b> <i className="fas fa-file-medical ni-2x"></i> Référence Médicament: {el.ref_med} </b></CardTitle>
                                                <CardTitle><b> <i className="fas fa-pills ni-2x"> </i> Nom Médicament: {el.nom_med} </b></CardTitle>
                                                <CardTitle><b> <i className="fas fa-first-aid ni-2x"> </i> Quantité Médicament: {el.quantite_med} </b></CardTitle>
                                            <img width="8%" height="10%" src={require("assets/img/pharmacie.png")} alt="Card image cap" />
                                            <br/>
                                                <br/>
                                                <CardTitle><b><i className="fas fa-calendar-alt ni-2x"></i> Date Entrée Médicament: {el.date_entree.substring(0,10)}</b> Temps: <b>{el.date_entree.substring(11,19)} </b>
                                                </CardTitle>

                                                    <Button
                                                        color="danger"
                                                        onClick={() => this.toggleModal("notificationModal")}
                                                    >
                                                        <svg className="bi bi-x-circle" width="1.3em" height="1.3em"
                                                             viewBox="0 0 16 16" fill="currentColor"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                                                                  clip-rule="evenodd"/>
                                                        </svg> Supprimer
                                                    </Button>
                                                    <Modal
                                                        className="modal-dialog-centered modal-danger"
                                                        contentClassName="bg-gradient-danger"
                                                        isOpen={this.state.notificationModal}
                                                        toggle={() => this.toggleModal("notificationModal")}
                                                    >
                                                        <div className="modal-header">
                                                            <h6 className="modal-title" id="modal-title-notification">
                                                                Votre attention est requise
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
                                                                <i className="ni ni-ambulance ni-3x" />
                                                                <h4 className="heading mt-4">voulez vous vraiment supprimer ce médicament ?</h4>

                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <Button
                                                                onClick={() =>this.handleDelete(el._id)}
                                                                className="btn-white" color="default" type="button">
                                                                Confirmer La Suppression
                                                            </Button>
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

                                                < AugmenterQuantite idMed={el._id} />
                                            </CardBody>
                                        </Card>
                                    </div>

                                ))}
                            </div>

                        )}
                    />
                </div>
                </div>
                <CardsFooter/>
            </>
        );
    }
}
export default PharmacieInterne ;
