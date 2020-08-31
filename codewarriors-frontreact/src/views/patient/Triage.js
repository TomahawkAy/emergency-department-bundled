import React,  { useState, useEffect } from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Button, Col} from "reactstrap";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;;

const recognition = new SpeechRecognition();

recognition.start();


class Triage extends React.Component {


    constructor(props){
        super(props)
        this.state= {
            patientList: [],
            transcript: ""

        }

    }



    componentDidMount(){
        axios.get('http://localhost:3000/getPatients').then(
            res =>{
                this.setState({
                    patientList:res.data
                })
            }
        )

    }

    compare=(a,b)=>{
        const caseA = a.statePatient;
        const caseB = b.statePatient;

        let comparison = 0;
        if (caseA ==='Très Urgent') {
            comparison = -1;
        }
        if (caseB ==='Normal') {
            comparison = -1;
        }


        return comparison;
    }

    deletePatient=(p)=>{
        let stateP={statusSort:"done"}


        let newstate = Object.assign(p , stateP)

        console.log(newstate)

        axios.put(`http://localhost:3000/updatePatient/${p._id}`,{...newstate})
            .catch((error) =>{
                console.log(error);
            });

        axios.get('http://localhost:3000/getPatients').then(
            res =>{
                this.setState({
                    patientList:res.data
                })
            }
        )


    }


    voiceCommands = () => {


        // On start
        recognition.onstart = () => {
            console.log('Voice is actived');
        }

        // Do something when we get a result
        recognition.onresult = (e) => {
            let current = e.resultIndex;

            let transcript = e.results[current][0].transcript;
            let mobileRepeatBug = (current === 1 && transcript === e.results[0][0].transcript);

            if(!mobileRepeatBug) {
                if(transcript === 'next' || transcript === ' next') {
                    console.log('one');
                }

                if(transcript === 'back' || transcript === ' back') {
                    console.log('two');
                }
            }

            console.log(transcript)
            this.setState({
                transcript:transcript
            })

            setTimeout(() => {
                recognition.start();
            }, 50);
        }

        recognition.onspeechend = () => {
            recognition.stop();
            console.log('voice stopped');
        }
    }




    render() {

        this.voiceCommands()
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


                <div className="triage-section">
                    <h2>Liste des patients</h2>


                    <h5> {this.state.transcript}</h5>

                    <div className="list-group triage-table">
                        <button type="button" className="list-group-item list-group-item-action active triage-table-title">
                            <div className="thisisexp2"> Nom du patient</div>
                            <div className="thisisexp2">Etat</div>
                            <div className=""></div>


                        </button>
                        <div className='patients'>
                            {this.state.patientList.filter(el => el.statusSort!=="done" && el.statePatient)
                                .sort(this.compare)
                                .map(el => (
                                    <div style={{display:"flex"}}>

                                        <Link to={`/patient_details/${el._id}`}>
                                            <button type="button" className="list-group-item list-group-item-action triage-table-title" key={el._id}
                                            style={{backgroundColor:this.state.transcript.toUpperCase()===el.name.toUpperCase()?'#F8CDF5':''}}
                                            >
                                                <div className="thisisexp2"> {el.name} {el.lastName}</div>
                                                <div className="thisisexp2">{el.statePatient}</div>


                                            </button>
                                        </Link>



                                        <div className="">
                                            <Button className="btn-1 ml-1" color="danger" type="button" onClick={()=>this.deletePatient(el)}>X</Button>
                                        </div>

                                    </div>


                                    )
                                )}

                        </div>


                    </div>
                </div>

                <CardsFooter/>
            </>
        );
    }


}

export default Triage;
