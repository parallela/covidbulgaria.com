import React from "react";
import CookieConsent from "react-cookie-consent";
import {Link} from "react-router-dom";

export default class Cookie extends React.Component {
    render() {
        return (

            <CookieConsent
                location="bottom"
                buttonText="Съгласен съм!"
                cookieName="iAcceptTheCookies"
                style={{background: "#2B373B"}}
                buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                expires={150}
            >
                Използваме бисквитки ("Cookies"), за да анализираме потребителското поведение и да
                подобрим
                предлаганите функционалности.{" "}
                <span style={{fontSize: "10px"}}>
                        <Link to={'/privacy-policy'}>Политика за поверителност</Link>
                    </span>
            </CookieConsent>
        );
    }
}