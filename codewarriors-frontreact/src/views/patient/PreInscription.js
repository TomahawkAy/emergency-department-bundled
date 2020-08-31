import React from "react";
import {Form} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'
import { Redirect } from 'react-router-dom'






class PreInscription extends React.Component {

    constructor(props){
        super(props)
        this.state={
            lastName:'',
            name:'',
            cin:'',
            description:'',
            codePatient:'',
            isAdded:false,
            id:''

        }
    }

    componentDidMount(){

        axios.get('http://localhost:3000/getPatients').then(
            res =>{
                this.setState({
                    list:res.data
                })
            }
        )
    }

    addPatient=()=>{
        let myobj = {
            lastName: this.state.lastName,
            name: this.state.name,
            cin: this.state.cin,
            description: this.state.description,
            email: this.state.cin,
            password: this.state.cin,
            codePatient: this.state.codePatient

        }



      axios.post("http://localhost:3000/add_patient",{...myobj}).then((res)=> {
            console.log(res.headers.date);
          this.setState({
              isAdded:true
          })

        })
            .catch((error) =>{
                console.log(error);
            });




    }

    handleChange=(e)=>{
        let alpha="A"
        if(this.state.list.length!==0) {

            if (this.state.list[this.state.list.length - 1].codePatient[0] === "A")
                alpha = "B"
        }

        this.setState({
            [e.target.name]:e.target.value,
            codePatient: alpha+(Math.random() * 1000000).toString(),

        })

    }

    render() {


        return (
            this.state.isAdded?<Redirect to={`/patient_infos/${this.state.codePatient}`}/>:
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

                <div className="preinsc-section">
                    <div className="preinsc-content">
                        <Form role="form">

                            <h1> Pré Inscription</h1>
                            <table>
                                <tr >
                                    <td><label htmlFor="">Prénom</label></td>
                                    <td>
                                        <input className="form-control" type="text" name="name" onChange={this.handleChange} autoComplete="off"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="">Nom</label></td>
                                    <td>
                                        <input className="form-control" type="text" name="lastName" onChange={this.handleChange} autoComplete="off"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="">CIN</label></td>
                                    <td>
                                        <input className="form-control" type="text" name="cin" onChange={this.handleChange} autoComplete="off"/>
                                    </td>
                                </tr>

                                <tr>
                                    <td><label htmlFor="">Description</label></td>
                                    <td>

                                        <select className="form-control" data-toggle="select"   name="description" onChange={this.handleChange} >
                                            <option disabled selected>---</option>
                                            <option>Accident</option>
                                            <option>Brûlure</option>
                                            <option>Fracture </option>
                                            <option>Grippe</option>
                                            <option>Crise</option>


                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <br/>
                                        <button type="button" className="btn btn-success" onClick={this.addPatient} >Envoyer</button>


                                    </td>

                                </tr>



                            </table>
                        </Form>

                    </div>

                </div>
                <CardsFooter/>
            </>
        );
    }
}

export default PreInscription;
