// vim: sw=2:ts=2:sts=2:et:fileencoding=utf8:
"use strict";

import React from "react";
import { Row } from "react-bootstrap";

import Header from "./header";
import JuryDescription from "./jury_description.jsx";
import Authentication from "../mixins/authentication.jsx";

import "./jury.less";

import VladAvatar from "../../assets/img/jury/vlad_temian.png";
import RobertAvatar from "../../assets/img/jury/robert_dolca.png";
import AlexPAvatar from "../../assets/img/jury/alex_palcuie.png";
import AndreiAAvatar from "../../assets/img/jury/andrei_adoamnei.png";
import AndreiHAvatar from "../../assets/img/jury/andrei_horak.png";
import AndreiAvAvatar from "../../assets/img/jury/andrei_avadaniei.png";
import VladVeliciAvatar from "../../assets/img/jury/vlad_velici.png";
import SabinMarcuAvatar from "../../assets/img/jury/sabin_marcu.png";
import RobertaTomegaAvatar from "../../assets/img/jury/roberta_tomega.png";
import LuizaBubatuAvatar from "../../assets/img/jury/luiza_bubatu.png";
import RazvanDeaconescuAvatar from "../../assets/img/jury/razvan_deaconescu.png";
import JulianAvatar from "../../assets/img/jury/julian_atanasoae.png";
import AndreiMAvatar from "../../assets/img/jury/andrei_munteanu.png";
import AlexCiteaAvatar from "../../assets/img/jury/alex_citea.png";
import AlexComanAvatar from "../../assets/img/jury/alex_coman.png";
import CristianVatAvatar from "../../assets/img/jury/cristian_vat.png";
import VictorPorofAvatar from "../../assets/img/jury/victor_porof.png";
import CristianTomaAvatar from "../../assets/img/jury/cristian_toma.png";
import DefaultAvatar from "../../assets/img/jury/default.png";


export default React.createClass({
  displayName: "Jury",
  render() {

    var educational = [
        {"avatar": RazvanDeaconescuAvatar, "name": "Razvan Deaconescu", "occupation": "profesor asistent @ upb"},
        {"avatar": JulianAvatar, "name": "Iulian Atanasoaie", "occupation": "student @ unibuc"},
        {"avatar": DefaultAvatar, "name": "Andreea Popescu", "occupation": "student @ "},
        {"avatar": DefaultAvatar, "name": "Emilian Bacila", "occupation": "student @ Cambridge"},
        {"avatar": DefaultAvatar, "name": "Andrei Iancu", "occupation": "student @ "}
    ];
    var media = [
        {"avatar": RobertaTomegaAvatar, "name": "Roberta Tomega", "occupation": "student @ upt"},
        {"avatar": LuizaBubatuAvatar, "name": "Luiza Bubatu", "occupation": "student @ utcn"}
    ];
    var robots = [
        {"avatar": DefaultAvatar, "name": "<unknown>", "occupation": "student @ narnia"},
        {"avatar": DefaultAvatar, "name": "<unknown>", "occupation": "student @ narnia"},
        {"avatar": DefaultAvatar, "name": "<unknown>", "occupation": "student @ narnia"}
    ];
    var utilitar = [
        {"avatar": AlexComanAvatar, "name": "Alexandru Coman", "occupation": "developer @ Cloudbase"},
        {"avatar": AlexCiteaAvatar, "name": "Alex Citea", "occupation": "developer @ Bitdefender"},
        {"avatar": DefaultAvatar, "name": "Alina Dumitrascu", "occupation": "profesor @ A.Macedonki"},
        {"avatar": VladAvatar, "name": "Vlad Temian", "occupation": "student @ uvt"},
        {"avatar": AndreiMAvatar, "name": "Andrei Munteanu", "occupation": "student @ Manchester"},
        {"avatar": CristianVatAvatar, "name": "Cristian Vat", "occupation": "developer @ DataGroup"},
        {"avatar": VictorPorofAvatar, "name": "Victor Porof", "occupation": "developer @ Mozilla"},
        {"avatar": CristianTomaAvatar, "name": "Cristian Toma", "occupation": "student @ upt"}
    ];
    var web = [
        {"avatar": RobertAvatar, "name": "Robert Dolca", "occupation": "inginer @ Intel"},
        {"avatar": AlexPAvatar, "name": "Alex Palcuie", "occupation": "student @ unibuc"},
        {"avatar": AndreiAAvatar, "name": "Andrei Adoamnei", "occupation": "student @ unibuc"},
        {"avatar": AndreiHAvatar, "name": "Andrei Horak", "occupation": "inginer @ UnifiedPost"},
        {"avatar": AndreiAvAvatar, "name": "Andrei Avadaniei", "occupation": "CEO @ CSRC"},
        {"avatar": VladVeliciAvatar, "name": "Vlad Velici", "occupation": "student @ southampton"},
        {"avatar": SabinMarcuAvatar, "name": "Sabin Marcu", "occupation": "student @ southampton"}
    ];

    return <div className="jury">
        <div className="row blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <h1>Juriul InfoEduca&#355;ie</h1>
          <h2>Membrii juriului pe categorii</h2>
        </div>
        <JuryDescription iconClass="educational" name="educațional" members={educational}/>
        <JuryDescription iconClass="media" name="multimedia" members={media}/>
        <JuryDescription iconClass="robots" name="roboți" members={robots}/>
        <JuryDescription iconClass="utility" name="utilitar" members={utilitar}/>
        <JuryDescription iconClass="web" name="web" members={web}/>
        <Row className="orange-section">
          <Row className="jury-criteria-desc">
              <span className="pink-dash">&mdash;</span>
                criterii de jurizare
              <span className="pink-dash">&mdash;</span>
          </Row>
        </Row>
    </div>;
  }
});
