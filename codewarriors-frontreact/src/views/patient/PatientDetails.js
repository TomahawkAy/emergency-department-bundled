import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button, Modal} from "reactstrap";
import {connect} from "react-redux";

class PatientDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            patient: {},
            listRdv: [],
            session: null

        }


    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session});

        axios.get(`http://localhost:3000/findById/${this.props.match.params.idPatient}`).then(
            res => {
                this.setState({
                    patient: res.data[0],
                })
            }
        ).catch(err => console.log(err))

        axios.get(`http://localhost:3000/findRdvByPatient/${this.props.match.params.idPatient}`).then(
            res => {
                this.setState({
                    listRdv: res.data,
                })
            }
        ).catch(err => console.log(err))

        axios.get(`http://localhost:3000/getDoctors`).then(
            res => {
                //console.log("doctors= ",res.data)
                this.setState({
                    doctors: res.data
                })
            }
        ).catch(err => console.log(err))



    }


    state = {};
    toggleModal = (state, myid,idRDV) => {
        this.setState({
            [state]: !this.state[state]
        });

        if (myid) {
            axios.get(`http://localhost:3000/findById/${myid}`).then(
                res => {
                    this.setState({
                        doctor: res.data[0],
                    })
                }
            ).catch(err => console.log(err))

        }
        if(idRDV){
            console.log(idRDV)
            axios.delete(`http://localhost:3000/deleteRDV/${idRDV}`).catch(err=>console.log(err))

        }


    };



    render() {
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative my-header-navbar">
                        {/* shape Hero */}
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

                        </section>
                        {/* 1st Hero Variation */}
                    </div>
                    <div align="center">

                        <div className="container">
                            <div className="col-xs-12">


                            </div>
                        </div>


                    </div>

                </main>

                <div className="infos-section">
                    <div className="infos-content">

                        <p>
                            <span>Prénom et Nom:  </span>{this.state.patient ? this.state.patient.name : ''} {this.state.patient ? this.state.patient.lastName : ''}
                        </p>
                        <p><span> Cin: </span>{this.state.patient ? this.state.patient.cin : ''}</p>
                        <p><span> Description: </span>{this.state.patient ? this.state.patient.description : ''}</p>
                        <p><span>Code Patient:  </span>{this.state.patient ? this.state.patient.codePatient : ''} </p>

                    </div>
                    <div>
                        <p>
                            <span> Email: </span>{this.state.patient ? (this.state.patient.email ? (this.state.patient.email.indexOf("@") === -1 ? '' : this.state.patient.email) : '') : ''}
                        </p>
                        <p><span> N° Telephone: </span>{this.state.patient ? this.state.patient.phoneNumber : ''}</p>
                        <br/>
                        {this.state.session ?
                            this.state.session.user.role === 'nurse' ?
                                <Link to={`/edit_patient/${this.state.patient ? this.state.patient._id : ''}/n`}>
                                    <button type="button" className="btn btn-outline-primary">Modifier Infos</button>
                                </Link>
                                : ''
                            : ''}


                    </div>
                    <div>
                        {this.state.session ?
                            this.state.session.user.role === 'nurse' ?
                                <Link to={`/add_rendezvous/${this.state.patient ? this.state.patient._id : ''}`}>
                                    <button type="button" className="btn btn-success my-btn-add-rdv">Ajouter un
                                        rendez-vous
                                    </button>
                                </Link>

                                : ''
                            : ''}


                    </div>

                </div>
                <hr/>
                <div className="patient-details-table-section">
                    <div className="patinet-details-table">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Heure</th>
                                <th scope="col">BPM</th>
                                <th scope="col">Temperature</th>
                                <th scope="col">Etat</th>
                                <th scope="col">Nom du docteur</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            {this.state.listRdv.map((el, i) => (
                                <tbody>
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{el.start.substr(0,el.start.indexOf('T'))}</td>
                                    <td>{el.start.substr(el.start.indexOf('T')+1)}</td>
                                    <td>{el.analyses ? el.analyses.analyses.bpm : ''}</td>
                                    <td>{el.analyses ? el.analyses.analyses.temp : ''}</td>
                                    <td>{el.analyses ? el.analyses.statePatient : ''}</td>
                                    <td>
                                        <Button block className="mb-3" color="primary" type="button"
                                                onClick={() => this.toggleModal("defaultModal", el.doctor,null)}
                                        >Afficher
                                        </Button>
                                    </td>
                                    <td>

                                        <button type="button" className="btn btn-danger"
                                            onClick={() => this.toggleModal("notificationModal",null,el._id)}
                                        >X
                                        </button>
                                        <Modal
                                            className="modal-dialog-centered modal-danger"
                                            contentClassName="bg-gradient-danger"
                                            isOpen={this.state.notificationModal}
                                            toggle={() => this.toggleModal("notificationModal")}
                                        >
                                            <div className="modal-header">
                                                <h6 className="modal-title"
                                                    id="modal-title-notification">
                                                    Your attention is required
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
                                                    <h5 style={{color:'white'}}>Voulez vous vraiment supprimer ce rendezvous?</h5>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <Button
                                                    className="btn-white"
                                                    color="default"
                                                    data-dismiss="modal"
                                                    type="button"
                                                    onClick={() => {
                                                        this.toggleModal("notificationModal")
                                                        this.deleteRDV(el._id)
                                                    }
                                                    }
                                                >
                                                    Oui
                                                </Button>

                                                    <Button
                                                        className="btn-white"
                                                        color="default"
                                                        data-dismiss="modal"
                                                        type="button"
                                                        onClick={() => this.toggleModal("notificationModal")}
                                                    >
                                                        Non
                                                    </Button>

                                            </div>
                                        </Modal>
                                    </td>
                                </tr>

                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>


                <hr/>


                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.defaultModal}
                    toggle={() => this.toggleModal("defaultModal")}
                >
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">

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
                    <div className="modal-body ">
                        <p><span
                            className="span-details-doctor">Docteur:</span> {this.state.doctor ? this.state.doctor.name : ''} {this.state.doctor ? this.state.doctor.lastName : ''}
                        </p>
                        <p><span
                            className="span-details-doctor">Email:</span> {this.state.doctor ? this.state.doctor.email : ''}
                        </p>
                        <p><span
                            className="span-details-doctor">Telephone: </span>{this.state.doctor ? this.state.doctor.phoneNumber : ''}
                        </p>
                    </div>
                    <div className="modal-footer">

                        <Button
                            className="ml-auto"
                            color="primary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("defaultModal")}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>


                <CardsFooter/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        socket: state.root.socket
    }
};

export default connect(mapStateToProps,null) (PatientDetails);
