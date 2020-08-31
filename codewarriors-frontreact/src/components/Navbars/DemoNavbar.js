import React from "react";
import {Link, Redirect} from "react-router-dom";
import Headroom from "headroom.js";
import {
    Badge,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledCollapse,
    UncontrolledDropdown,
    Button
} from "reactstrap";
import NavItem from "reactstrap/es/NavItem";
import {logoutAction} from "../../actions/user/UserAction";
import '../../assets/css/search-bar.css';

import $ from 'jquery';
import {connect} from "react-redux";
import {
    RESET_CALL_NOTIF,
    RESET_NOTIF,
    SET_CALL_NOTIF,
    SET_CALL_NOTIF_FILL,
    SET_NOTIF,
    SET_NOTIF_FILL
} from "../../actions/NotifAction";
import Ic_notifications_active_48px from "../../assets/icons/ic_notifications_active_48px"
import Phone from "../../assets/icons/phone-2"

class DemoNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.searchBarActivated = this.searchBarActivated.bind(this);
        this.lookForColor = this.lookForColor.bind(this);
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.state = {linkedToAppointments: false, session: session};
        this.redirectToAppointments = this.redirectToAppointments.bind(this);
    }


    componentDidMount() {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        headroom.init();
        let searchBar = $('#search-bar');
        let suggestions = $('#suggestions');
        searchBar.on('focusout', (event) => {
            suggestions.empty();
        });
        this.props.socket.on('search_request_finished', (response) => {
            console.log(response);
        });
        if (this.props.role === "nurse") {
            this.props.socket.on('GetAllWait', (data) => {
                this.props.SET_NOTIF({
                    NewNotif: true,
                    NbNewNotif: data.task.length,
                    NotifText: "New Ambulance Call(s)"
                });
                this.notifAnnim();
            });

            this.props.socket.on('PhoneCallAmbulance', (data) => {
                this.props.SET_CALL_NOTIF({
                    callNotif: true,
                })
                this.notifCallAnnim();
            });

        }
        if (this.props.role === "driver") {
            this.props.socket.on('DriverSetted', (data) => {
                this.props.SET_NOTIF({
                    NewNotif: true,
                    NbNewNotif: 0,
                    NotifText: "New Task  Do the Job"
                })
                this.notifAnnim();
            });
        }
        if (this.props.role === "patient") {
            this.props.socket.on('DriverSetted', (data) => {
                this.props.SET_NOTIF({
                    NewNotif: true,
                    NbNewNotif: 0,
                    NotifText: "Driver On his Way"
                })
                this.notifAnnim();
            });
        }
    }

    notifAnnim = () => {

        setTimeout(() => {

            if (this.props.NewNotif === true) {
                if (this.props.fill === "white") {
                    this.props.SET_NOTIF_FILL({fill: "red"})
                } else {
                    this.props.SET_NOTIF_FILL({fill: "white"})
                }
                this.notifAnnim();
            }
        }, 500)

    }

    notifCallAnnim = () => {

        setTimeout(() => {
            if (this.props.callNotif === true) {
                if (this.props.callFill === "white") {
                    this.props.SET_CALL_NOTIF_FILL({callFill: "green"})
                } else {
                    this.props.SET_CALL_NOTIF_FILL({callFill: "white"})
                }
                this.notifCallAnnim();
            }
        }, 500)
        setTimeout(() => {
            if (this.props.callNotif === true) {
                this.props.RESET_CALL_NOTIF()
            }
        }, 5500)
    };


    state = {
        collapseClasses: "",
        collapseOpen: false
    };

    onExiting = () => {
        this.setState({
            collapseClasses: "collapsing-out"
        });
    };

    onExited = () => {
        this.setState({
            collapseClasses: ""
        });
    };
    signOut = () => {
        let session = JSON.parse(localStorage.getItem('currentUser'));
        this.props.socket.emit('user_disconnected', {user: session.user});
        this.props.logoutAction();
        console.log(this.props.user_connected);
    };

    redirectToAppointments(e) {
        this.setState({linkedToAppointments: true});

    }

    searchBarActivated() {
        let searchBar = $('#search-bar');
        let suggestions = $('#suggestions');
        suggestions.empty();
        let list = ['loula', 'thenya', 'theltha', 'rab3a'];
        this.props.socket.emit('requesting_search_bar', {query: searchBar.val()});
        if (searchBar.val() !== "") {
            list.forEach((e) => {
                if (e.startsWith(searchBar.val())) {
                    console.log('matched...');
                    suggestions.append("<li class='list-group-item animated bounceIn'><a href='#' class='badge badge-light'>" + e + "</a></li>")
                } else {
                    console.log('not matched ...');
                }
            });
        }
    }


    lookForColor() {
        return this.props.notifications.length > 0 ? {color: '#00e676'} : {color: 'white'};
    }

    render() {
        if (this.props.user_connected) {
            return (
                <>
                    <header className="header-global">
                        <Navbar
                            className="navbar-main navbar-transparent navbar-light headroom"
                            expand="lg"
                            id="navbar-main"
                        >
                            <Container>
                                <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                                    <img width="80" height="100"
                                         alt="..."
                                         src={require("assets/img/logo.png")}
                                    />

                                </NavbarBrand>
                                <button className="navbar-toggler" id="navbar_global">
                                    <span className="navbar-toggler-icon"/>
                                </button>
                                <UncontrolledCollapse
                                    toggler="#navbar_global"
                                    navbar
                                    className={this.state.collapseClasses}
                                    onExiting={this.onExiting}
                                    onExited={this.onExited}
                                >
                                    <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                        <UncontrolledDropdown nav>
                                            {this.props.role === "driver" &&
                                            <DropdownToggle to="/ambulancedriver-page" tag={Link} nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Ambulance</span>
                                            </DropdownToggle>
                                            }
                                            {this.props.role === "nurse" &&
                                            <DropdownToggle to="/ambulancenurce-page" tag={Link} nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Ambulance</span>
                                            </DropdownToggle>
                                            }
                                            {this.props.role === "patient" &&
                                            <DropdownToggle to="/ambulancepatient-page" tag={Link} nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Ambulance</span>
                                            </DropdownToggle>
                                            }
                                            {this.props.role === "admin" &&
                                            <DropdownToggle to="/ambulanceadmin-page" tag={Link} nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Ambulance</span>
                                            </DropdownToggle>
                                            }
                                        </UncontrolledDropdown>
                                        {this.props.role === "admin" ? (<UncontrolledDropdown nav>
                                            <DropdownToggle nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Staff</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="/departments" tag={Link}>
                                                    Departments
                                                </DropdownItem>
                                                <DropdownItem to="/staff" tag={Link}>
                                                    Profiles
                                                </DropdownItem>
                                                <DropdownItem to="/schedules" tag={Link}>
                                                    Schedules
                                                </DropdownItem>
                                                <DropdownItem to="/appointments" tag={Link}>
                                                    Appointments
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>) : (<></>)}
                                        {this.props.role === "admin" ? (<UncontrolledDropdown nav>
                                            <DropdownToggle nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Recruitment</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem to="/landing-page" tag={Link}>
                                                    Landing
                                                </DropdownItem>
                                                <DropdownItem to="/profile-page" tag={Link}>
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem to="/login-page" tag={Link}>
                                                    Login
                                                </DropdownItem>
                                                <DropdownItem to="/register-page" tag={Link}>
                                                    Register
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>) : (<></>)}
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle nav>
                                                <i className="ni ni-collection d-lg-none mr-1"/>
                                                <span className="nav-link-inner--text">Trainings</span>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this.props.role === 'admin' ? (
                                                    <DropdownItem to="/trainings" tag={Link}>
                                                        See trainings
                                                    </DropdownItem>) : (<></>)}
                                                {this.props.role === "admin" ? (
                                                    <DropdownItem to="/new-training" tag={Link}>
                                                        New training
                                                    </DropdownItem>) : (<></>)}
                                                {this.props.role !== 'admin' ? (
                                                    <DropdownItem to="/browse-trainings" tag={Link}>
                                                        Browse trainings
                                                    </DropdownItem>) : (<></>)}
                                                {this.props.role !== 'admin' ? (
                                                    <DropdownItem to="/register-page" tag={Link}>
                                                        progress
                                                    </DropdownItem>) : (<></>)}

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                    {this.props.role === "admin" || this.props.role === "pharmacist" ? (
                                        <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle nav>
                                                    <i className="ni ni-collection d-lg-none mr-1"/>
                                                    <span className="nav-link-inner--text">Pharmacie</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem to="/pharmacieExterne" tag={Link}>
                                                        Pharmacie Externe
                                                    </DropdownItem>
                                                    <DropdownItem to="/pharmacieInterne" tag={Link}>
                                                        Pharmacie Interne
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    ) : (
                                        ''
                                    )}

                                    {this.props.role === "doctor" ? (
                                            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                                <UncontrolledDropdown nav>
                                                    <DropdownToggle nav>
                                                        <i className="ni ni-collection d-lg-none mr-1"/>
                                                        <span className="nav-link-inner--text">Ordonnances</span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem to="/ordonnance" tag={Link}>
                                                            Traiter Les Ordonnances Médicales
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>
                                        ) :
                                        ''}

                                    {this.props.role === 'admin' ? (
                                        <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle nav>
                                                    <i className="ni ni-collection d-lg-none mr-1"/>
                                                    <span className="nav-link-inner--text">
                                                Séjour Hospitalier
                                            </span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem to="/sejour" tag={Link}>
                                                        Gestion
                                                        Des Séjours Hospitalier

                                                    </DropdownItem>
                                                    <DropdownItem to="/lit" tag={Link}>
                                                        Gestion
                                                        Des Lits

                                                    </DropdownItem>
                                                    <DropdownItem to="/chambre" tag={Link}>
                                                        Gestion
                                                        Des Chambres

                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    ) : ''}
                                    {this.props.role === "doctor" || this.props.role === "admin" ? (
                                            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                                <UncontrolledDropdown nav>
                                                    <DropdownToggle nav>
                                                        <i className="ni ni-collection d-lg-none mr-1"/>
                                                        <span className="nav-link-inner--text">
                                                X-Ray
                                            </span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem to="/chest" tag={Link}>
                                                            Pneumonie Aux Rayons X De La Poitrine
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>) :
                                        ('')}
                                    {this.props.role === 'nurse' ? (
                                            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                                                <UncontrolledDropdown nav>
                                                    <DropdownToggle nav>
                                                        <i className="ni ni-collection d-lg-none mr-1"/>
                                                        <span className="nav-link-inner--text">Patient</span>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem to="/preinscription" tag={Link}>
                                                            Préinscription
                                                        </DropdownItem>
                                                        <DropdownItem to="/triage" tag={Link}>
                                                            Triage
                                                        </DropdownItem>
                                                        <DropdownItem to="/patients_list2" tag={Link}>
                                                            Liste des patients
                                                        </DropdownItem>
                                                        <DropdownItem to="/doctors_list" tag={Link}>
                                                            Liste des médecins
                                                        </DropdownItem>

                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Nav>
                                        )
                                        :
                                        (<></>)}


                                    <Nav className="align-items-lg-center ml-lg-auto" navbar>

                                        <UncontrolledDropdown nav>
                                            <Nav className="ml-lg-auto" navbar>


                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav className="nav-link-icon" onClick={() => {
                                                        setTimeout(() => {
                                                            this.props.RESET_NOTIF();
                                                        }, 7000)
                                                    }}>

                                                        <Ic_notifications_active_48px title="New Notification"
                                                                                      height={20}
                                                                                      width={20}
                                                                                      fill={this.props.fill}/>

                                                    </DropdownToggle>
                                                    {this.props.NewNotif &&
                                                    <DropdownMenu aria-labelledby="navbar-default_dropdown_1" right>


                                                        <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                                            {this.props.NotifText}
                                                            {this.props.NbNewNotif !== 0 &&
                                                            <Badge
                                                                className="badge-danger">{this.props.NbNewNotif}</Badge>}
                                                        </DropdownItem>

                                                    </DropdownMenu>
                                                    }
                                                </UncontrolledDropdown>


                                                {this.props.role === "nurse" && <NavItem>
                                                    <NavLink
                                                        className="nav-link-icon"
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        {this.props.callFill === "green" ?
                                                            <Phone select="tow" height={20} width={20}
                                                                   fill={this.props.callFill}/> :
                                                            <Phone select="one" height={20} width={20}
                                                                   fill={this.props.callFill}/>}

                                                    </NavLink>
                                                </NavItem>
                                                }
                                            </Nav>
                                            <DropdownMenu>
                                                <DropdownItem to="/landing-page" tag={Link}>
                                                    Landing
                                                </DropdownItem>
                                                <DropdownItem to="/profile-page" tag={Link}>
                                                    Profile
                                                </DropdownItem>
                                                <DropdownItem to="/login-page" tag={Link}>
                                                    Login
                                                </DropdownItem>
                                                <DropdownItem to="/register-page" tag={Link}>
                                                    Register
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        {this.props.role !== "admin" ? (<NavItem>
                                            <Link to={"/appointments/" + this.state.session.user._id}
                                                  style={{color: 'white'}}>
                                                <i className="fa fa-clock-o"/>
                                                <span className="nav-link-inner--text d-lg-none ml-2">
                                            Mark appointment
                                            </span>
                                            </Link>
                                        </NavItem>) : (<></>)}
                                        <NavItem>
                                            <NavLink
                                                className="nav-link-icon"
                                                href="#"
                                                id="tooltip333589074"
                                                target="_blank"
                                                onClick={(e) => this.signOut()}
                                            >
                                                <i className="fa fa-sign-out"/>
                                                <span className="nav-link-inner--text d-lg-none ml-2">
                                            Logout
                                            </span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem className="d-none d-lg-block ml-lg-4">
                                            <Button type="button" className="btn btn-dark"
                                                    to="/profile-page" tag={Link}>Profile</Button>

                                        </NavItem>
                                    </Nav>


                                </UncontrolledCollapse>
                            </Container>
                        </Navbar>
                    </header>
                </>
            );
        } else
            return (<Redirect to="/login"/>);
    }
}

const mapStateToProps = state => {
    const {NewNotif, NbNewNotif, NotifText, fill, callNotif, callFill} = state.NotifReducer;
    return {
        user_connected: state.UserReducer.user_connected,
        role: state.UserReducer.role,
        notifications: state.notificationReducer.notifications,
        socket: state.root.socket
        , callNotif
        , NewNotif
        , NbNewNotif,
        NotifText,
        fill,
        callFill
    }
};


const actions = {
    logoutAction,
    SET_NOTIF,
    RESET_NOTIF,
    SET_NOTIF_FILL,
    SET_CALL_NOTIF,
    SET_CALL_NOTIF_FILL,
    RESET_CALL_NOTIF
};

export default connect(mapStateToProps, actions)(DemoNavbar);
