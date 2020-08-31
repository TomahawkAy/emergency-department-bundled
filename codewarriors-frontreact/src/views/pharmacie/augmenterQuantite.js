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

class AugmenterQuantite extends React.Component {

    constructor(props) {
        super(props);
    }


    state = {
        defaultModal: false,
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

    handleSubmit = () => {
       axios.put('http://localhost:3000/medicament/'+this.props.idMed,this.state).then( response => {
            this.toggleModal("formModal")
        })
    };


    render() {
        const {quantite_med} = this.state;
        return (

            <>


                        <Button
                            color="info"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            <svg className="bi bi-graph-up" width="1.3em" height="1.3em" viewBox="0 0 16 16"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/>
                                <path fill-rule="evenodd"
                                      d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z"
                                      clip-rule="evenodd"/>
                                <path fill-rule="evenodd"
                                      d="M10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4h-3.5a.5.5 0 01-.5-.5z"
                                      clip-rule="evenodd"/>
                            </svg>    Augmanter Quantite
                        </Button>
                        <Modal
                            backgroundColor="red"
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
                                                <svg className="bi bi-bookmark-plus" width="1.7em" height="1.7em"
                                                     viewBox="0 0 16 16" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4zm9-1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z"
                                                          clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd"
                                                          d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                                                          clip-rule="evenodd"/>
                                                </svg> Saisir la quantité supplémentaire</b>
                                        </div>
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <svg className="bi bi-layers" width="1em" height="1em"
                                                                 viewBox="0 0 16 16" fill="currentColor"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd"
                                                                      d="M3.188 8L.264 9.559a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882L12.813 8l-1.063.567L14.438 10 8 13.433 1.562 10 4.25 8.567 3.187 8z"
                                                                      clip-rule="evenodd"/>
                                                                <path fill-rule="evenodd"
                                                                      d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input onChange={this.handleChange} placeholder="Quantite Médicament" name="quantite_med" type="number" />
                                                </InputGroup>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button onClick={()=>this.handleSubmit()}
                                                        className="my-4"
                                                        color="primary"
                                                        type="button"
                                                >
                                                    <svg className="bi bi-check-circle" width="1.3em" height="1.3em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                              d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z"
                                                              clip-rule="evenodd"/>
                                                        <path fill-rule="evenodd"
                                                              d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z"
                                                              clip-rule="evenodd"/>
                                                    </svg>  Valider
                                                </Button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
            </>
        );
    }
}

export default AugmenterQuantite;
