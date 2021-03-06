import React from "react";
import Particles from "react-particles-js";

var particleStyle = {
    position: 'absolute'
};
var particlesParams = {
    "particles": {
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "speed": 3,
                "size_min": 0.3
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "random": true,
            "speed": 3,
            "direction": "center",
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "bubble"
            },
            "onclick": {
                "enable": true,
                "mode": "repulse"
            }
        },
        "modes": {
            "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
            },
            "repulse": {
                "distance": 400,
                "duration": 4
            }
        }
    }
};


export default class ParticleElement extends React.Component {
    render() {
        return (
            <Particles style={particleStyle} params={particlesParams}/>
        );
    }
}