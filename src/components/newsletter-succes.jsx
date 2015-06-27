import React from "react"
import { Row, Col } from "react-bootstrap";

export default React.createClass({
  displayName: "NewsletterSucces",

  render() {
    return <Col md={8} mdOffset={2}>
      <Row className="small-spacing" />
      <Row>
        <p>Esti aproape inscris. Mai trebuie sa confirmi inscrierea dand
           click pe link-ul trimis catre tine prin email</p>
      </Row>
    </Col>;
  }
});
