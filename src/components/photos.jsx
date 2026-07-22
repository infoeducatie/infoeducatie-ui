"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import {Grid, Row, Col} from "@ui/bootstrap";

import Header from "./header";
import PhotoWrapper from "./photo-wrapper.jsx";

import "../main.less";


export default createLegacyComponent({
  displayName: "Photos",
  getInitialState() {
    return {
        albums: [
			{"year": 2023, "link": "https://photos.app.goo.gl/YQykPWLecHXudJrz8"},
            {"year": 2022, "link": "https://photos.app.goo.gl/zmRNv7SUxph37wbo9"},
            {"year": 2019, "link": "https://photos.app.goo.gl/NLxQgokxJtn5odG68"},
            {"year": 2018, "link": "https://photos.google.com/share/AF1QipP99v0CmRfkClWlyQweO_Tqmzyme6_aFVQFImVaY-atPTR0C2GTu9o3IFoRudIO5g?key=eE4yaGZiZkRLSy00RFpBQ3J4ZEhPZnFhUjQxNVF3"},
            {"year": 2017, "link": "https://photos.google.com/share/AF1QipO_5iITpX8h7IN9RBqw-73bWglfMnQjVN6vSSj2jZv8i9FEbGkbmL43qOYd3gwUjQ?key=ZGVJVlkyTmxzeGhyemt5NUZOdGZiOUlpSzh4SlJB"},
            {"year": 2016, "link": "https://photos.google.com/share/AF1QipNR1NnntBtXS5vuK1g9ZajZZnWwAgmWVYrTKIW_Pfy3Lk7vnUWpai7w_-D7XUMcSg?key=WTFPVnltWW8tMHRHd0poZVZxYWJ1SFZrVlRmcE93"},
            {"year": 2015, "link": "https://photos.google.com/share/AF1QipM0WQyv0H4hGG4ez_NnfTCcmTduxSQ8PSI1_0IsS2umMIRrpSI8XtPuMYG_2bIvmA?key=TTNHaVY3VHotbmNqVE42TmhzVWhJSVBWMHNfVjJR"},
            {"year": 2014, "link": "https://photos.google.com/share/AF1QipPhy1QnT48Cfp18B9Czft1D463wAtbcnnKdLyNcavIwjLuViTA1mJ_nwWP3qofQoA?key=WEF1RG8yQmhISVRGZ3lDazZPNmphM3IxakhJS3pB"},
            {"year": 2013, "link": "https://photos.google.com/share/AF1QipMoCFsIAokt6vAMbvPKDBBbL-cqNfmzCzE8Iq0FTKC53r8hO2o_--iEkPWqTMAUDg?key=R1E1bzcwNENPZWlYM0JvSDUtLXYycUtnTHVUa29n"},
            {"year": 2012, "link": "https://photos.google.com/share/AF1QipP7mmRfStuGeZZVnrUVY4LA1XyifBSm_mtM77rzbfingWYDGLv78JUKd2RpL0S3UQ?key=Q2V3bDBhQXVFbkZHMlpiTTZINW93ODZlTzAwVVl3"},
            {"year": 2011, "link": "https://photos.google.com/share/AF1QipOQVpZ3rwYETMRwjjOPbh2knAPLmKfvkPNByhVDlfjrCpsCU-S-_hmBeBcdmABpbA?key=dGNhX0hCbTUzaUNMcWZmZzNhc2xCeEdNZWYxRWNR"},
            {"year": 2010, "link": "https://photos.google.com/share/AF1QipMZxn0DYILoIYptkGOqOVOssvgTgJDxW5vxCUtuccbP3EZXmyU30U5jKlUXA93ORA?key=ZjlhT1FJb0VUVFF1RTJ5QlVsZkdudk1va3hCNEp3"},
            {"year": 2009, "link": "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127325200239501089"},
            {"year": 2008, "link": "https://photos.google.com/share/AF1QipPi7X0Ca1NnqOLJ1rkPYIbOJTHPQ6_tcCHATwvBKRRIpggus_O0e4umD_VjprPMJA?key=NGtwY2Y4MjJsck9DZGdKR1NOejA4Z0xHRjRmWDlR"},
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
                                current={this.props.current}
                                changeLanguage={this.props.changeLanguage}
                                language={this.props.language}
                                logout={this.props.logout} />
                    </Col>
                </Row>
                <Row className="small-spacing header-spacing" />
                <Row>
                    <Col md={12}>
                        <h1>Albumul Foto InfoEducație</h1>
                        <h2>Oameni și amintiri</h2>
                    </Col>
                </Row>
            </Grid>
        </div>
        <div className="white-section-wrapper">
            <Grid className="white-section">
                <Row className="small-spacing" />
                <Row>
                    <Col md={10} mdOffset={1}>
                        <div className="photo-albums">{this.state.albums.map(function(album) {
                            return <PhotoWrapper key={album.link}
                                                 year={album.year}
                                                 link={album.link} />;
                        })}
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    </div>;
  }
});
