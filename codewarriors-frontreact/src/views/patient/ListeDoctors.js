import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'
import {Link} from 'react-router-dom'


class ListeDoctors extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            nameFilter:""


        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    componentDidMount(){

        axios.get('http://localhost:3000/getDoctors').then(
            res =>{
                this.setState({
                    list:res.data
                })
            }
        )
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

                <div className="list-doc-section">

                    <div className="list-doc-table-content">
                        <h3 className="list-doc-title">Liste des médecins</h3>


                        <div className="list-doc-table">
                            <input className="form-control mr-sm-2" onChange={this.handleChange} type="search" placeholder="Chercher un médecin" aria-label="Search" name="nameFilter"/>
                            <br/>

                            <table className="table table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telephone</th>

                                    <th scope="col"></th>

                                </tr>
                                </thead>
                                {this.state.list.filter(el=>this.state.nameFilter?el.name.includes(this.state.nameFilter)||el.lastName.includes(this.state.nameFilter):true)
                                    .map((el,i) => (
                                        <tbody>
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{el.lastName}</td>
                                            <td>{el.name}</td>
                                            <td>{el.email}</td>
                                            <td>{el.phoneNumber}</td>


                                            <td>
                                                <Link to={`/patients_list/${el._id}`}>
                                                    <button type="button" className="btn btn-outline-dark btn-sm">Afficher les rendez-vous</button>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                ))
                                }
                            </table>
                        </div>


                    </div>
                </div>


                <CardsFooter/>
            </>
        );
    }
}

export default ListeDoctors;
