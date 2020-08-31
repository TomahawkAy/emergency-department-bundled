import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'
import {Redirect} from "react-router";


class EditPatient extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            patient:{},
            name:'',
            lastName:'',
            phoneNumber:'',
            cin:'',
            email:'',
            password:'',
            isUpdated:false,
            type: 'password',

        }


    }

    componentDidMount(){
        axios.get(`http://localhost:3000/findById/${this.props.match.params.id}`).then(
            res =>{
                this.setState({
                    _id:res.data[0]._id,
                    name:res.data[0].name,
                    lastName:res.data[0].lastName,
                    phoneNumber:res.data[0].phoneNumber,
                    cin:res.data[0].cin,
                    email:res.data[0].email,
                    patient:res.data[0]


                })
            }
        ).catch(err=>console.log(err))
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })

    }

    handleClick = () => this.setState(({type}) => ({
        type: type === 'text' ? 'password' : 'text'
    }))

    editPatient=(e)=>{

        let myobj;
        if(this.props.match.params.role==="p"){
            myobj = {
                name:this.state.name,
                lastName:this.state.lastName,
                phoneNumber:this.state.phoneNumber,
                cin:this.state.cin,
                email:this.state.email,
                password:this.state.password,
            }
        }
        else{
            myobj = {
                name:this.state.name,
                lastName:this.state.lastName,
                phoneNumber:this.state.phoneNumber,
                cin:this.state.cin,
                email:this.state.email,
            }

        }




        let newstate = Object.assign(this.state.patient , myobj)

        axios.put(`http://localhost:3000/updatePatient/${this.state._id}/${this.props.match.params.role}`,{...newstate})
            .catch((error) =>{
                console.log(error);
            });

        this.setState({
            isUpdated:true
        })
    }

    render() {
        const { label } = this.props

        return (
            this.state.isUpdated?<Redirect to={this.props.match.params.role==="n"?`/patient_details/${this.state.patient._id}`:`/blood_pressure_calculator/${this.state.patient._id}`}/>:
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

                <div className="edit-patient-section">
                    <h2>Modifier les informations </h2><br/>
                    <div className="edit-form">
                        <form >
                            <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationDefault01">Prénom</label>
                                    <input type="text" className="form-control " id="validationDefault01"
                                             value={this.state.name} onChange={this.handleChange} name='name' autoComplete="off"/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationDefault02">Nom</label>
                                    <input type="text" className="form-control" id="validationDefault02"
                                           value={this.state.lastName} onChange={this.handleChange} name='lastName' autoComplete="off"/>
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationDefault01">Numéro de téléphone</label>
                                    <input type="text" className="form-control " id="validationDefault01"
                                           value={this.state.phoneNumber} onChange={this.handleChange} name='phoneNumber' autoComplete="off"/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationDefault02">CIN</label>
                                    <input type="text" className="form-control" id="validationDefault02"
                                           value={this.state.cin} onChange={this.handleChange} name='cin' autoComplete="off"/>
                                </div>

                            </div>
                            <div className="form-row">
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="validationDefault01">Email</label>
                                    <input type="text" className="form-control " id="validationDefault01"
                                           value={this.state.email} onChange={this.handleChange} name='email' autoComplete="off"/>

                                </div>
                            </div>




                                    {this.props.match.params.role==="p"?
                                        /* <label className="password">{label}
                                            <input type={this.state.type} className="password__input"/>
                                            <span className="password__show" onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</span>
                                        </label>*/
                                        <div className="col-md-8 mb-3">
                                            <label htmlFor="validationDefault01">Password</label>

                                            <div className = "input-group mb-3" >
                                                <input type={this.state.type} className="form-control " id="validationDefault01"
                                                       value={this.state.password} onChange={this.handleChange} name='password' autoComplete="off"/>

                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button"onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</button>
                                                </div>
                                            </div>

                                        </div>



                                        :""}






                            <button className="btn btn-success" type="button" onClick={this.editPatient}>Modifer</button>
                        </form>
                    </div>
                </div>

                <CardsFooter/>
            </>
        );
    }
}

export default EditPatient;
