import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_HOME_STYLE} from "../../../assets/css/customStyles";
import {Button, Col, Container, Row} from "reactstrap";
import {Logs} from "../../../components/extra/Logs";
import CardsFooter from "../../../components/Footers/CardsFooter";
import TrainingServices from "../../../services/TrainingServices";
import TrainingComponent from "../../../components/TrainingComponent/TrainingComponent";
import {Redirect} from "react-router";

export class TrainingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {trainings: TrainingServices.fetchTrainings(), redirectionNew: false}
    }


    componentDidMount() {
    }

    render() {
        if (this.state.redirectionNew) {
            return (<Redirect to='/new-training'/>);
        } else
            return (<>
                <DemoNavbar/>
                <main>
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-250">
                            <div className="shape shape-style-1 shape-default" style={BACKGROUND_HOME_STYLE}
                            >
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
                                    <Row>
                                        <Col lg="12" className="text-center">
                                            <h1 className="display-3 text-white">
                                                Manage trainings{" "}
                                                <span>requests and contents</span>
                                            </h1>
                                            <p className="lead text-white">
                                                Our training system management enhance learners productivity by
                                                providing a
                                                learn curve
                                                for every subscribed training and a speech to text feature for uploaded
                                                videos when a
                                                sound problem occurs
                                            </p>
                                            <div className="btn-wrapper">
                                                <Button
                                                    className="btn-icon mb-3 mb-sm-0"
                                                    color="success"
                                                    onClick={(e) => {
                                                        this.setState({redirectionNew:true});
                                                        console.log('clicked');
                                                    }}
                                                >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-plus"/>
                          </span>
                                                    <span className="btn-inner--text">New training</span>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
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
                        <section className="section section-lg pt-lg-0 mt--200">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg="12">
                                        <Row className="row-grid">
                                            {this.state.trainings.map(e => {
                                                return (<TrainingComponent key={e.name} training={e}/>)
                                            })}
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </div>
                    <Logs/>
                </main>
                <CardsFooter/>
            </>)
    }
}
