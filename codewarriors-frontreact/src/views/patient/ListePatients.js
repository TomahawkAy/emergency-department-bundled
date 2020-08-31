import React from "react";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";
import "assets/css/style1.css";
import axios from 'axios'

import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";

const styles = {
    left: {
        float: "left",
        width: "220px"
    },
    main: {
        marginLeft: "220px"
    }
};


class ListePatients extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            viewType: "Week",
            durationBarVisible: false,
            timeRangeSelectedHandling: "Enabled",
            onTimeRangeSelected: args => {
                let dp = this.calendar;
                DayPilot.Modal.prompt("Add new patient:", "Patient 1").then(function(modal) {
                    dp.clearSelection();
                    if (!modal.result) { return; }
                    dp.events.add(new DayPilot.Event({
                        start: args.start,
                        end: args.end,
                        id: DayPilot.guid(),
                        text: modal.result
                    }));
                });
            },
            eventDeleteHandling: "Update",
            onEventClick: args => {
                let dp = this.calendar;
                DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function(modal) {
                    if (!modal.result) { return; }
                    args.e.data.text = modal.result;
                    dp.events.update(args.e);
                });
            },
        };


    }

    componentDidMount(){

        axios.get(`http://localhost:3000/findRdvByDoctor/${this.props.match.params.idDoctor}`).then(
            res =>{
                this.setState({
                    events:res.data
                })
            }
        ).catch(err=>console.log(err))



        this.setState({
            startDate: "2020-04-22",
            //events: []
        });

    }



    render() {
        var {...config} = this.state;

        return (
            <>
                <DemoNavbar/>
                <main ref="main">
                    <div className="position-relative my-header-navbar" >
                        {/* shape Hero */}
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

                        </section>
                        {/* 1st Hero Variation */}
                    </div>
                    <div align="center" >

                        <div className="container" >
                            <div className="col-xs-12" >



                            </div>
                        </div>


                    </div>

                </main>


                <div className="list-patients-section">


                    <div style={{marginTop:50}}>
                        <div style={styles.left}>
                            <DayPilotNavigator
                                selectMode={"week"}
                                showMonths={3}
                                skipMonths={3}
                                onTimeRangeSelected={ args => {
                                    this.setState({
                                        startDate: args.day
                                    });
                                }}
                            />
                        </div>
                        <div style={styles.main}>
                            <DayPilotCalendar
                                {...config}
                                ref={component => {
                                    this.calendar = component && component.control;
                                }}
                            />
                        </div>
                    </div>

                </div>

                <CardsFooter/>
            </>
        );
    }
}

export default ListePatients;
