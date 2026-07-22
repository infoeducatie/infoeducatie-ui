"use strict";

import ctx from "classnames";
import createLegacyComponent from "@lib/create-legacy-component";
import { Col } from "@ui/bootstrap";


export default createLegacyComponent({
  displayName: "JuryDescription",
  render() {
    let juryIcon = null;
    if (this.props.iconClass) {
      let juryIconClass = ctx("section-icon", this.props.iconClass);
      juryIcon = (
        <div className="jury-icon">
          <span className={juryIconClass} />
        </div>
      );
    }

    return <div className="jury-description-wrapper">
      {juryIcon}
      <div className="jury-description">
        <span aria-hidden="true" className="orange-dash">&mdash;</span>
          {this.props.name}
        <span aria-hidden="true" className="orange-dash">&mdash;</span>
      </div>
      <Col className="jury-members">
        {this.props.members.map(function(member) {
          let memberName = String(member.name || "").replace(/\s+/g, " ").trim();
          let occupation = String(member.occupation || "").replace(/\s+/g, " ").trim();

          return <div className="jury-member" key={member.name}>
            <div className="jury-avatar">
              <img alt="" height="100" loading="lazy" src={member.avatar} width="100" />
            </div>
            <div className="jury-name">{memberName}</div>
            <div className="jury-occupation">{occupation}</div>
          </div>;
        })}
      </Col>
    </div>;
  }
});
