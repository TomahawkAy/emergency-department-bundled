import React from "react";
import Login from "./views/User/Login";
import {Provider} from 'react-redux';
import Home from "./views/Home";
import {TrainingIndex} from "./views/human-ressources/Training/TrainingIndex";
import {NewTraining} from "./views/human-ressources/Training/NewTraining";
import {StaffIndex} from "./views/human-ressources/StaffManagement/StaffIndex";
import DepartmentsIndex from "./views/human-ressources/Departments/DepartmentsIndex";
import AppointmentsIndex from "./views/human-ressources/Appointments/AppointmentsIndex";
import SearchResult from "./views/human-ressources/utils/SearchResult";
import ScheduleIndex from "./views/human-ressources/Schedules/ScheduleIndex";
import {BrowseTrainings} from "./views/human-ressources/Training/BrowseTrainings";
import {TrainingViewer} from "./views/human-ressources/Training/TrainingViewer";
import {MarkAppointments} from "./views/human-ressources/Appointments/MarkAppointments";
import {Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Profile from "views/examples/Profile.js";
import AmbulanceDriver from "./views/ambulance/AmbulanceDriver";
import Pharmacie from "./views/pharmacie/pharmacie";
import PharmacieInterne from "./views/pharmacie/pharmacieInterne"
import AddMed from "./views/pharmacie/addMedicament"
import Ordonnance from "./views/pharmacie/ordonnance"
import addOrdonnance from "./views/pharmacie/addOrdonnance";
import Sejour from "./views/ressourcesMaterielles/sejour";
import Chest from "./views/chestXRay/chestXRayPrediction";
import Lit from './views/ressourcesMaterielles/lit'
import Chambre from "./views/ressourcesMaterielles/chambre";
import PreInscription from "./views/patient/PreInscription";
import PatientInfos from "./views/patient/PatientInfos";
import Triage from "./views/patient/Triage";
import ListePatients from "./views/patient/ListePatients";
import EditPatient from "./views/patient/EditPatient";
import AddRendezVous from "./views/patient/AddRendezVous";
import ListeDoctors from "./views/patient/ListeDoctors";
import PatientDetails from "./views/patient/PatientDetails";
import BloodPressureCalculator from "./views/patient/BloodPressureCalculator";
import AmbulanceNurce from "./views/ambulance/AmbulanceNurce";
import AmbulancePatient from "./views/ambulance/AmbulancePatient";
import DriverPick from "./views/ambulance/Nurce/DriverPick";
import CreateNewTask from "./views/ambulance/Nurce/CreateNewTask";
import Meeting from "./views/ambulance/Vedio/meeting/Meeting";
import AmbulanceAdmin from "./views/ambulance/AmbulanceAdmin";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './reducers/RootReducer';
import thunk from "redux-thunk";
import ListePatients2 from "./views/patient/ListePatients2";
type Props = {};
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),

        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);
export default class app extends React.Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" exact render={props => <Login {...props} />}/>
                        <Route
                            path="/landing-page"
                            exact
                            render={props => <Login {...props} />}
                        />
                        <Route
                            path="/"
                            exact
                            render={props => <Home {...props} />}
                        />
                        <Route path="/home" exact render={props => <Home {...props} />}/>
                        <Route
                            path="/profile-page"
                            exact
                            render={props => <Profile {...props} />}
                        />
                        <Route
                            path="/schedules"
                            exact
                            render={props => <ScheduleIndex {...props} />}
                        />
                        <Route
                            path="/trainings"
                            exact
                            render={props => <TrainingIndex {...props} />}
                        />
                        <Route
                            path="/new-training"
                            exact
                            render={props => <NewTraining {...props} />}
                        />
                        <Route
                            path="/staff"
                            exact
                            render={props => <StaffIndex {...props} />}
                        />
                        <Route
                            path="/departments"
                            exact
                            render={props => <DepartmentsIndex {...props} />}
                        />
                        <Route
                            path="/appointments"
                            exact
                            render={props => <AppointmentsIndex {...props} />}
                        />
                        <Route
                            path="/search"
                            exact
                            render={props => <SearchResult {...props} />}
                        />
                        <Route
                            path="/browse-trainings"
                            exact
                            render={props => <BrowseTrainings {...props} />}
                        />
                        <Route
                            path="/requested-training/:id"
                            exact
                            render={props => <TrainingViewer {...props} />}
                        />
                        <Route
                            path="/appointments/:id"
                            exact
                            render={props => <MarkAppointments {...props} />}
                        />
                        <Route path="/" exact render={props =>  <Index {...props} />}/>
                        <Route path="/landing-page" exact render={props => <Landing {...props} />}/>
                        <Route path="/login-page" exact render={props => <Login {...props} />}/>
                        <Route path="/profile-page" exact render={props => <Profile {...props} />}/>
                        <Route path="/ambulancedriver-page" exact render={props => <AmbulanceDriver {...props} />}/>
                        <Route path="/pharmacieExterne" exact render={props => <Pharmacie {...props} />}/>
                        <Route path="/pharmacieInterne" exact render={props => <PharmacieInterne {...props} />}/>
                        <Route path="/addMed" exact render={props => <AddMed {...props} />}/>
                        <Route path="/ordonnance" exact render={props => <Ordonnance {...props} />}/>
                        <Route path="/addOrdonnance" exact render={props => <addOrdonnance {...props} />}/>
                        <Route path="/sejour" exact render={props => <Sejour {...props} />}/>
                        <Route path="/chest" exact render={props => <Chest {...props} />}/>
                        <Route path="/lit" exact render={props => <Lit {...props} />}/>
                        <Route path="/chambre" exact render={props => <Chambre {...props} />}/>
                        /*----------------------------------------------------------------------------------*/

                        <Route path="/preinscription" exact render={props => <PreInscription {...props} />}/>

                        <Route exact path={"/patient_infos/:codePatient"}   render={(props)=><PatientInfos {...props}/>}/>

                        <Route path="/triage" exact render={props => <Triage {...props} />}/>

                        <Route exact path={"/patients_list/:idDoctor"}   render={(props)=><ListePatients {...props} />}/>

                        <Route exact path={"/edit_patient/:id/:role"}   render={(props)=><EditPatient {...props}/>}/>

                        <Route exact path={"/add_rendezvous/:idPatient"}   render={(props)=><AddRendezVous {...props} />}/>

                        <Route path="/doctors_list" exact render={props => <ListeDoctors {...props} />}/>

                        <Route exact path={"/patient_details/:idPatient"}   render={(props)=><PatientDetails {...props} />}/>

                        <Route exact path={"/blood_pressure_calculator/:idPatient"}   render={(props)=><BloodPressureCalculator {...props} />}/>

                        <Route path="/patients_list2" exact render={props => <ListePatients2 {...props} />}/>

                        <Route path="/index" exact render={props => <Index {...props} />}/>

                        /*----------------------------------------------------------------------------------*/

                        <Route path="/ambulancenurce-page" exact render={props => <AmbulanceNurce {...props} />}/>
                        <Route path="/createnewtask-page" exact render={props => <CreateNewTask {...props} />}/>
                        <Route path="/ambulancepatient-page" exact render={props => <AmbulancePatient {...props} />}/>
                        <Route path="/driverpick-page" exact render={props => <DriverPick {...props} />}/>
                        <Route path="/ambulanceadmin-page" exact render={props => <AmbulanceAdmin {...props} />}/>
                        <Route path="/PhoneCALLMEETing-page/:type/:id" exact render={props => <Meeting {...props} />}/>
                        <Redirect to="/"/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
