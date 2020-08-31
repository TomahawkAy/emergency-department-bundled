import React from "react";
import {connect} from "react-redux";
import CardsFooter from "../../components/Footers/CardsFooter";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { Card, CardBody,  Container, Nav, NavItem, NavLink,  TabContent, TabPane} from "reactstrap";
import {
    SET_TAB
} from "../../actions/NurceAmbulanceAction";
import NewTask from "./Nurce/NewTask";
import CurrentTask from "./Nurce/CurrentTask";
import classnames from "classnames";
import axios from "axios";
import Button from "reactstrap/es/Button";
import {Link} from "react-router-dom";
import NewCalls from "./Nurce/NewCalls";

class AmbulanceNurce extends React.Component {
    state = {
        data: null
    }


    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.getwait()
        // this.props.socket.on('PhoneCallAmbulance', (data) => {
        //
        // });
    }

    getwait = () => {
        this.setState({data: null})
        this.toggleNavs( 3);

        axios({
            method: 'get',
            url: 'http://localhost:3000/taskD/getAll/wait',
        }).then((d) => {
            this.setState({data: d})
        });
    };
    getcurrent = () => {
        this.setState({data: null})
        this.toggleNavs(2);

        axios({
            method: 'get',
            url: 'http://localhost:3000/taskD/getAll/current',
        }).then((d) => {
            this.setState({data: d});
        }).catch(error => console.log(error));
    };

    getCalls = () => {
        this.setState({data: null})
        this.toggleNavs( 4)

        axios({
            method: 'get',
            url: 'http://localhost:3000/PhoneCalls/allWait',
        }).then((d) => {
            this.setState({data: d});

        }).catch(error => console.log(error));

    };
    toggleNavs = ( index) => {
        this.props.SET_TAB({index});
    };

    render() {

        return (
            <>
                <DemoNavbar/>
                        <main ref="main">
                            <div className="position-relative">
                                {/* shape Hero */}
                                <section className="section section-lg section-shaped ">
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
                                {/* 1st Hero Variation */}
                            </div>
                            <div className="  justify-content-center">
                        <div className="col mt-5 mt-lg-0" lg="6">
                            <div className="nav-wrapper">
                                <Nav
                                    className="nav-fill flex-column flex-md-row"
                                    id="tabs-icons-text"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.props.nbTab === 2}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.props.nbTab === 2
                                            })}
                                            onClick={e => this.getcurrent()}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            Current Tasks
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.props.nbTab === 3}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.props.nbTab === 3
                                            })}
                                            onClick={e => this.getwait()}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            New Tasks
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.props.nbTab === 4}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.props.nbTab === 4
                                            })}
                                            onClick={e => this.getCalls()}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            Calls
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <Card className="shadow">
                                <CardBody >
                                    <TabContent activeTab={"plainTabs" + this.props.nbTab}>
                                        <TabPane tabId="plainTabs2">
                                                <table className="table table-bordered" style={{textAlign: "center"}}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Caller</th>
                                                        <th scope="col">Nurce</th>
                                                        <th scope="col">Driver</th>
                                                        <th scope="col">Caller Location</th>
                                                        <th scope="col">Current Way</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.data && this.props.nbTab === 2 &&
                                                        <CurrentTask  data={this.state.data.data}/>}
                                                    </tbody>
                                                </table>
                                        </TabPane>
                                        <TabPane tabId="plainTabs3">
                                            <Button
                                                className="btn-outline-white btn-icon"
                                                color="info"
                                                to="/createnewtask-page" tag={Link}
                                                onClick={() => {
                                                }}><span className="nav-link-inner--text ml-1">Start New task manually</span>
                                            </Button>
                                           <table className="table table-bordered" style={{textAlign: "center"}}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Caller</th>
                                                        <th scope="col">Caller Location</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.data && this.props.nbTab === 3 &&
                                                        <NewTask  data={this.state.data.data}/>}
                                                    </tbody>
                                                </table>
                                        </TabPane>
                                        <TabPane tabId="plainTabs4">
                                            <table className="table table-bordered" style={{textAlign: "center"}}>
                                                <thead>
                                                <tr>
                                                    <th scope="col">Cin</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">LastName</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.data && this.props.nbTab === 4 &&
                                                <NewCalls  data={this.state.data.data}/>}
                                                </tbody>
                                            </table>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </main>
                <CardsFooter/>
            </>
        );
    }
}

const actions = {
    SET_TAB
};
const mapStateToProps = state => {
    const {nbTab} = state.NurceAmbulanceReducer;
    const {socket} = state.root;
    return {nbTab,socket};
};
export default connect(mapStateToProps, actions)(AmbulanceNurce);
