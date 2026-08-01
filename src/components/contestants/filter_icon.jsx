"use strict";
import createLegacyComponent from "@lib/create-legacy-component";

import ctx from "classnames";
import { withTranslation } from "react-i18next";

import "../../main.less";

const categoryKeys = {
  all: "all",
  educational: "educational",
  multimedia: "multimedia",
  roboti: "robots",
  utilitar: "utility",
  web: "web",
};


const FilterIcon = createLegacyComponent({
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

    let categoryKey = categoryKeys[this.props.category];
    let label = this.props.label ||
      (categoryKey ? this.props.t(`categories.${categoryKey}`) : this.props.category);

    return <button
      aria-label={this.props.t("contestants.filter", { category: label })}
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

export default withTranslation("public")(FilterIcon);
