import * as React from "react";
import {Badge, Button, Card, CardBody, Col} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import Image from '../../assets/img/home/c++.png'

export class TrainingComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.training);
    }

    render() {
        return (<Col lg="4">
            <Card className="card-lift--hover shadow border-0">
                <CardHeader className="text-center">
                    <span style={{color: "#858585"}}>{this.props.training.name}</span>
                </CardHeader>
                <CardBody className="py-5">
                    <img src={Image} className="img-center" style={{maxWidth: '150px', maxHeight: '150px'}}/>
                    <br/><br/><br/>
                    <h6 className="text-primary text-uppercase">
                        Description
                    </h6>
                    <p className="description mt-3">
                        {this.props.training.description}
                    </p>
                    <div>
                        {this.props.training.subscriptions.map((s) => {
                            return (<Badge color="primary" pill className="mr-1">
                                {s.name}
                            </Badge>)
                        })}
                    </div>
                    <Button
                        className="mt-4"
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                        More details
                    </Button>
                </CardBody>
            </Card>
        </Col>)
    }
}

export default TrainingComponent;
