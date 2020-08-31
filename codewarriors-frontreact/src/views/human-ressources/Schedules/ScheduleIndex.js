import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_HOME_STYLE} from "../../../assets/css/customStyles";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import {Logs} from "../../../components/extra/Logs";
import Table from "reactstrap/es/Table";
import classnames from "classnames";
import $ from "jquery";
import {createSchedule, deleteSchedule, fetchSchedules} from "../../../services/SchedulesServices";
import Preloader from "../../../components/extra/Preloader";

export class ScheduleIndex extends React.Component {
    constructor(props) {
        super(props);
        this.submitSchedule = this.submitSchedule.bind(this);
        this.removeSchedule = this.removeSchedule.bind(this);
        this.state = {isFetched: false};
        this.state = {
            defaultModal: false,
            tabs: 1,
            schedules: [],
            isFetched: false
        }
    }

    removeSchedule(e, _id) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        deleteSchedule(options, {_id}).then((response) => {
            let removedItem = this.state.schedules.find((element) => element._id === response.data._id);
            if (removedItem !== undefined) {
                let index = this.state.schedules.indexOf(removedItem);
                let array = this.state.schedules;
                console.log(index);
                array.splice(index, 1);
                this.setState({schedules: array});
            } else console.log('element not found');
        })
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index,
        });
    };

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        fetchSchedules(options).then((response) => {
            this.setState({isFetched: true, schedules: response.data});
        });
    }

    submitSchedule(e) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let form = $('#scheduleModal');
        console.log(form.find('#workDays').val());
        console.log(form.find('#entryHour').val());
        let schedule = {
            name: form.find('#name').val(),
            workDays: form.find('#workDays').val(),
            entryHour: form.find('#entryHour').val(),
            exitHour: form.find('#exitHour').val(),
            toleranceEntry: form.find('#toleranceEntry').val(),
            toleranceExit: form.find('#toleranceExit').val(),
            penaltyPerMinute: form.find('#penaltyPerMinute').val(),
            penaltyPerDay: form.find('#penaltyPerDay').val(),
            maxDayPenEntryLimit: form.find('#maxDayPenEntryLimit').val(),
            maxDayPenExitLimit: form.find('#maxDayPenExitLimit').val(),
        };
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        createSchedule(options, schedule).then((response) => {
            let schedules = this.state.schedules;
            schedules.push(response.data);
            this.setState({schedules: schedules});
            this.toggleModal("formModal");
        });
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
                                                    style={{color: 'white'}}>Program working </h1>
                                                    <h4 style={{color: 'white'}}><b
                                                        style={{color: '84FF54'}}>schedules</b> and <b
                                                        style={{color: '84FF54'}}>appointments</b></h4>
                                                </CardHeader>
                                                <CardBody className="py-5">
                                                    <Row>
                                                        <Col md={"12"} xs={"12"} xl={"12"} className="text-center">
                                                            {!this.state.isFetched ? (<Preloader/>) :
                                                                this.state.schedules.length > 0 ? (
                                                                    <Table responsive style={{color: "white"}}>
                                                                        <thead>
                                                                        <tr>
                                                                            <td>Name</td>
                                                                            <th>Days</th>
                                                                            <th>Entry</th>
                                                                            <th>Exit</th>
                                                                            <th>Entry-tolerance</th>
                                                                            <th>Exit-tolerance</th>
                                                                            <th>Penalty/Minute</th>
                                                                            <th>Penalty/Day</th>
                                                                            <th>Day MAX(entry)</th>
                                                                            <th>Day MAX(exit)</th>
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {this.state.schedules.map((schedule) => {
                                                                            return (
                                                                                <tr key={schedule._id}>
                                                                                    <td>{schedule.name}</td>
                                                                                    <td>{schedule.workDays}</td>
                                                                                    <td>{schedule.entryHour}</td>
                                                                                    <td>{schedule.exitHour}</td>
                                                                                    <td>{schedule.toleranceEntry}</td>
                                                                                    <td>{schedule.toleranceExit}</td>
                                                                                    <td>{schedule.penaltyPerMinute}</td>
                                                                                    <td>{schedule.penaltyPerDay}</td>
                                                                                    <td>{schedule.maxDayPenEntryLimit}</td>
                                                                                    <td>{schedule.maxDayPenExitLimit}</td>
                                                                                    <td><Button
                                                                                        className="btn-icon btn-2"
                                                                                        color="warning"
                                                                                        type="button"
                                                                                        onClick={(e) => this.removeSchedule(e, schedule._id)}>
                                                                              <span className="btn-inner--icon">
                                                                                <i className="ni ni-fat-remove"/>
                                                                              </span>
                                                                                    </Button></td>
                                                                                </tr>)
                                                                        })
                                                                        }
                                                                        </tbody>
                                                                    </Table>) : (
                                                                    <h5 style={{color: 'white'}}>No schedule data
                                                                        found</h5>)}
                                                        </Col>
                                                    </Row>
                                                    <br/>
                                                    <Row>
                                                        <Col xs={"12"} md={"12"} xl={"12"} className="text-center">
                                                            <a href={"#!"} className={"btn btn-success"}
                                                               onClick={() => this.toggleModal("formModal")}>New
                                                                program</a>
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
                    <Modal
                        className="modal-dialog-centered"

                        isOpen={this.state.formModal}
                        toggle={() => this.toggleModal("formModal")}
                    >
                        <div className="modal-body p--2">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-5">
                                    <div className="nav-wrapper">
                                        <Nav
                                            className="nav-fill flex-column flex-md-row"
                                            id="tabs-icons-text"
                                            pills
                                            role="tablist"
                                        >
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.tabs === 1}
                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                        active: this.state.tabs === 1
                                                    })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                                    href="#pablo"
                                                    role="tab"
                                                >
                                                    <i className="fa fa-clock-o mr-2"/>
                                                    Entry/exit timing
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    aria-selected={this.state.tabs === 2}
                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                        active: this.state.tabs === 2
                                                    })}
                                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                                    href="#pablo"
                                                    role="tab"
                                                >
                                                    <i className="ni ni-money-coins mr-2"/>
                                                    Penalization
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5" id={"scheduleModal"}>
                                    <TabContent activeTab={"tabs" + this.state.tabs}>
                                        <TabPane tabId="tabs1">
                                            <h6 style={{color: '#979797'}}>schedule name</h6>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-badge"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Schedule name" type="text" id={"name"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h6 style={{color: '#979797'}}>working days</h6>
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-badge"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <select className="form-control" id="workDays" multiple>
                                                        <option value={1}>Monday</option>
                                                        <option value={2}>Tuesday</option>
                                                        <option value={3}>Wednesday</option>
                                                        <option value={4}>Thursday</option>
                                                        <option value={5}>Friday</option>
                                                        <option value={6}>Saturday</option>
                                                        <option value={0}>Sunday</option>
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <h6 style={{color: '#979797'}}>entry hour</h6>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fa fa-clock-o"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Entry hour" type="time" id={"entryHour"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>exit hour</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-mobile-button"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="exit hour" type="time" id={"exitHour"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>tolerance for entry</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="toleranceEntry" type="time"
                                                           id={"toleranceEntry"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>tolerance for exit</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-key-25"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="password" type="time" id={"toleranceExit"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>limit before day pen entry</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-tag"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="password" type="time"
                                                           id={"maxDayPenEntryLimit"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>limit before day pen exit</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-tag"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="password" type="time"
                                                           id={"maxDayPenExitLimit"}/>
                                                </InputGroup>
                                            </FormGroup>
                                        </TabPane>
                                        <TabPane tabId="tabs2">
                                            <h5 style={{color: '#979797'}}>Penalty sum by minute</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-ungroup"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="password" type="number"
                                                           id={"penaltyPerMinute"}/>
                                                </InputGroup>
                                            </FormGroup>
                                            <h5 style={{color: '#979797'}}>Penalty sum by day</h5>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-money-coins"/>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="penalty sum / day" type="number"
                                                           id={"penaltyPerDay"}/>
                                                </InputGroup>
                                            </FormGroup>
                                        </TabPane>
                                    </TabContent>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            onClick={(e) => this.submitSchedule(e)}
                                        >
                                            Create schedule
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                </main>
            </>

        );
    }
}

export default ScheduleIndex;
