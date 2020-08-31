import React from "react";
import AgoraVideoCall from "../AgoraVideoCall";
import "./meeting.css";

class Meeting extends React.Component {


    constructor(props) {
        super(props);
        this.type=props.match.params.type;
        this.channel = props.match.params.id;
        this.uid = undefined;
    }

    render() {
        return (<>

                  <div className="wrapper meeting">
                    <div className="ag-header">
                      <div className="ag-header-lead">
                        <span>How Can We Help</span>
                      </div>
                      <div className="ag-header-msg">
                        Room For:&nbsp;<span id="room-name">{this.channel}</span>
                      </div>
                    </div>
                    <div className="ag-main">
                      <div className="ag-container">
                        <AgoraVideoCall
                            type={this.type}
                            videoProfile="480p_4"
                            channel={this.channel}
                            transcode="interop"
                            attendeeMode="audio-only"
                            baseMode="avc"
                            appId="2522634f7ed146b68a6eafc8218cb192"
                            uid={this.uid}
                        />
                      </div>
                    </div>
                  </div>
                </>
        );
    }
}

export default Meeting;
