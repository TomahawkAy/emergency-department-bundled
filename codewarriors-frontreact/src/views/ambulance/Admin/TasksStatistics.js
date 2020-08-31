import React from "react";
import CanvasJSReact from "../../../assets/js/canvasjs.react.js";
import {connect} from "react-redux";

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TasksStatistics extends React.Component {
    state = {
        data: null,
        lineT: [],
    }

    componentDidMount() {

        if (this.props.data !== null) {
            let xx = this.props.data.slice(0, 90);
            let r = [];
            let resultT = [];
            xx.map(d => {
                if (!r.some(xs => xs === d.date)) {
                    r.push(d.date)
                    resultT.push({
                        x: new Date(d.date), y: xx.filter(dx => dx.date === d.date).length
                    })
                }
            });
            this.setState({lineT: resultT})
        }
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "lighst1", "dark1", "dark2"
            title: {
                text: "Tasks statistic   for the  last 3 months /day"
            },
            axisY: {
                title: "Tasks Numbre",
                includeZero: false,
                suffix: ""
            },
            axisX: {
                title: "day",
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
                }
            ]
        }

        return (
            <>

                <br/>
                <br/>
                <div>
                    <CanvasJSChart options={options}/>
                </div>
            </>
        )
    }
}


export default TasksStatistics;
