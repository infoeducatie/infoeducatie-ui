"use strict";

import {
  ArrowUpRight,
  Lightbulb,
  MessagesSquare,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const DISCORD_INVITE_URL = "https://discord.gg/Ef6yav7wAs";

const content = {
  ro: {
    eyebrow: "COMUNITATEA INFOEDUCAȚIE",
    title: "Construim mai departe, împreună.",
    description:
      "Intră pe serverul nostru de Discord și rămâi aproape de participanți, alumni, mentori și organizatori.",
    participants: "Participanți și alumni",
    collaboration: "Idei și colaborări",
    action: "Intră pe Discord",
    official: "Serverul oficial InfoEducație",
    actionLabel:
      "Intră pe serverul Discord InfoEducație. Se deschide într-o filă nouă.",
  },
  en: {
    eyebrow: "INFOEDUCAȚIE COMMUNITY",
    title: "Keep building, together.",
    description:
      "Join our Discord server and stay close to participants, alumni, mentors and organizers.",
    participants: "Participants and alumni",
    collaboration: "Ideas and collaboration",
    action: "Join Discord",
    official: "Official InfoEducație server",
    actionLabel:
      "Join the InfoEducație Discord server. Opens in a new tab.",
  },
};

export default function CommunityInvite({ language = "ro" }) {
  const copy = content[language] || content.ro;
  const titleId = `community-invite-title-${language}`;

  return (
    <section className="community-invite" aria-labelledby={titleId}>
      <div className="container community-invite__inner">
        <div className="community-invite__mark" aria-hidden="true">
          <MessagesSquare size={40} strokeWidth={1.8} />
        </div>

        <div className="community-invite__content">
          <p className="community-invite__eyebrow">{copy.eyebrow}</p>
          <h2 id={titleId}>{copy.title}</h2>
          <p className="community-invite__description">{copy.description}</p>
          <ul className="community-invite__details">
            <li>
              <UsersRound aria-hidden="true" size={18} />
              <span>{copy.participants}</span>
            </li>
            <li>
              <Lightbulb aria-hidden="true" size={18} />
              <span>{copy.collaboration}</span>
            </li>
          </ul>
        </div>

        <div className="community-invite__actions">
          <a
            aria-label={copy.actionLabel}
            className="community-invite__cta"
            href={DISCORD_INVITE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{copy.action}</span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </a>
          <p className="community-invite__official">
            <ShieldCheck aria-hidden="true" size={16} />
            <span>{copy.official}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
