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
    Row,
} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import {Logs} from "../../../components/extra/Logs";
import Table from "reactstrap/es/Table";
import {fetchSchedules} from "../../../services/SchedulesServices";
import {deleteDepartment, fetchDepartments, newDepartment} from "../../../services/DepatmentServices";
import $ from 'jquery';

export class DepartmentsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.createDepartment = this.createDepartment.bind(this);
        this.state = {defaultModal: false, schedules: [], departments: [], isFetched: false};
        this.removeDepartment = this.removeDepartment.bind(this);
    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    createDepartment(e) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        let form = $('#departmentModal');
        let department = {
            name: form.find('#name').val(),
            description: form.find('#description').val(),
            work_schedule: form.find("#work_schedule").val()
        };
        newDepartment(department, options).then((response) => {
            let departments = this.state.departments;
            departments.push(response.data);
            this.setState({departments: departments});
            this.toggleModal("formModal");
        })

    }

    removeDepartment(e, _id) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        deleteDepartment({_id}, options).then((response) => {
            let removedItem = this.state.departments.find((element) => element._id === response.data._id);
            if (removedItem !== undefined) {
                let index = this.state.departments.indexOf(removedItem);
                let array = this.state.departments;
                console.log(index);
                array.splice(index, 1);
                this.setState({departments: array});
            } else console.log('element not found');
        })
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        fetchDepartments(options).then((response) => {
            this.setState({departments: response.data});
            console.log(response.data);
        });
        fetchSchedules(options).then((response) => {
            console.log(response.data);
            this.setState({schedules: response.data, isFetched: true});
        })
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
                                                    style={{color: 'white'}}>Departments section</h1>
                                                </CardHeader>
                                                <CardBody className="py-5">
                                                    <Row>
                                                        <Col md={"12"} xs={"12"} xl={"12"} className="text-center">
                                                            <Table responsive style={{color: "white"}}>
                                                                <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>name</th>
                                                                    <th>Description</th>
                                                                    <th>Schedule</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.departments.map((department) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{""}</td>
                                                                            <td>{department.name}</td>
                                                                            <td>{department.description}</td>
                                                                            <td>{department.work_schedule.name}</td>
                                                                            <td><Button
                                                                                className="btn-icon btn-2"
                                                                                color="warning"
                                                                                type="button"
                                                                                onClick={(e) => this.removeDepartment(e, department._id)}>
                                                                              <span className="btn-inner--icon">
                                                                                <i className="ni ni-fat-remove"/>
                                                                              </span>
                                                                            </Button></td>
                                                                        </tr>)
                                                                })}
                                                                </tbody>
                                                            </Table>
                                                        </Col>
                                                    </Row>
                                                    <br/>
                                                    <Row>
                                                        <Col xs={"12"} md={"12"} xl={"12"} className="text-center">
                                                            <a href={"#!"} className={"btn btn-success"}
                                                               onClick={() => this.toggleModal("formModal")}>New
                                                                department</a>
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
                                <CardBody className="px-lg-5 py-lg-5" id={"departmentModal"}>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-badge"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="department name" type="text" id={"name"}/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-tag"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="department description" type="textarea" rows={3}
                                                   id={"description"}/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fa fa-clock-o"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <select className="form-control" id="work_schedule">
                                                {this.state.schedules.map((schedule => {
                                                    return (
                                                        <option key={schedule._id}
                                                                value={schedule._id}>{schedule.name}</option>
                                                    )
                                                }))}
                                            </select>
                                        </InputGroup>
                                    </FormGroup>

                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            onClick={(e) => this.createDepartment(e)}
                                        >
                                            Create department
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

export default DepartmentsIndex;
