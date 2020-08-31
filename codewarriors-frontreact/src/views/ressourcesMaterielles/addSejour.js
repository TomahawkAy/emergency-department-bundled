import React,{Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import * as actions from "../../actions/UserAction";
import "./sejour.css";
import ReactDatetime from "react-datetime";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";

import CardsFooter from "../../components/Footers/CardsFooter";

class addSejour extends React.Component {
    state = {
        arrayOfPatientAndNurse: [],
        arrayOfFreeLit: [],
        defaultModal: false,
        date_debut : new Date(),
        date_fin : new Date(),
        lit: '',
        patient: '',
        nurse: '',
    };

    componentDidMount() {

        const script2 = document.createElement("script");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        axios.get('http://localhost:3000/').then( response  => {
            this.setState({
                arrayOfPatientAndNurse: response.data
            });
        });
        axios.get('http://localhost:3000/lit').then( response  => {
            this.setState({
                arrayOfFreeLit: response.data
            });
        })
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    onChangeDateDebut = date_debut => this.setState({ date_debut });
    onChangeDateFin = date_fin => this.setState({ date_fin });

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    };


    handleSubmit = (e) => {
        console.log(this.state);
        axios.post('http://localhost:3000/sejour',this.state).then( response => {
            console.log(response);
            this.toggleModal("formModal")
        })

    };


    render() {
        let arrayOfPatientAndNurse = this.state.arrayOfPatientAndNurse;
        let ArrayOfPatient =  arrayOfPatientAndNurse.filter(o => o.role==='patient');
        let filtredArrayOfFreeNurse =  arrayOfPatientAndNurse.filter(o => o.statusNurse === 'libre' && o.role==='nurse');
        let arrayOfLit = this.state.arrayOfFreeLit;
        let filtredArrayOfFreeLit =  arrayOfLit.filter(o => o.status_lit === 'libre');
        let patientOptions = ArrayOfPatient.map((data) =>
            <option
                key={data._id}
                value={data._id}
            >
                {data.name}
            </option>
        )
        let nurseOptions = filtredArrayOfFreeNurse.map((data) =>
            <option
                key={data._id}
                value={data._id}
            >
                {data.name}
            </option>
        )
        let litOptions = filtredArrayOfFreeLit.map((data) =>
            <option
                key={data._id}
                value={data._id}
            >
                {data.num_lit}
            </option>
        )

        const {} = this.state;
        return (

            <>
                <Row>
                    <Col md="12">
                        <Button
                            block
                            color="info"
                            type="button"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            <i className="fas fa-clinic-medical ni-2x"> </i> Mettre en place un séjour hospitalier
                        </Button>
                        <Modal
                            className="modal-dialog-centered"
                            size="sm"
                            isOpen={this.state.formModal}
                            toggle={() => this.toggleModal("formModal")}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-5">
                                        <div className="text-muted text-center mt-2 mb-3">

                                        </div>
                                        <div className="btn-wrapper text-center">

                                            <Button
                                                className="btn-neutral btn-icon"
                                                color="default"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                            >
                        <span className="btn-inner--icon">
                            <i className="fas fa-hospital ni-2x"> </i>
                        </span>
                                                <span className="btn-inner--text">Séjour Hospitalier</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form role="form">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-procedures "></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>

                                                    <select className="form-control"  name="lit" onChange={this.handleChange}>
                                                        <option>Choisir le Lit</option>
                                                        {litOptions}
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                 <i className="fas fa-head-side-cough"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>

                                                    <select className="form-control"  name="patient" onChange={this.handleChange}>
                                                        <option>Choisir le patient</option>
                                                        {patientOptions}
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-user-nurse"> </i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>

                                                    <select className="form-control"  name="nurse" onChange={this.handleChange}>
                                                        <option>Choisir l'inférmiére</option>
                                                        {nurseOptions}
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-calendar-grid-58" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <ReactDatetime
                                                        onChange={this.onChangeDateDebut}
                                                        value={this.state.date_debut}
                                                        inputProps={{
                                                            placeholder: "Date Debut Séjour"
                                                        }}
                                                        timeFormat={true}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-calendar-grid-58" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <ReactDatetime
                                                        onChange={this.onChangeDateFin}
                                                        value={this.state.date_fin}
                                                        inputProps={{
                                                            placeholder: "Date Fin Séjour"
                                                        }}
                                                        timeFormat={true}
                                                    />
                                                </InputGroup>
                                            </FormGroup>

                                            <div className="text-center">
                                                <Button onClick={this.handleSubmit}
                                                        className="my-4"
                                                        color="info"
                                                        type="button"
                                                >
                                                    <svg className="bi bi-check-circle" width="1.5em" height="1.5em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z"
                                                              clip-rule="evenodd"/>
                                                        <path fill-rule="evenodd"
                                                              d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z"
                                                              clip-rule="evenodd"/>
                                                    </svg>  Valider Le Séjour
                                                </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
                    </Col>
                </Row>

            </>
        );
    }
}
const mapStateToProps = state => {
    const {_id, role, name, email, LoggedIn} = state.UserReducer;
    return {_id, role, name, email, LoggedIn};
};
export default connect(mapStateToProps, actions) (addSejour);
