import {connect} from "react-redux";
import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import TrainingServices from "../../../services/TrainingServices";
import {BACKGROUND_NEW_TRAINING_STYLE} from "../../../assets/css/customStyles";
import {Container} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExtensionIcon from '@material-ui/icons/Extension';
import {Card, Typography} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export class TrainingViewer extends React.Component {
    constructor(params) {
        super(params);
        console.log(params.match.params.id);
        this.state = {
            lessons: [],
            currentLesson: 0
        };
        this.arrayBufferToBase64 = this.arrayBufferToBase64.bind(this);
        this.changeTraining = this.changeTraining.bind(this);
    }

    componentDidMount() {
        TrainingServices.getTrainingDetailsById(this.props.match.params.id).then((response) => {
            console.log(response.data);
            this.setState({currentItem:response.data[0],lessons: response.data});
            console.log(this.state.currentItem)
        })
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        console.log('data:video/mp4;base64,' + window.btoa(binary));
        return 'data:video/mp4;base64,' + window.btoa(binary);
    }

    changeTraining(e, id) {
        let item = this.state.lessons.find((lesson) => lesson.lesson._id === id);
        if (item !== undefined) {
            console.log('found...');
            this.setState({currentItem: item});
        }
        ;
    }

    render() {
        const listStyle = {
            maxWidth: 360,
            backgroundColor: "white",
            color: '#757575'
        };
        return (<>
            <DemoNavbar/>
            <main>
                <div className="position-relative">
                    {/* shape Hero */}
                    <section className="section section-lg section-shaped pb-200">
                        <div className="shape shape-style-1 shape-default" style={BACKGROUND_NEW_TRAINING_STYLE}
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
                        <br/><br/><br/><br/><br/><br/>
                        <Container className="py-lg-md d-flex">
                            <div className="col px-5">
                                <Row>
                                    <Col md={"4"} xl={"4"} xs={"12"}>
                                        <List component="nav" className="" aria-label="contacts" style={listStyle}>
                                            {this.state.lessons.map((single) => {
                                                return (
                                                    <ListItem button key={single.lesson._id}>
                                                        <ListItemIcon>
                                                            <ExtensionIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={single.section.name + '-' +
                                                        single.lesson.name}
                                                                      onClick={(e) => this.changeTraining(e, single.lesson._id)}/>
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </Col>
                                    {this.state.lessons.length >= 1 ? (
                                        <Col md={"8"} xl={"8"} xs={"12"}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="iframe"
                                                        alt="Contemplative Reptile"
                                                        height="400"
                                                        src={"http://localhost:3000/training/streamVideo/"+this.state.currentItem.lesson._id}
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            Text content
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {this.state.currentItem.lesson.textContent}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        Rate this course
                                                    </Button>
                                                    <Button size="small" color="primary">
                                                        see progress
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Col>
                                    ) : (<></>)}
                                </Row>
                            </div>
                        </Container>
                    </section>
                </div>
            </main>
        </>)
    }
}

export default connect()(TrainingViewer);
