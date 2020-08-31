import React from "react";
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import {Card, CardBody, Container, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import CardsFooter from "../../components/Footers/CardsFooter";
import {SET_TAB,SET_INTO_TAB} from "../../actions/AdminAmbulanceAction";
import {connect} from "react-redux";
import axios from "axios";
import LastTask from "./Admin/LastTask";
import LastCalls from "./Admin/LastCalls";
import CallsStatistics from "./Admin/CallsStatistics";
import TasksStatistics from "./Admin/TasksStatistics";

class AmbulanceAdmin extends React.Component {
    state = {
        data: null
    }


    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.getlastTasksTAB1();

        // this.props.socket.on('PhoneCallAmbulance', (data) => {
        //
        // });
    }

    getlastCalls = () => {
        this.setState({data: null});
        this.toggleNavs(2);
        this.getlastCallsTAB1();

    };
    getlastTasks = () => {
        this.setState({data: null});
        this.toggleNavs( 1);
        this.getlastTasksTAB1();


    };

    getlastCallsTAB1 = () => {
        this.setState({data: null})
        this.toggleNavsInto(21);


        axios({
            method: 'get',
            url: 'http://localhost:3000/PhoneCalls/Last',
        }).then((d) => {
            this.setState({data: d});

        }).catch(error => console.log(error));

    };
    getlastCallsTAB2 = () => {
        this.setState({data: null})
        this.toggleNavsInto(22);
        axios({
            method: 'get',
            url: 'http://localhost:3000/PhoneCalls/Last',
        }).then((d) => {
            this.setState({data: d});

        }).catch(error => console.log(error));

    };
    getlastTasksTAB1 = () => {
        this.setState({data: null})
        this.toggleNavsInto( 11)
        axios({
            method: 'get',
            url: 'http://localhost:3000/taskD/getAll/done',
        }).then((d) => {
            this.setState({data: d});

        }).catch(error => console.log(error));

    };
    getlastTasksTAB2 = () => {
        this.setState({data: null})
        this.toggleNavsInto( 12)
        axios({
            method: 'get',
            url: 'http://localhost:3000/taskD/getAll/done',
        }).then((d) => {
            this.setState({data: d});

        }).catch(error => console.log(error));

    };
    toggleNavsInto = ( index) => {
        this.props.SET_INTO_TAB({index});
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
                                            aria-selected={this.props.nbTab === 1}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.props.nbTab === 1
                                            })}
                                            onClick={e => this.getlastTasks()}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            Last Tasks
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            aria-selected={this.props.nbTab === 2}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: this.props.nbTab === 2
                                            })}
                                            onClick={e => this.getlastCalls()}
                                            href="#pablo"
                                            role="tab"
                                        >
                                            Last Calls
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <Card className="shadow">
                                <CardBody >
                                    <TabContent activeTab={"plainTabs" + this.props.nbTab}>
                                        <TabPane tabId="plainTabs1">
                                            <div className="nav-wrapper">
                                                <Nav
                                                    className="nav-fill flex-column flex-md-row"
                                                    id="tabs-icons-text"
                                                    pills
                                                    role="tablist"
                                                >
                                                    <NavItem>
                                                        <NavLink
                                                            aria-selected={this.props.intonbTab === 11}
                                                            className={classnames("mb-sm-3 mb-md-0", {
                                                                active: this.props.intonbTab === 11
                                                            })}
                                                            onClick={e => this.getlastTasksTAB1()}
                                                            href="#pablo"
                                                            role="tab"
                                                        >
                                                            tasks
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            aria-selected={this.props.intonbTab === 12}
                                                            className={classnames("mb-sm-3 mb-md-0", {
                                                                active: this.props.intonbTab === 12
                                                            })}
                                                            onClick={e => this.getlastTasksTAB2()}
                                                            href="#pablo"
                                                            role="tab"
                                                        >
                                                            stats
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </div>
                                            <Card className="shadow">
                                                <CardBody >
                                                    <TabContent activeTab={"plainTabsinto" + this.props.intonbTab}>
                                                        <TabPane tabId="plainTabsinto11">
                                                            <table className="table table-bordered" style={{textAlign: "center"}}>
                                                                <thead>
                                                                <tr>
                                                                    <th scope="col">Caller</th>
                                                                    <th scope="col">Nurce</th>
                                                                    <th scope="col">Driver</th>
                                                                    <th scope="col">Caller Location</th>
                                                                    <th scope="col">Date</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.data && this.props.intonbTab === 11 &&
                                                                <LastTask  data={this.state.data.data}/>}
                                                                </tbody>
                                                            </table>
                                                        </TabPane>
                                                        <TabPane tabId="plainTabsinto12">
                                                            {this.state.data && this.props.intonbTab === 12 &&
                                                            <TasksStatistics  data={this.state.data.data}/>}
                                                        </TabPane>

                                                    </TabContent>
                                                </CardBody>
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="plainTabs2">
                                            <div className="nav-wrapper">
                                                <Nav
                                                    className="nav-fill flex-column flex-md-row"
                                                    id="tabs-icons-text"
                                                    pills
                                                    role="tablist"
                                                >
                                                    <NavItem>
                                                        <NavLink
                                                            aria-selected={this.props.intonbTab === 21}
                                                            className={classnames("mb-sm-3 mb-md-0", {
                                                                active: this.props.intonbTab === 21
                                                            })}
                                                            onClick={e => this.getlastCallsTAB1()}
                                                            href="#pablo"
                                                            role="tab"
                                                        >
                                                            Calls
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            aria-selected={this.props.intonbTab === 22}
                                                            className={classnames("mb-sm-3 mb-md-0", {
                                                                active: this.props.intonbTab === 22
                                                            })}
                                                            onClick={e => this.getlastCallsTAB2()}
                                                            href="#pablo"
                                                            role="tab"
                                                        >
                                                            stats
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </div>
                                            <Card className="shadow">
                                                <CardBody >
                                                    <TabContent activeTab={"plainTabsinto" + this.props.intonbTab}>
                                                        <TabPane tabId="plainTabsinto21">
                                                            <table className="table table-bordered" style={{textAlign: "center"}}>
                                                                <thead>
                                                                <tr>
                                                                    <th scope="col">Cin</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">LastName</th>
                                                                    <th scope="col">Phone Number</th>
                                                                    <th scope="col">Email</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">State</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.data && this.props.intonbTab === 21 &&
                                                                <LastCalls  data={this.state.data.data}/>}
                                                                </tbody>
                                                            </table>
                                                        </TabPane>
                                                        <TabPane tabId="plainTabsinto22">
                                                            {this.state.data && this.props.intonbTab === 22 &&
                                                            <CallsStatistics  data={this.state.data.data}/>}
                                                        </TabPane>

                                                    </TabContent>
                                                </CardBody>
                                            </Card>
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
    SET_TAB,SET_INTO_TAB
};
const mapStateToProps = state => {
    const {nbTab,intonbTab} = state.AdminAmbulanceReducer;
    const {socket} = state.root;

    return {nbTab,socket,intonbTab};
};
export default connect(mapStateToProps, actions)(AmbulanceAdmin);
