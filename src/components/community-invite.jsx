"use strict";

import {
  ArrowUpRight,
  Lightbulb,
  MessagesSquare,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CommunityInvite({ inviteUrl }) {
  const { i18n, t } = useTranslation("home");
  const titleId = `community-invite-title-${i18n.language}`;

  if (!inviteUrl) return null;

  return (
    <section className="community-invite" aria-labelledby={titleId}>
      <div className="container community-invite__inner">
        <div className="community-invite__mark" aria-hidden="true">
          <MessagesSquare size={40} strokeWidth={1.8} />
        </div>

        <div className="community-invite__content">
          <p className="community-invite__eyebrow">
            {t("community.eyebrow")}
          </p>
          <h2 id={titleId}>{t("community.title")}</h2>
          <p className="community-invite__description">
            {t("community.description")}
          </p>
          <ul className="community-invite__details">
            <li>
              <UsersRound aria-hidden="true" size={18} />
              <span>{t("community.participants")}</span>
            </li>
            <li>
              <Lightbulb aria-hidden="true" size={18} />
              <span>{t("community.collaboration")}</span>
            </li>
          </ul>
        </div>

        <div className="community-invite__actions">
          <a
            aria-label={t("community.actionLabel")}
            className="community-invite__cta"
            href={inviteUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{t("community.action")}</span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </a>
          <p className="community-invite__official">
            <ShieldCheck aria-hidden="true" size={16} />
            <span>{t("community.official")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
