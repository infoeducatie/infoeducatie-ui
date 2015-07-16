"use strict";

import React from "react";
import {Grid, Row, Col} from "react-bootstrap";
import ctx from "classnames";

import Header from "../header";
import PhotoWrapper from "../photo-wrapper.jsx";

import "../../main.less";

import Cover2014 from "../../../assets/img/2014.jpg";
import Cover2013 from "../../../assets/img/2013.jpg";
import Cover2012 from "../../../assets/img/2012.jpg";
import Cover2011 from "../../../assets/img/2011.jpg";
import Cover2010 from "../../../assets/img/2010.jpg";
import Cover2009 from "../../../assets/img/2009.jpg";
import Cover2008 from "../../../assets/img/2008.jpg";
import Cover2007 from "../../../assets/img/2007.jpg";
import Cover2006 from "../../../assets/img/2006.jpg";
import Cover2005 from "../../../assets/img/2005.jpg";
import Cover2004 from "../../../assets/img/2004.jpg";


export default React.createClass({
  displayName: "Photos",
  getInitialState() {
    return {
        hoveredYear: 0,
        albums: [
            {"year": 2014, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6126213014251955681"},
            {"year": 2013, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6126511874123551857"},
            {"year": 2012, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6126529418024686801"},
            {"year": 2011, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6126950217304487537"},
            {"year": 2010, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127300307304376961"},
            {"year": 2009, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127325200239501089"},
            {"year": 2008, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127559291932668561"},
            {"year": 2007, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127715315645838257"},
            {"year": 2006, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127337195835590657"},
            {"year": 2005, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127307525772879729"},
            {"year": 2004, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127315862395135249"}
        ]};
  },

  render() {
    return <div className="photos">
        <div className="gray-section-wrapper">
            <Grid className="gray-section">
                <Row>
                    <Col md={12}>
                        <Header isLoggedIn={this.props.isLoggedIn}
                                changeLanguage={this.props.changeLanguage}
                                language={this.props.language}
                                login={this.props.login}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="small-spacing header-spacing" />
                <Row>
                    <Col md={12}>
                        <h1>Photo Album</h1>
                        <h2>People and memories</h2>
                    </Col>
                </Row>
            </Grid>
        </div>
        <div className="white-section-wrapper">
            <Grid className="white-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={10} mdOffset={1}>
                        <Row>{this.state.albums.map(function(album) {
                            let hovered = (album.year === this.state.hoveredYear);
                            return <PhotoWrapper year={album.year}
                                                 link={album.link}
                                                 text="Photos"
                                                 onHover={this.onCoverHover}
                                                 hovered={hovered} />;
                        }.bind(this))}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  },

  onCoverHover(event) {
    this.setState({
        hoveredYear: parseInt(event.currentTarget.className)
    });
  }
});
