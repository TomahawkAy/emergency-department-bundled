import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'

import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import {UncontrolledAlert} from "reactstrap";

const styles = {
    left: {
        float: "left",
        width: "220px"
    },
    main: {
        marginLeft: "220px"
    },
    backColor: "#38761d"
};


class AddRendezVous extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isAdded:false,
            listDoc:[],
            patient:{},
            doctor:{},
            viewType: "Week",
            durationBarVisible: false,
            timeRangeSelectedHandling: "Enabled",
            backColor: "#38761d",
            onTimeRangeSelected: args => {
                let dp = this.calendar;
                let ee = {};

                DayPilot.Modal.prompt("Add new patient:", this.state.patient.name + " " +this.state.patient.lastName)
                    .then(function(modal) {
                   dp.clearSelection();
                    if (!modal.result) { return; }
                    ee ={
                        start: args.start,
                        end: args.end,
                        //id: DayPilot.guid(),
                        text: modal.result,
                    }
                    dp.events.add(new DayPilot.Event(ee));
                    localStorage.setItem('mypatient',JSON.stringify(ee))
                });
                //this.showEvent()


            },
            eventDeleteHandling: "Update",
            onEventClick: args => {
                let dp = this.calendar;
                DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function(modal) {
                    if (!modal.result) { return; }
                    args.e.data.text = modal.result;
                    dp.events.update(args.e);
                });
            },
        };


    }


    componentDidMount(){
        axios.get(`http://localhost:3000/findById/${this.props.match.params.idPatient}`).then(
            res =>{
                this.setState({
                    patient:res.data[0]
                })
            }
        ).catch(err=>console.log(err))


        axios.get('http://localhost:3000/getDoctors').then(
            res =>{
                this.setState({
                    listDoc:res.data
                })
            }
        )


       /* axios.get(`http://localhost:3000/findById/${this.props.match.params.idDoctor}`).then(
            res =>{
                this.setState({
                    doctor:res.data[0]
                })
            }
        ).catch(err=>console.log(err))

        axios.get(`http://localhost:3000/findRdvByDoctor/${this.props.match.params.idDoctor}`).then(
            res =>{
                this.setState({
                    events:res.data
                })
            }
        ).catch(err=>console.log(err))*/



        this.setState({
            startDate: "2020-06-10",
            //events: []
        });


    }



    addRdv=(e)=>{
        let myobj = JSON.parse(localStorage.getItem("mypatient"))
        let newstate = {
            patient: this.state.patient,
            doctor: this.state.doctor
        }

        let rdv = Object.assign(newstate , myobj)


        axios.post("http://localhost:3000/add_rendezvous",{...rdv}).then((res)=> {
            console.log(res.headers.date);
        })
            .catch((error) =>{
                console.log(error);
            });
        this.setState({
            isAdded:true
        })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })


        axios.get(`http://localhost:3000/findById/${e.target.value}`).then(
            res =>{
                this.setState({
                    doctor:res.data[0]
                })
            }
        ).catch(err=>console.log(err))


        axios.get(`http://localhost:3000/findRdvByDoctor/${e.target.value}`).then(
            res =>{
                this.setState({
                    events:res.data
                })
            }
        ).catch(err=>console.log(err))
    }


    render() {
        var {...config} = this.state;


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
                            <div className="col-xs-12" ></div>
                        </div>
                    </div>
                </main>

                {this.state.isAdded?
                    <UncontrolledAlert color="success" fade={false}>
                            <span className="alert-inner--icon">
                                <i className="ni ni-like-2" />
                            </span>
                        <span className="alert-inner--text ml-1">
                                <strong>Ajouté avec succès</strong>
                            </span>
                    </UncontrolledAlert>
                    :""}

                <div className="rdv-section">
                    <div className="rdv-header">



                            <h2>Ajouter un rendez vous </h2>
                            <div>
                                <h5>Patient: {this.state.patient.name} {this.state.patient.lastName}</h5>
                                <div className="rdv-header-doc-btn-save" >
                                    <div className="rdv-header-doc" >
                                        <h5>Docteur:</h5>
                                        <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1" name="mydoctor" onChange={this.handleChange}>
                                                <option disabled selected> Select doctor</option>
                                                {this.state.listDoc.map(el=>(
                                                    <option value={el._id}> {el.name} {el.lastName}</option>

                                                ))}

                                            </select>
                                        </div>
                                    </div>

                                    <div><button onClick={this.addRdv} className="btn btn-success">Enregitrer</button></div>


                                </div>


                            </div>






                    </div>


                    <div>
                        <div style={styles.left}>
                            <DayPilotNavigator
                                selectMode={"week"}
                                showMonths={3}
                                skipMonths={3}
                                onTimeRangeSelected={ args => {
                                    this.setState({
                                        startDate: args.day
                                    });

                                }}
                            />
                        </div>
                        <div style={styles.main}>
                            <DayPilotCalendar
                                {...config}
                                ref={component => {
                                    this.calendar = component && component.control;
                                }}
                            />
                        </div>
                    </div>

                </div>

                <CardsFooter/>
            </>
        );
    }
}

export default AddRendezVous;
