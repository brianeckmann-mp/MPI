import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faStar } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faCircleInfo, faFilter, faHouse, faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function GraystoneFAIcon({ icon, title }) {
  return <FontAwesomeIcon icon={icon} title={title} aria-hidden={title ? undefined : "true"} />;
}

export function GraystoneIconChevron() {
  return <GraystoneFAIcon icon={faChevronDown} />;
}

export function GraystoneIconSearch() {
  return <GraystoneFAIcon icon={faMagnifyingGlass} />;
}

export function GraystoneIconStar() {
  return <GraystoneFAIcon icon={faStar} />;
}

export function GraystoneIconFacebook() {
  return <GraystoneFAIcon icon={faFacebookSquare} title="Facebook" />;
}

export function GraystoneIconInstagram() {
  return <GraystoneFAIcon icon={faInstagram} title="Instagram" />;
}

export function GraystoneIconTikTok() {
  return <GraystoneFAIcon icon={faTiktok} title="TikTok" />;
}

export function GraystoneIconX() {
  return <GraystoneFAIcon icon={faXTwitter} title="X" />;
}

export function GraystoneIconYoutube() {
  return <GraystoneFAIcon icon={faYoutube} title="YouTube" />;
}

export function GraystoneIconUser() {
  return <GraystoneFAIcon icon={faCircleUser} />;
}

export function GraystoneIconInfo() {
  return <GraystoneFAIcon icon={faCircleInfo} />;
}

export function GraystoneIconList() {
  return <GraystoneFAIcon icon={faList} />;
}

export function GraystoneIconFilter() {
  return <GraystoneFAIcon icon={faFilter} />;
}

export function GraystoneIconHome() {
  return <GraystoneFAIcon icon={faHouse} />;
}

export function GraystoneIconWavePulse() {
  return (
    <svg viewBox="0 0 640 640" aria-hidden="true">
      <path
        d="M291.8 64L347 64L351.4 82.4L424.6 388.4L457.7 303.3L463.6 288L608 288L608 336L496.4 336L446.3 464.7L440.4 480L397 480L392.6 461.6L322.5 168.3L255.6 556.1L252.2 576L205.5 576L200.7 558.2L141.5 336L31.9 336L31.9 288L178.3 288L183.1 305.8L223.7 458.2L288.2 83.9L291.6 64z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GraystoneIconGridMenu() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="1.4" fill="currentColor" />
      <circle cx="12" cy="6.5" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
      <circle cx="6.5" cy="12" r="1.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1.4" fill="currentColor" />
      <circle cx="6.5" cy="17.5" r="1.4" fill="currentColor" />
      <circle cx="12" cy="17.5" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
