import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'

import {Link} from 'react-router-dom'

import {Button, Col, Modal} from "reactstrap";
import dataResult from "../../assets/data/resultFile";



class BloodPressureCalculator extends React.Component {

    constructor(props){
        super(props)
        this.state= {

            listRdv:[],
            patient: {},
            isUpdated: true,
            listDoctor: [],
            doctor:{},
            session:null,
            points1:0,
            points2:0,
            intervalCounter1:0,
            intervalCounter2:0



        }


    }

    componentDidMount(){
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session});
        //this.state.session.user._id

        axios.get(`http://localhost:3000/findRdvByPatient/${session.user._id}`).then(
            res =>{
                this.setState({
                    listRdv:res.data

                })
            }
        ).catch(err=>console.log(err))

        axios.get(`http://localhost:3000/findById/${session.user._id}`).then(
            res =>{
                this.setState({
                    patient:res.data[0],
                })
            }
        ).catch(err=>console.log(err))


    }


    state = {};
    toggleModal = (state,myid) => {
        this.setState({
            [state]: !this.state[state]
        });

        if(myid) {

            axios.get(`http://localhost:3000/findById/${myid}`).then(
                res => {
                    this.setState({
                        doctor: res.data[0],
                    })
                }
            ).catch(err => console.log(err))
        }


    };


    showResult=()=>{
        let x = Math.floor(Math.random() * 4)
        let myanalyses = dataResult[x]


        this.setState({
            analyses: myanalyses,
        })

        this.start()


    }

    start=()=> {
        this.counter1()
        this.counter2()
    }

    counter1=()=>{
        this.setState({
            intervalCounter1:setInterval(
                ()=>{
                    this.setState({
                        points1:this.state.points1+this.state.analyses.systolicPressure/6
                    })
                }
                ,1000)
        })

    }
    counter2=()=>{
        this.setState({
            intervalCounter2:setInterval(
                ()=>{
                    this.setState({
                        points2:this.state.points2+this.state.analyses.diastolicPressure/6
                    })
                }
                ,1000)
        })

    }


    render() {
        if(this.state.analyses){
            if(this.state.points1>=this.state.analyses.systolicPressure){
                clearInterval(this.state.intervalCounter1)

            }
            if(this.state.points2>=this.state.analyses.diastolicPressure){
                clearInterval(this.state.intervalCounter2)

            }
        }
        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative my-header-navbar" >
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
                    <div align="center" >

                        <div className="container" >
                            <div className="col-xs-12" >



                            </div>
                        </div>


                    </div>

                </main>

                <div style={{display:"flex"}}>

                    <div style={{width:"55%"}}>

                        <div className="infos-section">
                            <div className="infos-content">

                                <p> <span>Prénom et Nom:  </span>{this.state.patient?this.state.patient.name:''} {this.state.patient?this.state.patient.lastName:''}</p>
                                <p><span> Cin: </span>{this.state.patient?this.state.patient.cin:''}</p>
                                <p> <span>Code Patient:  </span>{this.state.patient?this.state.patient.codePatient:''} </p>

                            </div>
                            <div>
                                <p><span> Email: </span>{this.state.patient?(this.state.patient.email?(this.state.patient.email.indexOf("@")===-1?'':this.state.patient.email):''):''}</p>
                                <p><span> N° Telephone: </span>{this.state.patient?this.state.patient.phoneNumber:''}</p>
                                <br/>
                                <Link to={`/edit_patient/${this.state.patient?this.state.patient._id:''}/p`}>
                                    <button type="button" className="btn btn-outline-primary" >Modifier Infos</button>
                                </Link>
                                <br/> <br/>
                                <Button
                                    block
                                    className="btn btn-outline-success"

                                    type="button"
                                    onClick={() => this.toggleModal("bloodModal")}>
                                    Tensiomètre
                                </Button>
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
                                        <th scope="col">Docteur</th>
                                    </tr>
                                    </thead>
                                    {this.state.listRdv.map((el,i) =>(
                                        <tbody>
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{el.start.substr(0,el.start.indexOf('T'))}</td>
                                            <td>{el.start.substr(el.start.indexOf('T')+1)}</td>
                                            <td>{el.analyses?el.analyses.analyses.bpm:''}</td>
                                            <td>{el.analyses?el.analyses.analyses.temp:''}</td>
                                            <td>{el.analyses?el.analyses.statePatient:''}</td>
                                            <td>
                                                <Button
                                                block
                                                className="mb-3"
                                                color="primary"
                                                type="button"
                                                onClick={() => this.toggleModal("defaultModal",el.doctor)}>
                                                Afficher
                                            </Button>
                                            </td>
                                        </tr>

                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>

                        <hr/>

                    </div>



                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")}
                    >
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">
                                Type your modal title
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
                            <p><span className="span-details-doctor">Dr:</span> {this.state.doctor?this.state.doctor.name:''} {this.state.doctor?this.state.doctor.lastName:''}</p>
                            <p><span className="span-details-doctor">Email:</span> {this.state.doctor?this.state.doctor.email:''} </p>
                            <p><span className="span-details-doctor">Telephone: </span>{this.state.doctor?this.state.doctor.phoneNumber:''} </p>
                        </div>
                        <div className="modal-footer">

                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>


                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.bloodModal}
                        toggle={() => this.toggleModal("bloodModal")}
                    >
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">
                                Type your modal title
                            </h6>

                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("bloodModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <div className="myimgblood">

                                <div className="bloodvalues">
                                    <h1 className="sysblood">{this.state.analyses?(parseInt(this.state.points1)).toString().padStart(2,'0'):'00'}</h1>
                                    <h1 className="diablood">{this.state.analyses?(parseInt(this.state.points2)).toString().padStart(2,'0'):'00'}</h1>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <Button color="primary" type="button"
                                    onClick={this.showResult}>
                                Start
                            </Button>
                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("defaultModal")}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>


                    <div style={{width:"45%"}}>
                        <iframe id="tool_blood-pressure"
                                src="https://assets.nhs.uk/tools/blood-pressure/index.html?syn_id=amFtZXMuZ3JvdmVyQGtpbmV0aWttZWRpY2FsLmNvbQ=="
                                style={{width: "100%",height: 1500}} frameBorder="0" scrolling="no" seamless=""
                                data-gtm-vis-recent-on-screen-8472202_97="651" data-gtm-vis-first-on-screen-8472202_97="651"
                                data-gtm-vis-total-visible-time-8472202_97="100" data-gtm-vis-has-fired-8472202_97="1"
                                data-gtm-yt-inspected-8472202_45="true"></iframe>

                    </div>


                </div>

                <CardsFooter/>
            </>
        );
    }
}

export default BloodPressureCalculator;
