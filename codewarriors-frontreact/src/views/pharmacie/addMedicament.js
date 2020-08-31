import React,{Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import * as actions from "../../actions/UserAction";
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

class Modals extends React.Component {
    state = {
        defaultModal: false,
        ref_med : '',
        nom_med : '',
        quantite_med : 0,
    };


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleSubmit = (e) => {

        console.log(this.state);
        axios.post('http://localhost:3000/medicament',this.state).then( response => {
            console.log(response);
            console.log(this.props);
         this.toggleModal("formModal")
        })
    };


    render() {
        const {ref_med, nom_med, quantite_med, date_entree} = this.state;
        return (

            <>
                <Row>
                    <Col md="12">
                        <Button
                            block
                            color="success"
                            type="button"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            <span>    <svg className="bi bi-plus-circle" width="1.3em" height="1.3em" viewBox="0 0 16 16"
                                           fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
        clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
</svg>  Ajouter Médicament Au Stock </span>
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
                          <img
                              alt="..." height="35px"
                              src={require("assets/img/pharmacie.png")}
                          />
                        </span>
                                                <span className="btn-inner--text">Pharmacie Interne</span>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
<b>
                                                <svg className="bi bi-file-earmark-plus" width="1.5em" height="1.5em"
                                                     viewBox="0 0 16 16" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/>
                                                    <path fill-rule="evenodd"
                                                          d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z"
                                                          clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd"
                                                          d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                                                          clip-rule="evenodd"/>
                                                </svg> Ajouter le médicament au stock de pharmacie
</b>
                                        </div>
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-tag" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={this.handleChange} placeholder="Ref Médicament" name="ref_med" type="text" />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-atom" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={this.handleChange} placeholder="Nom Médicament" name="nom_med" type="text" />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-box-2" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={this.handleChange} placeholder="Quantite Médicament" name="quantite_med" type="number" />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button onClick={this.handleSubmit}
                                                    className="my-4"
                                                    color="success"
                                                    type="button"
                                                >
                                                    <i className="ni ni-check-bold" />  Valider
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

export default Modals
