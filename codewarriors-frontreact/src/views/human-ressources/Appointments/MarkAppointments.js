import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_HOME_STYLE} from "../../../assets/css/customStyles";
import CardHeader from "reactstrap/es/CardHeader";
import {Button, Card, Container} from "@material-ui/core";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import CardBody from "reactstrap/es/CardBody";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {fetchAppointments, signAppointment} from "../../../services/AppointmentService";
export class MarkAppointments extends React.Component {
    constructor(props) {
        super(props);
        this.markAppointment = this.markAppointment.bind(this);
        this.state = {
            currentAppointment: null,
        };
    }


    markAppointment(e) {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        let hourFormat = hour > 9 ? hour : '0' + hour;
        let minuteFormat = minute > 9 ? minute : '0' + minute;
        let markedTime = hourFormat + ':' + minuteFormat;
        let appointment = {};
        console.log(markedTime);
        if (this.state.currentAppointment === null) {
            // this case there is no data of appointments
            appointment.user = session.user._id;
            appointment.entryTime = markedTime;
            appointment._id = -1;
        } else {
            appointment.user = session.user._id;
            appointment.exitTime = markedTime;
            appointment._id = this.state.currentAppointment._id;
        }
        signAppointment(appointment, options).then((response) => {
            console.log(response);
            this.setState({currentAppointment: response.data});
        })
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        let options = {
            headers: {
                'Authorization': String(session.token)
            }
        };
        console.log(session.user._id);
        fetchAppointments(session.user._id).then((response) => {
            console.log('hani lenna ...');
            console.log(response.data);
            if (response.data._id !== undefined) {
                this.setState({currentAppointment: response.data});
            }
        });
    }

    render() {
        return (<>
            <DemoNavbar user={this.props}/>
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
                        <br/><br/>
                        <Container className="py-lg-md d-flex">
                            <div className="col px-0">
                                <Row>
                                    <Col lg="12" xl="12" xs="12">
                                        <Card className="card-lift--hover shadow border-0"
                                              style={{backgroundColor: "rgb(242, 67, 51)"}}>
                                            <CardHeader className="text-center "
                                                        style={{backgroundColor: "rgb(242,67,51)"}}>
                                            </CardHeader>
                                            <CardBody className="py-5">
                                                <Row>
                                                    <Col className="text-center" xs={"12"} md={"12"} xl={"12"}>
                                                        <form noValidate autoComplete="off">
                                                            {this.state.currentAppointment !== null && this.state.currentAppointment.entry !== "" &&
                                                            this.state.currentAppointment.entry !== undefined ? (
                                                                <FormControl>
                                                                    <InputLabel htmlFor="input-with-icon-adornment">Entry
                                                                        time</InputLabel>
                                                                    <Input
                                                                        id="input-with-icon-adornment"
                                                                        startAdornment={
                                                                            <InputAdornment position="start">
                                                                                <ArrowRightAltIcon/>
                                                                            </InputAdornment>
                                                                        }
                                                                        variant={"filled"}
                                                                        type={"time"}
                                                                        value={this.state.currentAppointment.entry}
                                                                        disabled
                                                                    />
                                                                </FormControl>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            {this.state.currentAppointment !== null && this.state.currentAppointment.exit !== ''
                                                            && this.state.currentAppointment.exit !== undefined ? (
                                                                <FormControl>
                                                                    <InputLabel htmlFor="input-with-icon-adornment">Exit
                                                                        time</InputLabel>
                                                                    <Input
                                                                        variant={"filled"}
                                                                        id="input-with-icon-adornment"
                                                                        startAdornment={
                                                                            <InputAdornment position="start">
                                                                                <ArrowBackIcon/>
                                                                            </InputAdornment>
                                                                        }
                                                                        type={"time"}
                                                                        value={this.state.currentAppointment.exit}
                                                                        disabled
                                                                    />
                                                                </FormControl>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                            {this.state.currentAppointment === null ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        onClick={(e) => {
                                                                            this.markAppointment(e)
                                                                        }}
                                                                    >Mark entry appointment
                                                                    </Button>
                                                                ) :
                                                                this.state.currentAppointment.entry !== undefined && this.state.currentAppointment.exit === undefined ?
                                                                    (
                                                                        <Button
                                                                            variant="contained"
                                                                            onClick={(e)=>{this.markAppointment(e)}}
                                                                        >Mark exit appointment
                                                                        </Button>
                                                                    ) :
                                                                    (<span style={{color: 'white'}}>You have already appointed today , see you tommorow ! </span>)
                                                            }

                                                        </form>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>
                </div>
            </main>
        </>);
    }
}

export default MarkAppointments;
