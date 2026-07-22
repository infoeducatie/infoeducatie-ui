"use strict";
import createLegacyComponent from "@lib/create-legacy-component";

import ctx from "classnames";

import "../../main.less";

const categoryLabels = {
  all: "Toate categoriile",
  educational: "Educațional",
  multimedia: "Multimedia",
  roboti: "Roboți",
  utilitar: "Utilitar",
  web: "Web",
};


export default createLegacyComponent({
  displayName: "FilterIcon",

  toggleCategory() {
    this.props.toggleCategory(this.props.category);
  },

  render() {
    let parentClasses = ctx({
      "round-icon": true,
      "inactive": (this.props.currentCategory !== this.props.category)
    });
    let childClasses = ctx("section-icon", this.props.category);

    let label = this.props.label || categoryLabels[this.props.category] || this.props.category;

    return <button
      aria-label={`Filtrează: ${label}`}
      aria-pressed={this.props.currentCategory === this.props.category}
      className={parentClasses}
      onClick={this.toggleCategory}
      title={label}
      type="button"
    >
      <span aria-hidden="true" className={childClasses} />
    </button>;
  }

});
