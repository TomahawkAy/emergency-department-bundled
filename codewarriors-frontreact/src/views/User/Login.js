import * as React from "react";
import {connect} from "react-redux";
import {loginAction, setUserConnected} from "../../actions/user/UserAction";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    Row
} from "reactstrap";
import "../../assets/css/animate.css"
import {Redirect} from "react-router";
import $ from 'jquery';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';


export class Login extends React.Component {

    constructor(params) {
        super(params);
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.state = {session};
        this.wiggle = this.wiggle.bind(this);
        console.log(this.props.user_connected);
        this.authenticate_user = this.authenticate_user.bind(this);
        this.facial_method_auth = this.facial_method_auth.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(state) {
        this.setState({
            [state]: !this.state[state]
        });
    };


    facial_method_auth(data) {
        this.props.socket.emit('sending_picture_to_user', {data: data});

    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.props.socket.on('engaged_to_connect', (data) => {
            console.log('engaged to connect :D :D :D');
            console.log(data);
            const session = {
                token: data.token,
                user: data.user
            };
            localStorage.setItem('currentUser', JSON.stringify(session));
            this.props.setUserConnected(session.user);
            this.setState({session});
        })
    }

    getPhotoData(e, data) {
        console.log(e.target);
    }

    async authenticate_user() {
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        await this.props.loginAction(credentials);
        let session = JSON.parse(localStorage.getItem('currentUser'));
        if (session !== null) {
            this.setState({session: session});
            if (session.user.role !== 'admin') {
                this.props.socket.emit('user_connected', {response: session.user});
            }
        } else {
            this.wiggle();
        }
    };

    wiggle() {
        let loginDOM = $('#login-form');
        let errorDOM = $('#error-credentials');
        loginDOM.addClass("animated tada");
        errorDOM.css('display', 'block');
        setTimeout(() => {
            loginDOM.removeClass("animated tada");
        }, 1000);
    }

    render() {
        if (this.state.session !== null) {
            return (<Redirect to='/home'/>)
        } else
            return (
                <>
                    <main>
                        <section className="section section-shaped section-lg">
                            <div className="shape shape-style-1 bg-gradient-default">
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                                <span/>
                            </div>
                            <Container className="pt-lg-7">
                                <Row className="justify-content-center">
                                    <Col lg="5">
                                        <Card className="bg-secondary shadow border-0" id="login-form">
                                            <CardBody className="px-lg-5 py-lg-5">
                                                <div className="text-center text-muted mb-4">
                                                    <small>sign in with <code>your</code> credentials</small>
                                                </div>
                                                <Form role="form">
                                                    <FormGroup className="mb-3">
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-email-83"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input placeholder="Email" type="email" onChange={(e) => {
                                                                this.setState({email: e.target.value})
                                                            }}/>
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-lock-circle-open"/>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                placeholder="Password"
                                                                type="password"
                                                                autoComplete="off"
                                                                onChange={(e) => {
                                                                    this.setState({password: e.target.value})
                                                                }}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <div className="text-center animate bounceIn delay-5s"
                                                         id="error-credentials" style={{display: 'none'}}>
                                                        <span style={{color: 'red'}}><i className="fa fa-remove "
                                                        />&nbsp;Invalid credentials</span>
                                                    </div>
                                                    <div className="text-center">
                                                        <Button
                                                            className="my-4"
                                                            color="primary"
                                                            type="button"
                                                            onClick={(e) => this.authenticate_user()}
                                                        >
                                                            Sign in
                                                        </Button>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6>Or </h6>
                                                        <Button
                                                            className="my-4"
                                                            color="warning"
                                                            type="button"
                                                            onClick={(e) => this.toggleModal("formModal")}
                                                        >
                                                            Sign in with facial id
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                        <Row className="mt-3">
                                            <Col xs="6">
                                                <a
                                                    className="text-light"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <small>Forgot password?</small>
                                                </a>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                        <Modal
                            className="modal-dialog-centered"

                            isOpen={this.state.formModal}
                            toggle={() => this.toggleModal("formModal")}
                        >
                            <div className="modal-body p--2">
                                <Card className="bg-secondary shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5" id={"departmentModal"}>
                                        <Camera onTakePhotoAnimationDone={true}
                                                isFullscreen={false}
                                                onTakePhoto={(data) => this.facial_method_auth(data)}
                                                style={{maxWidth: '200px', maxHeight: '200px'}}
                                        />
                                        <div className="text-center">
                                            <Button
                                                className="my-4"
                                                color="primary"
                                                type="button"
                                                onClick={(e) => this.facial_method_auth(e)}
                                            >
                                                Authenticate
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
                    </main>
                </>
            )

    }
}


const mapStateToProps = state => {
    return {
        user_connected: state.UserReducer.user_connected,
        role: state.UserReducer.role,
        socket: state.root.socket
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loginAction: (credentials) => dispatch(loginAction(credentials)),
        setUserConnected: (user) => dispatch(setUserConnected(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
