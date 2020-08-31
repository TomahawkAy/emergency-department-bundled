import FilterResults from 'react-filter-search';
import React from "react";
import './pharmacie.css'

import {
    Card, CardImg, CardText, CardBody,
    TextField, CardTitle, CardSubtitle, Button, Container, Col, Row,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";

class Pharmacie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    componentWillMount() {

        const script = document.createElement("script");

        script.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        script.async = true;

        document.body.appendChild(script);

        const script2 = document.createElement("script2");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        fetch('http://localhost:3000/scrappedMed')
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
                <div className="container" align="center">
                    <br/>

                    <h1 className="display-4 mb-0">Liste Des Médicaments Dans La Pharmacie Centrale De Tunisie</h1>

                    <div className="main">

                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input value={value} onChange={this.handleChange} type="text" className="form-control" placeholder="Search"/>
                        </div>

                    </div>
               <div className="col-8">
                <FilterResults
                    value={value}
                    data={data}
                    renderResults={results => (
                        <div>
                            {results.map(el => (
                                <div>
                                    <br/>
                                    <Card className="card bg-gradient-info text-white">
                                        <CardBody>
                                            <CardSubtitle> <i className="fas fa-pills"></i> {el}</CardSubtitle>
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


export default Pharmacie ;
