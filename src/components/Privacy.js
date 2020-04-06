import React from "react";
import {Modal, Button} from "react-bootstrap";

export default class PrivacyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    closeTab() {
        window.open("about:blank", "_self");
        window.close();
    }

    render() {
        const {showModal} = this.state;

        return (
                <Modal
                    show={showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Политика за поверителност
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Каква е политиката ни относно поверителността?</h4>
                        <p>
                            Ние приемаме поверителността на потребителите си изключително сериозно и не споделяме или
                            продаваме личната Ви информация на трети лица или несвързани компании. Ангажираме се да
                            спазваме правото Ви на лично пространство и конфиденциалност. Информация на трети страни
                            може да бъде предоставена само и единствено ако тя е изискана от компетентни органи, по
                            процедурите посочени в нормативната уредба на Република България.
                            <br/>
                            Ние ("CovidBulgaria.com", "CovidBG", "Covid 19 Bulgarian stats"), запазваме правото си да
                            променяме политиката за поверителност в този прозорец! При промени всички потребители в
                            сайта ще бъдат информирани за това!
                        </p>
                        <h4>Каква информация събираме?:</h4>
                        <p>
                            <li>IP Адресът Ви.</li>
                            <li>Тип на устройството, операционна система, версия и модел на използвания браузър</li>
                            <strong> Не се съхранява демогафска информация за посетителите от типа на пол, възраст,
                                изповядвана религия, интереси, модели за поведение и др.</strong><br/>
                        </p>
                        <h4>За какво използваме тази информация?:</h4>
                        <p>Събираната от нас информация се използва за подобряване на предоставените услуги,
                            статистически отчети и обратна връзка.</p>
                        <hr/>
                        <h4>Бисквитки (Cookies):</h4>
                        <p>Използваме бисквитки ("Cookies"), за да анализираме потребителското поведение и да подобрим
                            предлаганите функционалности. Бисквитките съдържат малко количество информация, записано в
                            регистрите на Вашия уеб браузър, и по никакъв начин не могат да навредят на работата на
                            системата Ви или да инсталират вреден софтуер. Бисквитките могат да бъдат изискани и
                            достъпени само от уебсайта, от който са издадени.</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({showModal: false})} className="btn btn-success"><i
                            className="fa fa-times"></i> Съгласен съм!</Button>
                        <Button onClick={() => this.closeTab()} className="btn btn-danger"><i
                            className="fa fa-times"></i> Не съм съгласен с това!</Button>
                    </Modal.Footer>
                </Modal>
        )
    }

}