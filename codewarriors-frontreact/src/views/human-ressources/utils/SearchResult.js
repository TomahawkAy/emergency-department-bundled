import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_HOME_STYLE} from "../../../assets/css/customStyles";
import {Card, CardBody, Col, Container, Row,} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import {Logs} from "../../../components/extra/Logs";
import Table from "reactstrap/es/Table";

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
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
                                    <br/><br/>
                                    <Row>
                                        <Col lg="12" xl="12" xs="12">
                                            <Card className="card-lift--hover shadow border-0"
                                                  style={{backgroundColor: "#f24333"}}>
                                                <CardHeader className="text-center "
                                                            style={{backgroundColor: "#f24333"}}><h1
                                                    style={{color: 'white'}}>Manage staff</h1>
                                                    <h4 style={{color: 'white'}}><b
                                                        style={{color: '84FF54'}}>Profiles</b> and <b
                                                        style={{color: '84FF54'}}>performance</b></h4>
                                                </CardHeader>
                                                <CardBody className="py-5">
                                                    <Row>
                                                        <Col md={"12"} xs={"12"} xl={"12"} className="text-center">
                                                            <Table responsive style={{color: "white"}}>
                                                                <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Name</th>
                                                                    <th>Phone</th>
                                                                    <th>Email</th>
                                                                    <th>Position</th>
                                                                    <th>Grade</th>
                                                                    <th>Salary</th>
                                                                    <th>Department</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </Card>
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
                    </div>
                    <Logs/>
                </main>
            </>

        );
    }
}

export default SearchResult;
