import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'

import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {Button} from "reactstrap";


class PatientInfos extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            isDisplayed:false,
            patient:{},
            isDispo:false,
            isFound:false,
            isFoundDoctor:false,
            points1:0,
            points2:0,
            points3:0,
            intervalCounter1:0,
            doctors:[],
            listRdv:[],
            isShown:true,
            patientList:[],

            //patientResult:JSON.parse(localStorage.getItem('patientResultList'))



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




        axios.get(`http://localhost:3000/findByCode/${this.props.match.params.codePatient}`).then(
            res =>{
                this.setState({
                    _id:res.data[0]._id,
                    patient:res.data[0],
                    analyses:res.data[0].analyses

                })
            }
        ).catch(err=>console.log(err))

        let today = new Date();
        let date = today.getFullYear()+'-'+((today.getMonth()+1).toString().padStart(2,'0'))+'-'+today.getDate().toString().padStart(2,'0');
        //let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let time = today.getHours().toString().padStart(2,'0') + ":00:00";
        let dateTime = date+'T'+time;
        this.setState({
            dateTime:dateTime
        })


        axios.get(`http://localhost:3000/findRdvByDate/${date}`).then(
            res =>{
                // console.log("listRdv= ",res.data)
                this.setState({
                    listRdv:res.data
                })
            }
        ).catch(err=>console.log(err))


        axios.get(`http://localhost:3000/getDoctors`).then(
            res =>{
                //console.log("doctors= ",res.data)
                this.setState({
                    doctors:res.data
                })
            }
        ).catch(err=>console.log(err))

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


    showResult=()=>{


        let fetchIot="fetched_iot_data2"
        let fetchIotReverse="fetched_iot_data"
        if(this.props.match.params.codePatient[0]==="A"){
            fetchIot="fetched_iot_data"
            fetchIotReverse="fetched_iot_data2"
        }

            this.props.socket.on(fetchIot,(data)=>{

                axios.get('http://localhost:3000/getPatients').then(
                    res =>{
                        this.setState({
                            patientList:res.data
                        })
                    }
                )



                if(this.state.isShown){
                    let mystateP="";
                    let temp =0
                    let bpm = parseInt(data.data[0].substr(data.data[0].indexOf(':')+1))
                    temp=parseInt(data.data[1].substr(data.data[1].indexOf(':')+1))
                    let distance=parseInt(data.data[2].substr(data.data[2].indexOf(':')+1))
                    if(bpm<=39 || bpm >=157){
                        mystateP="Très Urgent"
                    } else if((bpm>=40 && bpm<=69) || (bpm>=117 && bpm<=156)){
                        mystateP="Urgent"
                    } else if(bpm>=70 && bpm<=116){
                        mystateP="Normal"
                    }

                let dataResult = {
                    bpm:bpm,
                    temp:(temp>=35&&temp<=42)?temp:37,
                    statePatient:mystateP
                }

                    let myobj = {
                        analyses: dataResult,
                        statePatient:mystateP
                    }



                    let newstate = Object.assign(this.state.patient , myobj)

                    axios.put(`http://localhost:3000/updatePatient/${this.state._id}/n`,{...newstate})
                        .catch((error) =>{
                            console.log(error);
                        });

                    this.setState({
                        dataArray:data,
                        dataResult:dataResult,
                        objPatient:myobj,
                        distance:distance

                    })

                }
            })




    }

    stopResult=()=>{

        this.showDoctor(this.state.objPatient)


        this.setState({
            dataArray:this.state.dataArray,
            isShown:false
        })

    }


    showDoctor = (myobj) =>{
        let docRdv=[]
        let nbr;
        this.state.doctors.forEach((el,i)=>{
            nbr=0;
            this.state.listRdv.forEach(r=> {
                if(el._id===r.doctor){
                    nbr++
                }
            })
            docRdv[i]={doctor:el, nbRdv:nbr}
        })


        docRdv.sort(function(a, b){
            return a.nbRdv-b.nbRdv
        })



        for(let i=0; i<docRdv.length;i++){
            if(docRdv[i].nbRdv===0){

                let obj = {

                    patient:this.state.patient,
                    doctor:docRdv[i].doctor,
                    start:this.state.dateTime,
                    end:this.state.dateTime.substring(0, this.state.dateTime.indexOf(':')+1)+"30:00",
                    text:this.state.patient.name + " "+this.state.patient.lastName,
                    analyses: myobj

                }

                this.addRDV(obj)


                break;

            }
            else{
                for(let j=0; j<this.state.listRdv.length;j++){
                    if(docRdv[i].doctor._id===this.state.listRdv[j].doctor){
                        if(this.state.listRdv[j].start!==this.state.dateTime){

                            let objj = {

                                patient:this.state.patient,
                                doctor:docRdv[i].doctor,
                                start:this.state.dateTime,
                                end:this.state.dateTime.substring(0, this.state.dateTime.indexOf(':')+1)+"30:00",
                                text:this.state.patient.name + " "+this.state.patient.lastName,
                                analyses: myobj

                            }
                            this.addRDV(objj)
                            this.setState({
                                mydoctor:docRdv[i].doctor
                            })
                            break;
                        }
                    }
                }
            }
        }
    }

    addRDV=(obj)=>{
        this.setState({
            mydoctor:obj.doctor
        })

        axios.post("http://localhost:3000/add_rendezvous",{...obj}).then((res)=> {
            console.log(res.headers.date);
        })
            .catch((error) =>{
                console.log(error);
            });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {



        if(this.state.isFound===false) {
            axios.get(`http://localhost:3000/findRdvByDatePatient/${this.state.dateTime}/${prevState._id}`).then(
                res => {

                    this.setState({
                        myrdv: res.data[0],
                        isFound: true
                    })
                }
            ).catch(err => console.log(err))
        }

        if(this.state.isFoundDoctor===false && this.state.myrdv){



            axios.get(`http://localhost:3000/findById/${this.state.myrdv.doctor}`).then(
                res =>{
                    this.setState({
                        mydoctor:res.data[0],
                        isFoundDoctor:true

                    })
                }
            ).catch(err=>console.log(err))

        }


    }



    render() {


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

                <div className="main-patient-infos">

                    <div className="main-patient-infos-sec1">
                        <br/>
                        <center><h2>Triage</h2></center>
                        <br/>


                        <div>

                           <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Patient</th>
                                    <th scope="col">BPM</th>
                                    <th scope="col">Temperature</th>
                                    <th scope="col">Etat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.patientList
                                    .filter(el=>el.statePatient)
                                    .sort(this.compare)
                                    .map(el => (
                                <tr>
                                    <th scope="row"></th>
                                    <Link to={`/patient_infos/${el.codePatient}`}>
                                        <td>{el.name} {el.lastName}</td>
                                    </Link>
                                    <td>{el.analyses?el.analyses.bpm:''}</td>
                                    <td>{el.analyses?el.analyses.temp:''}</td>
                                    <td>{el.statePatient}</td>
                                </tr>
                                        ))}


                                </tbody>
                            </table>
                        </div>



                    </div>
                    <div className="main-patient-infos-sec2">

                    <div className="infos-section" >
                        <div className="infos-content">

                            <p> <span>Prénom et Nom:  </span>{this.state.patient.name} {this.state.patient.lastName}</p>
                            <p><span> Cin: </span>{this.state.patient.cin}</p>
                            <p><span> Description: </span>{this.state.patient.description}</p>



                        </div>
                        <div>
                            <p> <span>Code Patient:  </span>{this.state.patient.codePatient} </p>
                            <br/>
                            <Link to={`/patient_details/${this.state.patient._id}`}>
                                <button type="button" className="btn btn-outline-primary" >Afficher Details</button>
                            </Link>

                        </div>

                    </div>

                    <hr/>


                        <div className="result-section" >




                            <div className="blood-pressure-section">
                                <div className="blood-pressure-content">





                                    <div className="blood-pressure-content-border">
                                        <div className="blood-pressure-titles">
                                            <div className="blood-pressure-mytitle">
                                                <span className="blood-pressure-thistitle">BPM</span>
                                                <span></span>
                                            </div>
                                            <div className="blood-pressure-mytitle">
                                                <span className="blood-pressure-thistitle">TEMPRATURE</span>
                                                <span></span>
                                            </div>
                                            <div className="blood-pressure-mytitle">
                                                <span className="blood-pressure-thistitle">DISTANCE</span>
                                                <span></span>
                                            </div>

                                        </div>
                                        <div className="blood-pressure-show-result">
                                            <span>{this.state.dataResult?this.state.dataResult.bpm:'00'}</span>
                                            <span>{this.state.dataResult?this.state.dataResult.temp:'00'}</span>
                                            <span>{this.state.distance?this.state.distance:'00'}</span>

                                        </div>
                                    </div>










                                    <div style={{margin:'20px'}}>

                                    <button type="button" className="btn btn-primary" onClick={this.showResult}>Afficher
                                        les resultats</button>

                                    <button type="button" className="btn btn-danger" onClick={this.stopResult}>Arreter</button>
                                    </div>
                                </div>

                            </div>

                        </div>



                    <hr/>

                    {this.state.mydoctor?
                        <div className="docteur-section">
                            <h5> <span>Affecté au docteur:  </span></h5>

                            <table className="table table-med">
                                <thead>
                                <tr>

                                    <th scope="col">Nom du médecin</th>
                                    <th scope="col">Telephone</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>

                                    <td>{this.state.mydoctor.name} {this.state.mydoctor.lastName}</td>
                                    <td>{this.state.mydoctor.phoneNumber} </td>

                                </tr>

                                </tbody>
                            </table>
                        </div>

                        :''}

                    <hr/>
                    </div>

                </div>



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

export default connect(mapStateToProps,null) (PatientInfos);



