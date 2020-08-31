import React from "react";
import CanvasJSReact from "../../../assets/js/canvasjs.react.js";
import {connect} from "react-redux";

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CallsStatistics extends React.Component {
    state = {
        data: null,
        T: 0,
        pieT: 0,
        pieF: 0,
        lineT: [],
        lineF: [],
    }

    componentDidMount() {
        this.props.socket.on('PhoneCallEndsAmbulance', (data) => {
            this.setState({data: data.calls})
            if (this.props.data !== null) {
                let xx = this.props.data.slice(0, 90);
                this.setState({
                    T: xx.length,
                    pieT: xx.filter(d => d.answred === true).length,
                    pieF: xx.filter(d => d.answred === false).length
                })
                let r = [];
                let resultT = [];
                let resultF = [];
                xx.map(d => {
                    if (!r.some(xs => xs === d.date)) {
                        r.push(d.date)
                        resultT.push({
                            x: new Date(d.date), y: xx.filter(dx =>
                                dx.answred === true && dx.date === d.date
                            ).length
                        })
                        resultF.push({
                            x: new Date(d.date), y: xx.filter(dx =>
                                dx.answred === false && dx.date === d.date
                            ).length
                        })


                    }
                });
                this.setState({lineT: resultT, lineF: resultF})
            }
        });

        if (this.props.data !== null) {
            let xx = this.props.data.slice(0, 90);
            this.setState({
                T: xx.length,
                pieT: xx.filter(d => d.answred === true).length,
                pieF: xx.filter(d => d.answred === false).length
            })
            let r = [];
            let resultT = [];
            let resultF = [];
            xx.map(d => {
                if (!r.some(xs => xs === d.date)) {
                    r.push(d.date)
                    resultT.push({
                        x: new Date(d.date), y: xx.filter(dx =>
                            dx.answred === true && dx.date === d.date
                        ).length
                    })
                    resultF.push({
                        x: new Date(d.date), y: xx.filter(dx =>
                            dx.answred === false && dx.date === d.date
                        ).length
                    })


                }
            });
            this.setState({lineT: resultT, lineF: resultF})
        }
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "lighst1", "dark1", "dark2"
            title: {
                text: "calls statistic   for the  last 3 months /day"
            },
            axisY: {
                title: "Calls Numbre",
                includeZero: false,
                suffix: ""
            },
            axisX: {
                title: "day ",
                valueFormatString: "DD",

                prefix: "",
                interval: 2
            },
            data: [
                {
                    type: "spline",
                    color: "green",
                    toolTipContent: " {x}: {y}",
                    dataPoints: this.state.lineT
                },
                {

                    type: "spline",
                    color: "red",
                    toolTipContent: " {x}: {y}",
                    dataPoints: this.state.lineF
                }
            ]
        }
        const options1 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: `TOTAL CALLS : ${this.state.T}`
            },
            data: [{
                type: "pie",
                startAngle: 60,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    {y: (this.state.pieT * 100) / this.state.T, label: "Answered"},
                    {y: (this.state.pieF * 100) / this.state.T, label: "Missed"}
                ]
            }]
        }
        return (
            <>
                <div>
                    <CanvasJSChart options={options1}/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <CanvasJSChart options={options}/>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    const {socket} = state.root;

    return {socket};
};
export default connect(mapStateToProps, null)(CallsStatistics);
