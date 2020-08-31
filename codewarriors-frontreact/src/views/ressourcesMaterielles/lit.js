import FilterResults from 'react-filter-search';
import React from "react";
import './sejour.css'
import axios from "axios";
import AddLit from "./addLit";


import {
    Card, CardImg, CardText, CardBody,CardHeader, CardFooter,
    Modal, TextField, CardTitle, CardSubtitle, CardLink, Button, Container, Col,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";


class Lit extends React.Component {
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
        const script2 = document.createElement("script");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        const script = document.createElement("script");

        script.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        script.async = true;

        document.body.appendChild(script);
    }
    componentWillMount() {
        fetch('http://localhost:3000/lit')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/lit')
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
                        <AddLit/>
                        <br/>
                        <Col sm="12">
                            <h1 align="center" className="display-4 mb-0">Liste Des Lits</h1>
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
                                            <CardHeader className="text-center" tag="h4"><i className="fa fa-procedures ni-2x"></i> <b>Numéro De Lit: {el.num_lit}</b></CardHeader>
                                            <CardBody className="cardBack">
                                                <CardTitle className="text-center" tag="h3"><i
                                                    className="fas fa-cog fa-spin"></i>
                                                    État Du Lit: {el.status_lit}
                                                </CardTitle>
                                            </CardBody>
                                            <CardFooter tag="h5" className="text-center"><b><i
                                                className='far fa-calendar-alt ni-2x'></i> Date De Création: {el.date_creation}</b></CardFooter>

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


export default Lit ;
