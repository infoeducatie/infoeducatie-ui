"use strict";

import Header from "./header";

export default function SecondaryHero({
  children,
  headerProps,
  tone = "blue",
}) {
  const sectionClass = `${tone}-section`;

  return (
    <div className={`secondary-hero ${sectionClass}-wrapper`}>
      <div className={`${sectionClass} secondary-hero__inner container`}>
        <Header {...headerProps} />
        <div className="secondary-hero__copy">
          {children}
        </div>
      </div>
    </div>
  );
}
