import React from "react";
// reactstrap components
import {Button, Card, Col, Container, Modal, Row} from "reactstrap";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import $ from "jquery";
import * as tmImage from "@teachablemachine/image";


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            btnColor: "",
            nbr: 0,
            intervalCounter1: 0,
            intervalCounter2: 0,
            borderColor: "",
            listRdv: [],
            session:null
        }
    }

    componentDidMount() {



        const scriptTidio = document.createElement("script");

        scriptTidio.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        scriptTidio.async = true;

        document.body.appendChild(scriptTidio );

        const script0 = document.createElement("script");

        script0.src = "https://kit.fontawesome.com/a076d05399.js";
        script0.async = true;

        document.body.appendChild(script0);

        const script = document.createElement("script");

        script.src = "https://code.jquery.com/jquery-3.3.1.slim.min.js";
        script.integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo";
        script.crossOrigin = "anonymous";
        script.async = true;

        document.body.appendChild(script);

        const script2 = document.createElement("script2");

        script2.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js";
        script2.integrity = "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1";
        script2.crossOrigin = "anonymous";
        script2.async = true;

        document.body.appendChild(script2);

        const script3 = document.createElement("script3");

        script3.src = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
        script3.integrity = "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM";
        script3.crossOrigin = "anonymous";
        script3.async = true;

        document.body.appendChild(script3);

        const script4 = document.createElement("script4");

        script4.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.2/dist/tf.min.js";
        script4.async = true;
        script.crossOrigin = "anonymous";

        document.body.appendChild(script4);

        const script5 = document.createElement("script5");

        script5.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js";
        script5.async = true;
        script.crossOrigin = "anonymous";

        document.body.appendChild(script5);

        const script6 = document.createElement("script6");

        script6.src = "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js";
        script6.async = true;
        script.crossOrigin = "anonymous";

        document.body.appendChild(script6);

        $("#image-selector").change(function () {
            let reader = new FileReader();
            reader.onload = function () {
                let dataURL = reader.result;
                $("#selected-image").attr("src", dataURL);
                $("#prediction-list").empty();
            }

            let file = $("#image-selector").prop('files')[0];
            reader.readAsDataURL(file);
            console.log('aaa');
        });



        $( document ).ready(async function () {
            $('.progress-bar').show();
        });



        var images = $('#selected-image').get(0);
        console.log(images);

        $( "#btn" ).click(async function() {

            const URL = "https://teachablemachine.withgoogle.com/models/Xg12no3-A/";

            let model, webcam, labelContainer, maxPredictions;

            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            async function loop() {
                webcam.update(); // update the webcam frame
                await predict();
                window.requestAnimationFrame(loop);
            }

            // Convenience function to setup a webcam
            const flip = false; // whether to flip the webcam
            webcam = new tmImage.Webcam(1, 1, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(loop);

            // append elements to the DOM
            document.getElementById("webcam-container").appendChild(webcam.canvas);
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"));
            }

            async function predict() {
                // predict can take in an image, video or canvas html element
                const prediction = await model.predict(images);
                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    labelContainer.childNodes[i].innerHTML = classPrediction;
                }
            }

        });












        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;


        let today = new Date();
        let date = today.getFullYear() + '-' + ((today.getMonth() + 1).toString().padStart(2, '0')) + '-' + today.getDate().toString().padStart(2, '0');
        //let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let time = today.getHours().toString().padStart(2, '0') + ":00:00";
        let dateTime = date + 'T' + time;
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.setState({session: session});
        axios.get(`http://localhost:3000/findRdvByDateDoctor/${dateTime}/${session.user._id}`).then(
            res => {
                // console.log("listRdv= ",res.data)
                this.setState({
                    listRdv: res.data
                })
            }
        ).catch(err => console.log(err))

        this.start()

    }

    ifConnected() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        if (this.props.user_connected)
            return <div className="text-center mt-5">

                <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2"/>
                    role :{session.user.role}
                </div>
                <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2"/>
                    name :{session.user.name}
                </div>
                <div>
                    <i className="ni education_hat mr-2"/>
                    email :{session.user.email}
                </div>
            </div>
    }

    change1 = () => {
        this.setState({
            intervalCounter1: setInterval(
                () => {
                    this.setState({
                        btnColor: "white",
                        nbr: this.state.nbr + 1,
                        borderColor: "white"
                    })
                }
                , 400)
        })


    }
    change2 = () => {
        this.setState({
            intervalCounter2: setInterval(
                () => {
                    this.setState({
                        btnColor: "",

                    })
                }
                , 800)
        })


    }

    start = () => {

        this.change1();
        this.change2();
    }

    state = {};
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });

        clearInterval(this.state.intervalCounter1);
        clearInterval(this.state.intervalCounter2);
        this.setState({
            btnColor: "",

        })
    };

    render() {


        return (
            <>
                <DemoNavbar/>
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                            <span/>
                        </div>
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
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-4">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={require(`assets/img/admin.png`)}
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col
                                            className="order-lg-3 text-lg-right align-self-lg-center"
                                            lg="4"
                                        >
                                            <div className="card-profile-actions py-4 mt-lg-0">

                                            </div>
                                        </Col>
                                        <Col className="order-lg-1" lg="4">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading"> </span>
                                                    <span className="description"> </span>
                                                </div>
                                                <div>
                                                    <span className="heading"> </span>
                                                    <span className="description">


                                                        <br/> <br/>
                                                        {this.state.listRdv.length > 1 ?
                                                            <button
                                                                type="button"
                                                                style={{
                                                                    backgroundColor: this.state.btnColor,
                                                                    borderColor: this.state.borderColor
                                                                }}
                                                                className="btn btn-danger doctor-btn-urgent"
                                                                onClick={() => this.toggleModal("notificationModal")}
                                                            >Urgent
                                                            </button>
                                                            : ""}

                                                        {this.state.listRdv.length > 1 ? <Modal
                                                            className="modal-dialog-centered modal-danger"
                                                            contentClassName="bg-gradient-danger"
                                                            isOpen={this.state.notificationModal}
                                                            toggle={() => this.toggleModal("notificationModal")}
                                                        >
                                                            <div className="modal-header">
                                                                <h6 className="modal-title"
                                                                    id="modal-title-notification">
                                                                    Your attention is required
                                                                </h6>
                                                                <button
                                                                    aria-label="Close"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    type="button"
                                                                    onClick={() => this.toggleModal("notificationModal")}
                                                                >
                                                                    <span aria-hidden={true}>×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="py-3 text-center">
                                                                    <i className="ni ni-bell-55 ni-3x"/>
                                                                    <h4 className="heading mt-4">Patient: {this.state.listRdv ? this.state.listRdv[0].text : ""}</h4>
                                                                    <h4 className="heading mt-4"> Etat: {this.state.listRdv[0].analyses ? this.state.listRdv[0].analyses.statePatient : ""} </h4>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <Link
                                                                    to={`/patient_details/${this.state.listRdv[0].patient}`}>

                                                                    <Button
                                                                        className="btn-white"
                                                                        color="default"
                                                                        data-dismiss="modal"
                                                                        type="button"
                                                                        onClick={() => this.toggleModal("notificationModal")}
                                                                    >
                                                                        Afficher les details
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </Modal> : ""}

                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="heading"> </span>
                                                    <span className="description"> </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


                                    {this.ifConnected()}


                                    <div className="mt-5 py-5 border-top text-center">
                                        <Row className="justify-content-center">
                                            <Col lg="9">
                                                {this.state.session !== null ?
                                                    this.props.role === "doctor" ?
                                                        <Link to={`/patients_list/${this.state.session.user._id}`}>

                                                            <Button

                                                                color="default"
                                                                href="#pablo"
                                                                //onClick={e => e.preventDefault()}
                                                                size="sm"
                                                            >
                                                                Afficher Calendrier
                                                            </Button>
                                                        </Link> :
                                                        '': (<></>)}



                                                {this.state.session !== null ?
                                                    this.props.role === "patient" ?
                                                        <Link
                                                            to={`/blood_pressure_calculator/${this.state.session.user._id}`}>

                                                            <Button

                                                                color="default"
                                                                href="#pablo"
                                                                //onClick={e => e.preventDefault()}
                                                                size="sm"
                                                            >
                                                                Afficher mes informations
                                                            </Button>
                                                        </Link> :
                                                        '': (<></>)}





                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </section>
                </main>
                <SimpleFooter/>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.UserReducer.covid19);
    const {_id, role, name, email, LoggedIn} = state.UserReducer;
    return {
        user_connected: state.UserReducer.user_connected,
        role: state.UserReducer.role
        , name, email, LoggedIn

    }
};
export default connect(mapStateToProps, null)(Profile);
