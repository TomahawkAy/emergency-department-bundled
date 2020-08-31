import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import * as actions from "../../actions/UserAction";
import "./pharmacie.css";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    Row
} from "reactstrap";

class addOrdonnance extends React.Component {
    state = {
        arrayOfData: [],
        arrayOfChambres: [],
        defaultModal: false,
        medicament: '',
        quantite_med_ordonnance: 0,
        user: '',
        chambre: ''
    };

    componentDidMount() {
        const script2 = document.createElement("script");

        script2.src = "https://kit.fontawesome.com/a076d05399.js";
        script2.async = true;

        document.body.appendChild(script2);

        axios.get('http://localhost:3000/medicament').then(response => {
            this.setState({
                arrayOfData: response.data
            });
        })
        axios.get('http://localhost:3000/chambre').then(response => {
            this.setState({
                arrayOfChambres: response.data
            });
        })
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleChange = (e) => {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({
            [e.target.name]: e.target.value,
            user: session.user._id,
        })
    };

    handleSubmit = (e) => {
        console.log(this.state);
        axios.post('http://localhost:3000/ordonnance', this.state).then(response => {
            console.log(response);
            this.toggleModal("formModal")
        })

    };


    render() {
        let arrayOfData = this.state.arrayOfData;
        let arrayOfChambres = this.state.arrayOfChambres;
        let options = arrayOfData.map((data) =>
            <option
                key={data._id}
                value={data._id}
            >
                {data.nom_med}
            </option>
        );
        let chambreOptions = arrayOfChambres.map((data) =>
            <option
                key={data._id}
                value={data._id}
            >
                {data.num_chambre}
            </option>
        )
        const {medicament, quantite_med_ordonnance} = this.state;
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
                            <i className="fas fa-notes-medical ni-2x"> </i> Passer Une Ordonnnace
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
                            <i className="fas fa-file-medical ni-2x"> </i>
                        </span>
                                                <span className="btn-inner--text">Ordonnance Medicale</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form role="form">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-clinic-medical"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>

                                                    <select className="form-control" name="chambre"
                                                            onChange={this.handleChange}>
                                                        <option>Choisir la chambre</option>
                                                        {chambreOptions}
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-capsules"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>

                                                    <select className="form-control" name="medicament"
                                                            onChange={this.handleChange}>
                                                        <option>Choisir le médicament</option>
                                                        {options}
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="fas fa-prescription-bottle-alt"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={this.handleChange}
                                                           placeholder="Quantite Médicament"
                                                           name="quantite_med_ordonnance" type="number"/>
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
                                                    </svg>
                                                    Passer L'Ordonnance
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
export default connect(mapStateToProps, actions)(addOrdonnance);
