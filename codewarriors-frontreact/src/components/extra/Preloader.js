import * as React from "react";
import "../../assets/css/preloader.css"

export class Preloader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="lds-ellipsis">
            <div>{""}</div>
            <div>{""}</div>
            <div>{""}</div>
            <div>{""}</div>
        </div>)
    }
}

export default Preloader;
