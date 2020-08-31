import {Button} from "reactstrap";
import {ROUNDED_BUTTON} from "../../assets/css/customStyles";
import * as React from "react";
import connect from "react-redux/lib/connect/connect";
import {Home} from "../../views/Home";
export class Logs extends React.Component {
    render() {
        return (<div className="fixed-bottom" style={{marginBottom: '40px'}}>
            <Button className="btn-icon btn-2 animated swing " color="warning" type="button" style={ROUNDED_BUTTON}>
                              <span className="btn-inner--icon">
                                <i className="fa fa-history" style={{fontSize: '25px'}}/>
                              </span>
            </Button>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        user_connected: state.UserReducer.user_connected,
        role: state.UserReducer.role
    }
};

export default connect(mapStateToProps, null)(Logs);
