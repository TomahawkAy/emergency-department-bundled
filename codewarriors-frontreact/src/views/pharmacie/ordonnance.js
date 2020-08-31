import FilterResults from 'react-filter-search';
import React from "react";
import './pharmacie.css'
import axios from "axios";
import AddOrdonnance from "./addOrdonnance";
import jsPDF from 'jspdf'

import {
    Card, CardImg, CardText, CardBody,
    Modal, TextField, CardTitle, CardSubtitle, CardLink, Button, Container, Col,
} from "reactstrap";

import DemoNavbar from "../../components/Navbars/DemoNavbar";
import CardsFooter from "../../components/Footers/CardsFooter";

class Ordonnance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            data: [],
            value: ''
        };
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    componentDidMount () {
        const script = document.createElement("script");

        script.src = "https://code.tidio.co/gaqddghypvio1voeuopbfawf2exfoq3v.js";
        script.async = true;

        document.body.appendChild(script);
    }
    componentWillMount() {
        fetch('http://localhost:3000/ordonnance/')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/ordonnance/')
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    handleDelete = (idOrd) => {
        axios.delete('http://localhost:3000/ordonnance/' + idOrd).then(
            response => console.log(response)
        )
    }

    generatePDF(el)
    {
        var doc = new jsPDF('p','pt');
        var chambre = el.chambre[0].num_chambre;
        var user = el.user[0].name;
        var medicament = el.medicament[0].nom_med;
        var quantite = el.quantite_med_ordonnance;
        var date = el.date_ordonnance.substring(0,10);
        var temps  = el.date_ordonnance.substring(11,19);
        var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////+/v7t7e34+PiRkZHy8vKYmJj19fXp6empqanh4eHU1NSzs7MAAAC2tra7u7uenp6ioqKrq6vExMTc3NzIyMjGxsbOzs7X19e/v7+MjIyTk5OEhISAgIBISEhBQUENDhAjIyVPUFEyMjJkZGQZGRs6Oz1zdHVoa21cXmApKi5XWFsVFxkuLzBvcHFNTU2xCnbJAAAG6ElEQVR4nO2djVubOhSHT8JnIJAEQim0VVvdqte5/f//3Q2t82OtV+tOCY/3/Pa4Tpb68po0PaE8AEChUCgUCoVCoVAoFAqFQqFQKBTKlMJ8ENnYGVeQpdnICYJRFRm7qcSYqW54Mq5hsOApHzFRmPFRO5ElYZpGUTJeFuMb8igYc5qJUw+Gx4BHd4LB80TIHjecyJuGoQ2ynqXp7v9fbm8hB3javW74xp7Km4KhKIowLrJvxWULrxWrSKtSViIXKZStbjrNc2la1uTVR/vSv2FS3xdF0Uff4Zt7DNtXjXlfdqpLY90oXoI2cSR0LQ0TK3F0pB/jeTVszHZdFN8vbi8KsemLu7uN+/bXUqRPrVdgBJcqMynotixlpFqzzRZSyQ/zvBpm/cVVUVytr643/1w/3P9Yr6+ufqxvxVOd9WJeed7H2Um7632UWrva3F0W95vbi4tvl3f3wvJXrXdz6R9F5kmlpnfDXZYrgDuAov2zsXB/IHODNnC1EMC8GZyD3deHed4Nh4GoH1LYQlvY/Ybn1NboWJY/S9GBEkKrbamVUeVM5x/meTfcZVsUPx5+lIeNN1ZWTtMoG8V9nMuu79I+7fsu+zBvGobL2+ynOhykw1t+m7M2A8Whm6d1mvIurbMmUB8ephMxXDfwE7bhYWME3jQMW/emeP8rOmjM4eXMGmWnlmwwGUO4brfx7WFjzWJrlcx5HUQ87YSG7tR9nYhhdMWX2cNhY1tVslLZ0gjjihtTCWMOp6N3eJMwZCC+rdfHpsdfLI5tKVxZCjo3lem6w6H8Dm8ihsu5iI9Mpfuaxu1f8ljLwMmHXKZh6Ibj5u7m+BvAU5n2VLLtN7L9YcnH6Zbtv9jhEnkqhmxlVkca1zBzL9Lkj7a7znY/Ylhf8CCwElw1B9UbvIkYQn+jjjSWXFdCVmFrLCx0y5XRxkpZ1kLAXOhOwKITyth4HldaZ9LMdTfTr3pxMobVYn6kcbSthxWw0c2MiUpyV75FfS/jrDEQQrwqA2V7KRa1atSSCdHqVG/L16uTqRjaRXKkMcQgZVLOuElZ06RxPcuTRs1qECVkxtlDNpNtYyu7UjVrlbS8nslp9eHT5DGs6z+/H9Gblbh/wxde/PP78fYzvRsGOnUrIc15wKGKMhZkLD06Xj/N820Iuipzo2dVuApK2ca6lGWPyvNuWIeqdfN+tupAlp3WUlZfzJAlkEHi3rhTSNx0M+/dgEXl+Tfc1567+sttjiLkz6X9G56dR4b4RDLE5pEhPpEMsXlkiE8kQ2weGeITnw0fy9Hfxwk/8bNc2f77aOPbbXz2YV3OEg5JEsHnDN16a8F4YIC/Xa17PhdjIcvahKGsoDttRfH4C5FB2yy6vgqPHS//3dKnYRdtxFyLOtFggQUnJNmvIassjqWKY8XfeLpvw4hFMGdRwrhb+6al+njK/bG1KA8Cm2Rs7lTa3fbXzRrfhqPwyBCfSIbYPDLEJ5IhNo8M8Yk7w1fEs+L9GdrriyGb1YkV6ck8b6M0uyoec+wUBUSev9dhWRQ9MOMU314YYPD8GcqiWLoBejmInpPntQ+X7uG6KA7PusTkee1DN0pjN0o/cU7lCTyvhvvUT0v2s/C8Gj44v9vh7K0z7oDnURo4xVIX5pw8z3NpOwzT71+0D6vdXHrjDNOv+Dp0SntDuy9qvp4hQDOMzw4Ww8P1qac2n8LzVnmr68vL6zIvLlbfL9f8/ed9muerD/dIN5fu5b7iKB3+CWZ4uz/vAtH3Z0/HTgxG5tFRDHwiGWLzyBCfSIbYPDLEJ5IhNo8M8YlkiM0jQ3wiGWLzyBCfSIbYPDLEJ5IhNo8M8YlkiM0jQ3wiGWLzyBCfSIbYPDLEJ5IhNo8M8YlkiM0jQ3wiGWLzyBCfSIbYPDLEJ5IhNo8M8YlkiM0jQ3wiGWLzyBCfSIbYPDLEJ5IhNo8M8YlkiM0jQ3wiGWLzPBrmAc+gK1GvMX+E59EwVqaCmC3OzPNoWJlKwnC/mPPyPBqqOutUKDIFDOayRI8MPBs+Q4dbcZ3jnuPMs+FYPDLEJ5IhNo8M8Yn/I0NmxwD7NOxtzlub1dBEqyxKszQ/x0VcfBrauBP5ImxrFRrbirDpl+fgeTRs47KTvY5irY0NQ5OK4SLdXBsXvU/ssvvrOfpFzIuIfapd5C7eq7YkYIEwjLFk9xVAksBfXKrm5Q3m9xdkn1zVdp69mJLhmXhkiE8kQ2weGeITyRCbR4b4RDLE5pEhPvHwzgFnxfkwXOyuQTteRjcMbn6v30bKzeiGtm3zUZPi3iX63QRn+YziP5OM2YXDa/+UG6z9fRK32B/X8PXxhlEysh+FQqFQKBQKhUKhUCgUCoVCoXy1/Av9BISIgxLhzgAAAABJRU5ErkJggg=='
      //  var imgData2 = 'data:image/jpeg;base64,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'
        doc.addImage(imgData,'png',20,20,150,150);
        doc.text(20,220,"Chambre: "+chambre);
        doc.text(20,240,"Médecin: "+user);
        doc.text(20,260,"Nom Médicament: "+medicament);
        doc.text(20,280,"Quantité Médicament: "+quantite);
        doc.text(20,320,"Date De L'ordonnance: "+date);
        doc.text(20,340,"Temps: "+temps);

        doc.save('Ordonnance');
        console.log(el);
    }
    render() {

        const { data, value } = this.state;
        return (
            <>
                <DemoNavbar/>

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
                    <Container className="py-lg-md d-flex">
                        <div className="col px-0">

                        </div>
                    </Container>
                    {/* SVG separator */}
                    <div className="separator separator-bottom separator-skew">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="fill-white"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </section>
                <div className="container-fluid" >

                    <div className="main">

                        < AddOrdonnance />
                        <br/>
                        <Col sm="12">
                            <h1 align="center" className="display-4 mb-0">Liste Des Ordonnances Médicale</h1>
                        </Col>
                        <br/>
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input value={value} onChange={this.handleChange} type="text" className="form-control" placeholder="Search"/>
                        </div>

                    </div>

                        <FilterResults
                            value={value}
                            data={data}
                            renderResults={results => (
                                <div className="cadreCartes">
                                    {results.map(el => (
                                        <div className="cadreCarte" key={el._id}>
<br/>

                                            <Card className="card bg-gradient-info text-white"  >
                                                <CardBody className="cardBack">
                                                    <CardTitle><b><i className="far fa-hospital ni-2x"> </i> Chambre: {el.chambre[0].num_chambre} </b></CardTitle>
                                                    <CardTitle><b><i className="fas fa-user-md ni-2x"></i> Médecin: {el.user[0].name} </b></CardTitle>
                                                    <CardTitle><b><i className="fas fa-calendar-alt ni-2x"></i> Date De L'ordonnance: {el.date_ordonnance.substring(0,10)}</b> <b>Temps: {el.date_ordonnance.substring(11,19)} </b></CardTitle>
                                                        <CardTitle><b><i className="fas fa-vial ni-2x"> </i> Nom Médicament Ordonnance: {el.medicament[0].nom_med} </b></CardTitle>
                                                        <CardTitle><b><i className="fas fa-first-aid ni-2x"> </i> Quantité Médicament Ordonnance: {el.quantite_med_ordonnance} </b></CardTitle>
                                                    <br/>
                                                    <br/>

                                                   <span>
                                                    <Button
                                                        color="danger"
                                                        onClick={() => this.toggleModal("notificationModal")}
                                                    >
                                                        <svg className="bi bi-x-circle" width="1.3em" height="1.3em"
                                                             viewBox="0 0 16 16" fill="currentColor"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                                                                  clip-rule="evenodd"/>
                                                        </svg> Supprimer
                                                    </Button>
                                                    <Button
                                                        color="info"
                                                        onClick={() => this.generatePDF(el)}
                                                    >
                                                        <svg className="bi bi-download" width="1.3em" height="1.3em"
                                                             viewBox="0 0 16 16" fill="currentColor"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd"
                                                                  d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z"
                                                                  clip-rule="evenodd"/>
                                                            <path fill-rule="evenodd"
                                                                  d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z"
                                                                  clip-rule="evenodd"/>
                                                        </svg> Exporter To PDF
                                                    </Button>
                                                   </span>
                                                    <Modal
                                                        className="modal-dialog-centered modal-danger"
                                                        contentClassName="bg-gradient-danger"
                                                        isOpen={this.state.notificationModal}
                                                        toggle={() => this.toggleModal("notificationModal")}
                                                    >
                                                        <div className="modal-header">
                                                            <h6 className="modal-title" id="modal-title-notification">
                                                                Votre attention est requise
                                                            </h6>
                                                            <button
                                                                aria-label="Close"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                type="button"
                                                                onClick={() => this.toggleModal("notificationModal")}
                                                            >
                                                                <span aria-hidden={true}>×</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="py-3 text-center">
                                                                <i className="ni ni-ambulance ni-3x" />
                                                                <h4 className="heading mt-4">voulez vous vraiment supprimer ce médicament ?</h4>

                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <Button
                                                                onClick={() =>this.handleDelete(el._id)}
                                                                className="btn-white" color="default" type="button">
                                                                Confirmer La Suppression
                                                            </Button>
                                                            <Button
                                                                className="text-white ml-auto"
                                                                color="link"
                                                                data-dismiss="modal"
                                                                type="button"
                                                                onClick={() => this.toggleModal("notificationModal")}
                                                            >
                                                                Fermer
                                                            </Button>
                                                        </div>
                                                    </Modal>
                                                </CardBody>
                                            </Card>
                                        </div>

                                    ))}
                                </div>

                            )}
                        />
                    </div>

                <CardsFooter/>

            </>
        );
    }
}


export default Ordonnance ;
