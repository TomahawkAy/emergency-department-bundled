import React from "react";
import './chest.css'
import $ from 'jquery';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

import {
    Card, CardImg, CardText, CardBody,Progress,
    Modal, TextField, CardTitle, CardSubtitle, CardLink, Button, Container, Col,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";

class Chest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            data: [],
            value: ''
        };


    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    componentDidMount () {

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


    }

    componentWillMount() {

    }

    componentDidUpdate() {

    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    render() {

        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

        // the link to your model provided by Teachable Machine export panel
        const URL = "https://teachablemachine.withgoogle.com/models/_5_Pc6y14/";

        let model, webcam, labelContainer, maxPredictions;

        // Load the image model and setup the webcam

        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();


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


        }


        async function loop() {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
        }


        let images = $('#selected-image').get(0);

        // run the webcam image through the image model
        async function predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(images);
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
        }



        const { data, value } = this.state;
        return (

            <>
                <DemoNavbar/>

                <section className="section section-lg section-shaped pb-250">
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
                <div className="container-fluid" >
                    <div className="main">
                        <Col sm="12">
                            <h1 align="center" className="display-4 mb-0">Chest X-Ray Pneumonie Détection Et Prédiction  </h1>
                        </Col>
                        <main role="main" className="container-fluid mt-5">
                            <div className="row">
                                <div className="col-12">
                                    <Progress bar animated striped color="info" value="100" >Loading
                                        Teachable Machine Learning Image Model</Progress>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-6">
                                        <input id="image-selector" className="form-control" type="file"/>
                                </div>
                            </div>

                                <div className="row">
                                    <div className="col-6">
                                        <h2>X-Ray Image</h2>
                                        <img id="selected-image" width="250" alt=""/>
                                    </div>
                                    <div className="col-6">
                                        <h2 >Predictions</h2>
                                        <div id="label-container"></div>
                                    </div>
                                </div>
                        </main>


                        <div id="webcam-container"></div>
                        <div id="label-container"></div>
                        <br/>
                        <div className="row">
                            <div className="col-4">
                            </div>
                            <div className="col-8">
                        <button type="button"  className="btn btn-info" id="btn"><i className="fas fa-lungs-virus ni-2x" ></i> Start Prediction </button>
                            </div>
                        </div>

                    </div>

                </div>

                <CardsFooter/>

            </>
        );
    }
}


export default Chest ;
