"use strict";

import { Col, Grid, Row } from "@ui/bootstrap";
import { useTranslation } from "react-i18next";

import "../main.less";
import Header from "./header";
import PhotoWrapper from "./photo-wrapper.jsx";

const albums = [
  [2023, "https://photos.app.goo.gl/YQykPWLecHXudJrz8"],
  [2022, "https://photos.app.goo.gl/zmRNv7SUxph37wbo9"],
  [2019, "https://photos.app.goo.gl/NLxQgokxJtn5odG68"],
  [2018, "https://photos.google.com/share/AF1QipP99v0CmRfkClWlyQweO_Tqmzyme6_aFVQFImVaY-atPTR0C2GTu9o3IFoRudIO5g?key=eE4yaGZiZkRLSy00RFpBQ3J4ZEhPZnFhUjQxNVF3"],
  [2017, "https://photos.google.com/share/AF1QipO_5iITpX8h7IN9RBqw-73bWglfMnQjVN6vSSj2jZv8i9FEbGkbmL43qOYd3gwUjQ?key=ZGVJVlkyTmxzeGhyemt5NUZOdGZiOUlpSzh4SlJB"],
  [2016, "https://photos.google.com/share/AF1QipNR1NnntBtXS5vuK1g9ZajZZnWwAgmWVYrTKIW_Pfy3Lk7vnUWpai7w_-D7XUMcSg?key=WTFPVnltWW8tMHRHd0poZVZxYWJ1SFZrVlRmcE93"],
  [2015, "https://photos.google.com/share/AF1QipM0WQyv0H4hGG4ez_NnfTCcmTduxSQ8PSI1_0IsS2umMIRrpSI8XtPuMYG_2bIvmA?key=TTNHaVY3VHotbmNqVE42TmhzVWhJSVBWMHNfVjJR"],
  [2014, "https://photos.google.com/share/AF1QipPhy1QnT48Cfp18B9Czft1D463wAtbcnnKdLyNcavIwjLuViTA1mJ_nwWP3qofQoA?key=WEF1RG8yQmhISVRGZ3lDazZPNmphM3IxakhJS3pB"],
  [2013, "https://photos.google.com/share/AF1QipMoCFsIAokt6vAMbvPKDBBbL-cqNfmzCzE8Iq0FTKC53r8hO2o_--iEkPWqTMAUDg?key=R1E1bzcwNENPZWlYM0JvSDUtLXYycUtnTHVUa29n"],
  [2012, "https://photos.google.com/share/AF1QipP7mmRfStuGeZZVnrUVY4LA1XyifBSm_mtM77rzbfingWYDGLv78JUKd2RpL0S3UQ?key=Q2V3bDBhQXVFbkZHMlpiTTZINW93ODZlTzAwVVl3"],
  [2011, "https://photos.google.com/share/AF1QipOQVpZ3rwYETMRwjjOPbh2knAPLmKfvkPNByhVDlfjrCpsCU-S-_hmBeBcdmABpbA?key=dGNhX0hCbTUzaUNMcWZmZzNhc2xCeEdNZWYxRWNR"],
  [2010, "https://photos.google.com/share/AF1QipMZxn0DYILoIYptkGOqOVOssvgTgJDxW5vxCUtuccbP3EZXmyU30U5jKlUXA93ORA?key=ZjlhT1FJb0VUVFF1RTJ5QlVsZkdudk1va3hCNEp3"],
  [2009, "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127325200239501089"],
  [2008, "https://photos.google.com/share/AF1QipPi7X0Ca1NnqOLJ1rkPYIbOJTHPQ6_tcCHATwvBKRRIpggus_O0e4umD_VjprPMJA?key=NGtwY2Y4MjJsck9DZGdKR1NOejA4Z0xHRjRmWDlR"],
  [2007, "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127715315645838257"],
  [2006, "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127337195835590657"],
  [2005, "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127307525772879729"],
  [2004, "https://plus.google.com/b/110845403526646344110/photos/110845403526646344110/albums/6127315862395135249"],
];

export default function Photos(props) {
  const { t } = useTranslation("photos");

  return (
    <div className="photos">
      <div className="gray-section-wrapper">
        <Grid className="gray-section">
          <Row>
            <Col md={12}>
              <Header {...props} />
            </Col>
          </Row>
          <Row className="small-spacing header-spacing" />
          <Row>
            <Col md={12}>
              <h1>{t("title")}</h1>
              <h2>{t("subtitle")}</h2>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="white-section-wrapper">
        <Grid className="white-section">
          <Row className="small-spacing" />
          <Row>
            <Col md={10} mdOffset={1}>
              <div className="photo-albums">
                {albums.map(([year, link]) => (
                  <PhotoWrapper
                    ariaLabel={t("albumLabel", { year })}
                    key={link}
                    link={link}
                    text={t("moreDetails")}
                    year={year}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
