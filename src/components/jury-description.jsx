"use strict";

import createLegacyComponent from "@lib/create-legacy-component";


export default createLegacyComponent({
  displayName: "JuryDescription",
  render() {
    let headingId = `jury-${String(this.props.name || "sectiune")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase()}`;
    let juryIcon = this.props.iconUrl ? (
      <div className="jury-icon">
        <img alt="" height="35" src={this.props.iconUrl} width="50" />
      </div>
    ) : null;

    return <section className="jury-description-wrapper" aria-labelledby={headingId}>
      {juryIcon}
      <h2 className="jury-description" id={headingId}>
        <span aria-hidden="true" className="orange-dash">&mdash;</span>
          {this.props.name}
        <span aria-hidden="true" className="orange-dash">&mdash;</span>
      </h2>
      <div className="jury-members">
        {this.props.members.map(function(member) {
          let memberName = String(member.name || "").replace(/\s+/g, " ").trim();
          let occupation = String(member.occupation || "").replace(/\s+/g, " ").trim();

          return <article className="jury-member" key={member.id}>
            <div className="jury-avatar">
              <img alt={memberName} height="100" loading="lazy" src={member.photo_url} width="100" />
            </div>
            {member.title ? <p className="jury-role">{member.title}</p> : null}
            <h3 className="jury-name">{memberName}</h3>
            <p className="jury-occupation">{occupation}</p>
          </article>;
        })}
      </div>
    </section>;
  }
});
