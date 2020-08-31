import * as React from "react";
import DemoNavbar from "../../../components/Navbars/DemoNavbar";
import {BACKGROUND_NEW_TRAINING_STYLE} from "../../../assets/css/customStyles";
import classnames from "classnames";
import {Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import $ from 'jquery';
import TrainingServices from "../../../services/TrainingServices";

export class NewTraining extends React.Component {

    constructor(props) {
        super(props);
        this.newLesson = this.newLesson.bind(this);
        this.newSection = this.newSection.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
        this.submitAction = this.submitAction.bind(this);
        this.setImageFile = this.setImageFile.bind(this);
        this.state = {
            sections: 0,
            lessons: 0,
            images: 0,
            form: null,
            files: [],
            training: {},
            sectionsList: [],
            lessonsList: [],
            currentSection: null,
            currentLesson: null,
            tabs: 1,
            currentFile: null,
            isSubmitted: false,
            imageFile: null
        }

    }


    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index,
        });
    };

    setImageFile(e) {
        this.state.imageFile = e.target.files[0];
        console.log(this.state.imageFile);
    }

    fileChanged(e) {
        this.state.currentFile = e.target.files[0];
        console.log(this.state.currentFile);
    }


    newSection(e) {
        e.preventDefault();
        console.log('invokrd');
        let form = $('#sectionForm');
        let sections = $('#sections');
        this.state.sectionsList.push({
            name: form.find('#sectionName').val(),
            description: form.find('#sectionDescription').val()
        });
        $('#sectionsInput').append("" +
            "<option value=\"" + form.find('#sectionName').val() + "\"> " + form.find('#sectionName').val() + "</option>");
        form.remove();
        sections.append("<div class=\"row\">" +
            "<div class=\"col-md-12\">" +
            "<div class=\"card card-lift--hover\">" +
            "<div class=\"card-body\"> " +
            "<div class=\"row\">" +
            "<div class=\"col-md-12\">" +
            "Section name : " + form.find("#sectionName").val() + " " +
            "</div>" +
            "<div class=\"col-md-12\">" +
            "Section description : " + form.find("#sectionDescription").val() + " " +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +
            "");
        sections.append(form);
    }

    newLesson(e) {
        e.preventDefault();
        console.log('invokrd');
        let lessonForm = $('#lessonForm');
        let lessons = $('#lessonSection');
        lessonForm.remove();
        this.state.lessonsList.push({
            name: lessonForm.find("#lessonTitle").val(),
            fileName: this.state.currentFile.name,
            section: lessonForm.find("#sectionsInput").val()
        });
        alert(lessonForm.find("#sectionsInput").val());
        this.state.files.push(this.state.currentFile);
        console.log(this.state.lessonsList);
        lessons.append("<div class=\"row\">" +
            "<div class=\"col-md-12\">" +
            "<div class=\"card card-lift--hover\">" +
            "<div class=\"card-body\"> " +
            "<div class=\"row\">" +
            "<div class=\"col-md-12\">" +
            "Lesson title : " + lessonForm.find("#lessonTitle").val() + " " +
            "</div>" +
            "<div class=\"col-md-12\">" +
            "lesson file title : " + this.state.currentFile.name + " " +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div><br/>" +
            "");
        lessons.append(lessonForm);
    }

    async submitAction(e) {
        this.state.form=new  FormData();
        let training = {
            name: $('#trainingTitle').val(),
            description: $('#trainingDescription').val(),
            ratingAverage: 0,
            subscription: [],
            trainingRequest: [],
            fromTrainingRequest: $('#isTrainingRequest').prop('checked'),
        };
        e.preventDefault();
        console.log(this.state.files);
        this.state.form.append('lessons', JSON.stringify(this.state.lessonsList));
        this.state.form.append('training', JSON.stringify(training));
        this.state.form.append('sections', JSON.stringify(this.state.sectionsList));
        let i = 0;
        this.state.files.forEach((e) => {
            this.state.form.append('file' + i, e);
            i++;
        });
        this.state.form.append('image', this.state.imageFile);
        let response = await TrainingServices.newTraining(this.state.form);
        console.log(response);
    }


    render() {
        return (<>
            <DemoNavbar/>
            <main>
                <section className="section section-lg section-shaped pb-9">
                    <div className="shape shape-style-1 shape-default" style={BACKGROUND_NEW_TRAINING_STYLE}>
                        <span/><span/><span/><span/><span/><span/><span/><span/><span/>
                    </div>
                    <Container className="py-lg-md d-flex">
                        <div className="col px-0">
                            <Row>
                                <Col lg="12" xl="12" xs="12">
                                    <Card className="card-lift--hover shadow border-0"
                                          style={{backgroundColor: "#212121"}}>
                                        <CardHeader className="text-center "
                                                    style={{backgroundColor: "#212121"}}><h1
                                            style={{color: 'white'}}>Creating a new training</h1>
                                            <code>Create at least 1 section and one lesson in order to proceed</code>
                                        </CardHeader>
                                        <CardBody className="py-5">
                                            <Row>
                                                <Col md={"12"} xs={"12"} xl={"12"}>
                                                    <div className="nav-wrapper">
                                                        <Nav
                                                            className="nav-fill flex-column flex-md-row"
                                                            id="tabs-icons-text"
                                                            pills
                                                            role="tablist"
                                                        >
                                                            <NavItem>
                                                                <NavLink
                                                                    aria-selected={this.state.tabs === 1}
                                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                                        active: this.state.tabs === 1
                                                                    })}
                                                                    onClick={e => this.toggleNavs(e, "tabs", 1)}
                                                                    href="#pablo"
                                                                    role="tab"
                                                                >
                                                                    <i className="fa fa-info mr-2"/>
                                                                    Training infos
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink
                                                                    aria-selected={this.state.tabs === 2}
                                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                                        active: this.state.tabs === 2
                                                                    })}
                                                                    onClick={e => this.toggleNavs(e, "tabs", 2)}
                                                                    href="#pablo"
                                                                    role="tab"
                                                                >
                                                                    <i className="fa fa-folder mr-2"/>
                                                                    Training sections
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink
                                                                    aria-selected={this.state.tabs === 3}
                                                                    className={classnames("mb-sm-3 mb-md-0", {
                                                                        active: this.state.tabs === 3
                                                                    })}
                                                                    onClick={e => this.toggleNavs(e, "tabs", 3)}
                                                                    href="#pablo"
                                                                    role="tab"
                                                                >
                                                                    <i className="fa fa-book mr-2"/>
                                                                    Training lessons
                                                                </NavLink>
                                                            </NavItem>
                                                        </Nav>
                                                    </div>
                                                    <form>
                                                        <Card className="shadow">
                                                            <CardBody>
                                                                <TabContent activeTab={"tabs" + this.state.tabs}>
                                                                    <TabPane tabId="tabs1">
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <i className="fa fa-id-badge mr-2"/>
                                                                                    Title<br/>
                                                                                    <Input
                                                                                        className="form-control-alternative"
                                                                                        id="trainingTitle"
                                                                                        placeholder="name@example.com"
                                                                                        type="text"
                                                                                    />
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <i className="fa fa-question mr-2"/>
                                                                                    Description<br/><br/>
                                                                                    <Input
                                                                                        className="form-control-alternative"
                                                                                        placeholder="Regular"
                                                                                        type="textarea"
                                                                                        rows={3}
                                                                                        id={"trainingDescription"}
                                                                                    />
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <i className="fa fa-image mr-2"/>
                                                                                    Image<br/>
                                                                                    <Input
                                                                                        className="form-control-alternative btn"
                                                                                        placeholder="Regular"
                                                                                        type="file"
                                                                                        id={"imageInput"}
                                                                                        onChange={(e) => this.setImageFile(e)}
                                                                                    />
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <i className="fa fa-arrow-right mr-2"/>
                                                                                    From training requests ?<br/><br/>
                                                                                    <span className="clearfix"/>
                                                                                    <label className="custom-toggle">
                                                                                        <input defaultChecked
                                                                                               id={"isTrainingRequest"}
                                                                                               type="checkbox"/>
                                                                                        <span
                                                                                            className="custom-toggle-slider rounded-circle"/>
                                                                                    </label>
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                    </TabPane>

                                                                    <TabPane tabId="tabs2">
                                                                        <div id={"sections"}>
                                                                            <div id={"sectionForm"}>
                                                                                <div className={"row"}>
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <i className="fa fa-id-badge mr-2"/>
                                                                                            Name<br/>
                                                                                            <input
                                                                                                className="form-control-alternative form-control"
                                                                                                placeholder="Section name"
                                                                                                type="text"
                                                                                                id={"sectionName"}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className={"row"}>
                                                                                    <div className="col-md-12">
                                                                                        <FormGroup>
                                                                                            <i className="fa fa-question mr-2"/>
                                                                                            Description<br/><br/>
                                                                                            <Input
                                                                                                className="form-control-alternative"
                                                                                                placeholder="Section description"
                                                                                                type="textarea"
                                                                                                rows={3}
                                                                                                id={"sectionDescription"}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                </div>
                                                                                <a className="btn btn-success"
                                                                                   href={"#!"}
                                                                                   onClick={(e) => this.newSection(e)}>save
                                                                                    and add
                                                                                    another
                                                                                </a>
                                                                            </div>
                                                                        </div>

                                                                    </TabPane>
                                                                    <TabPane tabId="tabs3">
                                                                        <div id={"lessonSection"}>
                                                                            <div id={"lessonForm"}>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <i className="fa fa-id-badge mr-2"/>
                                                                                            Title<br/>
                                                                                            <Input
                                                                                                className="form-control-alternative"
                                                                                                id="lessonTitle"
                                                                                                placeholder="name@example.com"
                                                                                                type="text"

                                                                                            />
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <i className="fa fa-video-camera mr-2"/>
                                                                                            Video file<br/>
                                                                                            <Input
                                                                                                className="form-control-alternative btn"
                                                                                                placeholder="Regular"
                                                                                                type="file"
                                                                                                onChange={(e) => this.fileChanged(e)}
                                                                                                id={"lessonFile"}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <i className="fa fa-group mr-2"/>
                                                                                            Section<br/>
                                                                                            <select
                                                                                                className="form-control"
                                                                                                id={"sectionsInput"}>
                                                                                                <option value={"aa"}
                                                                                                        disabled>no
                                                                                                    section selected
                                                                                                </option>

                                                                                            </select>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <a className="btn btn-success"
                                                                                   href={"#!"}
                                                                                   onClick={(e) => this.newLesson(e)}>save
                                                                                    and add
                                                                                    another
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </TabPane>
                                                                </TabContent>
                                                            </CardBody>
                                                        </Card>
                                                    </form>
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                                <Col xs={"12"} md={"12"} xl={"12"} className="text-center">
                                                    <a href={"#!"} className={"btn btn-success"}
                                                       onClick={(e) => this.submitAction(e)}>submit form</a>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>

            </main>
        </>)
    }
}
