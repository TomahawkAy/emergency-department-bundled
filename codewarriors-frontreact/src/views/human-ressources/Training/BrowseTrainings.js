import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_HOME_STYLE} from "../../../assets/css/customStyles";
import {Container} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import CardBody from "reactstrap/es/CardBody";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TrainingServices from "../../../services/TrainingServices";
import Preloader from "../../../components/extra/Preloader";
import {Redirect} from "react-router";

export class BrowseTrainings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {trainings: [], isFetched: false, training: '', requestedDetails: false};
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.moveToDetails = this.moveToDetails.bind(this);
    }

    componentDidMount() {
        TrainingServices.getTrainings().then((response) => {
            console.log(response.data.trainings);
            this.setState({trainings: response.data.trainings, isFetched: true})
        });
    }

    moveToDetails(_id) {
        this.setState({training: _id, requestedDetails: true});
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + window.btoa(binary);
    }

    render() {
        if (this.state.requestedDetails) {
            return (<Redirect to={'/requested-training/'+this.state.training}/>);
        } else
            return (<>
                <DemoNavbar/>
                <main>
                    <div className="position-relative">
                        {/* shape Hero */}
                        <section className="section section-lg section-shaped pb-200">
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
                                <div className="col px-5">
                                    <br/>
                                    <Card className="card-lift--hover"
                                          style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white'}}>
                                        <CardHeader className="text-center card-header"
                                                    style={{backgroundColor: 'rgba(0,0,0,0)'}}>Browse
                                            trainings</CardHeader>
                                        <CardBody>
                                            <Row>
                                                {!this.state.isFetched ? (<Preloader/>) :
                                                    this.state.trainings.map((training) => {
                                                        return (
                                                            <Col md={"4"} xl={"4"} xs={"12"} xl={"4"}
                                                                 key={training._id}>
                                                                <Card style={{marginTop: '0.9rem'}}>
                                                                    <CardActionArea>
                                                                        <CardMedia
                                                                            component="img"
                                                                            alt="Contemplative Reptile"
                                                                            height="140"
                                                                            image={this.arrayBufferToBase64(new Uint16Array(training.trainingImage.data.data))}
                                                                            title="Contemplative Reptile"
                                                                        />
                                                                        <CardContent>
                                                                            <Typography gutterBottom variant="h5"
                                                                                        component="h2">
                                                                                {training.name}
                                                                            </Typography>
                                                                            <Typography variant="body2"
                                                                                        color="textSecondary"
                                                                                        component="p">
                                                                                {training.description}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </CardActionArea>
                                                                    <CardActions>
                                                                    <span style={{color: '#bdbdbd'}}>
                                                                        <i className="fa fa-eye"></i>
                                                                        50
                                                                    </span>
                                                                        <Button size="small" color="primary" onClick={
                                                                            (e) => this.moveToDetails(training._id)
                                                                        }>
                                                                            See more
                                                                        </Button>
                                                                    </CardActions>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                                }


                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Container>

                        </section>

                    </div>
                </main>
            </>);
    }

}

export default BrowseTrainings;
