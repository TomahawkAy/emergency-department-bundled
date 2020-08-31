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
import {deletePersonnel, newPersonnel, retreivePersonnels} from "../../../services/UserServices";
import Preloader from "../../../components/extra/Preloader";
import {fetchDepartments} from "../../../services/DepatmentServices";


export class StaffIndex extends React.Component {

    constructor(props) {
        super(props);
        this.submitUser = this.submitUser.bind(this);
        this.removeStaff = this.removeStaff.bind(this);
        this.fileChanged = this.fileChanged.bind(this);

        this.state = {
            defaultModal: false,
            tabs: 1,
            staff: [],
            isFetched: false,
            departments: [],
        };
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

    fileChanged(e) {
        this.state.image = e.target.files[0];
        console.log(this.state.image);
    }

    submitUser(e) {
        let formData = new FormData();
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let form = $('#staffModal');
        console.log(session.token);
        let staff = {
            name: form.find('#nameInput').val(),
            lastName: form.find('#lastNameInput').val(),
            phoneNumber: form.find('#phoneInput').val(),
            email: form.find('#emailInput').val(),
            password: form.find('#passwordInput').val(),
            role: form.find('#roleInput').val(),
            staffType: form.find('#staffTypeInput').val(),
            salary: form.find('#baseSalaryInput').val(),
            department: form.find('#departmentInput').val(),
            cin: form.find('#cinInput').val(),
        };
        formData.append('staff', JSON.stringify(staff));
        formData.append('image', this.state.image);
        console.log(staff);
        let options = {
            headers: {
                'Authorization': String(session.token),
                'Content-Type': 'multipart/form-data'
            }
        };
        newPersonnel(options, formData).then((data) => {
            this.state.staff.push(data.data);
            this.toggleModal("formModal");
        });
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        fetchDepartments(options).then((departments) => {
            this.setState({departments: departments.data});
            console.log(this.state.departments);
        });
        retreivePersonnels(options).then((result) => {
            this.setState({staff: result.data, isFetched: true});
            console.log(result.data);
        });

    }

    removeStaff(e, _id) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        deletePersonnel(options, {_id}).then((response) => {
            let removedItem = this.state.staff.find((element) => element.user_id === response.data._id);
            if (removedItem !== undefined) {
                let index = this.state.staff.indexOf(removedItem);
                let array = this.state.staff;
                console.log(index);
                array.splice(index, 1);
                this.setState({staff: array});
            } else console.log('element not found');
        })
    }

    render() {
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
                                                        {!this.state.isFetched ? (<Preloader/>) :
                                                            this.state.staff.length > 0 ? (
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
                                                                            <th>penalties</th>
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {this.state.staff.map((staff) => {
                                                                            console.log(staff);
                                                                            return (
                                                                                <tr key={staff.user_id}>
                                                                                    <th scope="row">{""}</th>
                                                                                    <td>{staff.name + ' ' + staff.lastName}</td>
                                                                                    <td>{staff.phoneNumber}</td>
                                                                                    <td>{staff.email}</td>
                                                                                    <td>{staff.role + '-' + staff.staffType}</td>
                                                                                    <td>{staff.grade}</td>
                                                                                    <td>{staff.salary + ' Dt'}</td>
                                                                                    <td>
                                                                                        {staff.appointments !== undefined ?
                                                                                            staff.appointments.reduce((accum,item) => accum + item.salaryPen, 0) : 0}
                                                                                            Dt
                                                                                    </td>
                                                                                    <td><Button className="btn-icon btn-2"
                                                                                                color="warning"
                                                                                                type="button"
                                                                                                onClick={(e) => this.removeStaff(e, staff.user_id)}>
                                                                              <span className="btn-inner--icon">
                                                                                <i className="ni ni-fat-remove"/>
                                                                              </span>
                                                                                    </Button></td>
                                                                                </tr>)
                                                                        })}

                                                                        </tbody>
                                                                    </Table>)
                                                                : (
                                                                    <h5 style={{color: 'white'}}>No staff data found</h5>)
                                                        }

                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col xs={"12"} md={"12"} xl={"12"} className="text-center">
                                                        <a href={"#!"} className={"btn btn-success"}
                                                           onClick={() => this.toggleModal("formModal")}>New
                                                            personnel</a>
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
                                                <i className="fa fa-info mr-2"/>
                                                Personnel infos
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
                                                <i className="ni ni-badge mr-2"/>
                                                Personnel settings
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5" id={"staffModal"}>
                                <TabContent activeTab={"tabs" + this.state.tabs}>
                                    <TabPane tabId="tabs1">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="name" type="text" id={"nameInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-badge"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="last name" type="text" id={"lastNameInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-mobile-button"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="phone" type="number" id={"phoneInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-credit-card"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="cin" type="number" id={"cinInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="email" type="email" id={"emailInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-key-25"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="password" type="password" id={"passwordInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="image" className="form-control" type="file"
                                                       id={"imageInput"} onChange={(e) => this.fileChanged(e)}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-tag"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <select
                                                    className="form-control"
                                                    id={"roleInput"}>

                                                    <option value={"select staff role"} disabled>
                                                        select staff role
                                                    </option>
                                                    <option value={"admin"}>
                                                        Admin
                                                    </option>
                                                    <option value={"doctor"}>
                                                        Doctor
                                                    </option>
                                                    <option value={"driver"}>
                                                        Emergency transportation
                                                    </option>
                                                    <option value={"patient"}>
                                                        Patient
                                                    </option>
                                                    <option value={"nurse"}>
                                                        Nurse
                                                    </option>
                                                    <option value={"pharmacist"}>
                                                        Pharmacist
                                                    </option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </TabPane>
                                    <TabPane tabId="tabs2">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-ungroup"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <select
                                                    className="form-control"
                                                    id={"staffTypeInput"}>
                                                    <option value={"select staff type"} disabled>
                                                        select staff type
                                                    </option>
                                                    <option value={"intern"}>
                                                        Intern
                                                    </option>
                                                    <option value={"fullTime"}>
                                                        Full time
                                                    </option>
                                                    <option value={"freelance"}>
                                                        Freelance
                                                    </option>
                                                    <option value={"partTime"}>
                                                        Part time
                                                    </option>
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-money-coins"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="base salary" type="number" id={"baseSalaryInput"}/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-ungroup"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <select
                                                    className="form-control"
                                                    id={"departmentInput"}>
                                                    <option value={"select staff department"} disabled>
                                                        assign a department
                                                    </option>
                                                    {this.state.departments.map((dep) => {
                                                        return (
                                                            <option key={dep._id} value={dep._id}>{dep.name}</option>)
                                                    })}
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </TabPane>
                                </TabContent>
                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="button"
                                        onClick={(e) => this.submitUser(e)}
                                    >
                                        Create staff
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>
            </main>
        </>);
    }

}

export default StaffIndex;
