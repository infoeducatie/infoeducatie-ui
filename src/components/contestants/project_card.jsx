"use strict";

import createLegacyComponent from "@lib/create-legacy-component";
import ctx from "classnames";

import "../../main.less";

const categoryKeys = {
  educational: "educational",
  multimedia: "multimedia",
  roboti: "robots",
  utilitar: "utility",
  web: "web",
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function itemName(item) {
  return typeof item === "string" ? item : item?.name || item?.title;
}

function joinItems(items) {
  return asArray(items).map(itemName).filter(Boolean).join(", ");
}

function formatScore(score) {
  const value = Number(score);
  return Number.isFinite(value) ? value.toFixed(2) : "—";
}

export default createLegacyComponent({
  displayName: "ProjectCard",

  renderDetail(labelKey, items) {
    const value = joinItems(items);
    if (!value) return null;

    return (
      <div className="project-card__detail">
        <span>{this.props.t(labelKey)}</span>
        <strong>{value}</strong>
      </div>
    );
  },

  render() {
    const project = this.props.project;
    const categoryKey = categoryKeys[project.category] || project.category;
    const categoryLabel = categoryKey
      ? this.props.t(`categories.${categoryKey}`)
      : project.category;
    const categoryIconClasses = ctx(
      "project-card__category-icon",
      "section-icon",
      project.category,
    );
    const title = project.discourse_url ? (
      <a href={project.discourse_url} rel="noreferrer" target="_blank">
        {project.title}
      </a>
    ) : project.title;

    return (
      <article className="project-card">
        <div className="project-card__header">
          <span className="project-card__category">
            <span aria-hidden="true" className={categoryIconClasses} />
            {categoryLabel}
          </span>
          {this.props.showResults && project.prize ? (
            <span className="project-card__prize">
              {this.props.t("contestants.results.columns.prize")} {project.prize}
            </span>
          ) : null}
        </div>

        <h3 className="project-card__title">{title}</h3>

        <div className="project-card__details">
          {this.renderDetail("contestants.results.columns.contestant", project.contestants)}
          {this.renderDetail("contestants.results.columns.county", project.counties)}
          {this.renderDetail("contestants.results.columns.school", project.schools)}
          {this.renderDetail("contestants.results.columns.teacher", project.mentoring_teachers)}
        </div>

        {this.props.showResults ? (
          <div className="project-card__scores">
            <div>
              <span>{this.props.t("contestants.results.columns.score")}</span>
              <strong>{formatScore(project.score)}</strong>
            </div>
            <div>
              <span>{this.props.t("contestants.results.columns.open")}</span>
              <strong>{formatScore(project.extra_score)}</strong>
            </div>
            <div className="project-card__total">
              <span>{this.props.t("contestants.results.columns.total")}</span>
              <strong>{formatScore(project.total_score)}</strong>
            </div>
          </div>
        ) : null}
      </article>
    );
  },
});
