import {
  Accordion,
  Button as BootstrapButton,
  Col as BootstrapCol,
  Container,
  Form,
  Image,
  ListGroup as BootstrapListGroup,
  Modal as BootstrapModal,
  Nav as BootstrapNav,
  Navbar as BootstrapNavbar,
  Row as BootstrapRow,
  Table as BootstrapTable,
} from "react-bootstrap";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Menu,
  Upload,
} from "lucide-react";

const variantMap = {
  default: "secondary",
  error: "danger",
};

function normalizeVariant(variant) {
  return variantMap[variant] || variant;
}

export function Grid(props) {
  return <Container {...props} />;
}

export function Row(props) {
  return <BootstrapRow {...props} />;
}

export function Table(props) {
  return <BootstrapTable {...props} />;
}

function breakpoint(span, offset) {
  if (offset === undefined) return span;
  return { span: span ?? true, offset };
}

export function Col({
  lg,
  lgOffset,
  md,
  mdOffset,
  sm,
  smOffset,
  xs,
  xsOffset,
  ...props
}) {
  return (
    <BootstrapCol
      xs={breakpoint(xs, xsOffset)}
      md={breakpoint(sm, smOffset)}
      lg={breakpoint(md, mdOffset)}
      xl={breakpoint(lg, lgOffset)}
      {...props}
    />
  );
}

export function Navbar({
  children,
  className = "",
  toggleLabel = "Toggle navigation",
  ...props
}) {
  const { toggleNavKey: _toggleNavKey, ...navbarProps } = props;
  return (
    <BootstrapNavbar
      className={`navbar-default ${className}`.trim()}
      expand="lg"
      {...navbarProps}
    >
      <BootstrapNavbar.Toggle
        aria-controls="infoeducatie-navigation"
        label={toggleLabel}
      />
      <BootstrapNavbar.Collapse id="infoeducatie-navigation">
        {children}
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export function Nav({ children, className = "", right, ...props }) {
  return (
    <BootstrapNav
      as="ul"
      className={`${right ? "ms-auto" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </BootstrapNav>
  );
}

export function NavItem({ active, children, eventKey, to, ...props }) {
  const { as: LinkComponent, ...linkProps } = props;
  const safeLinkProps =
    linkProps.target === "_blank" && !linkProps.rel
      ? { ...linkProps, rel: "noreferrer" }
      : linkProps;
  return (
    <li className={active ? "active" : undefined}>
      <BootstrapNav.Link
        as={LinkComponent}
        eventKey={eventKey}
        to={to}
        {...safeLinkProps}
      >
        {children}
      </BootstrapNav.Link>
    </li>
  );
}

export function FormGroup({ children, validationState, ...props }) {
  return (
    <Form.Group
      className={`form-group${validationState ? ` has-${validationState}` : ""}`}
      {...props}
    >
      {children}
    </Form.Group>
  );
}

export function ControlLabel(props) {
  return <Form.Label {...props} />;
}

export function FormControl({
  bsSize,
  bsStyle,
  componentClass,
  hasFeedback: _hasFeedback,
  ...props
}) {
  const validationState = normalizeVariant(bsStyle);
  const validationProps = {
    isInvalid: validationState === "danger",
    isValid: validationState === "success",
  };

  if (componentClass === "select") {
    return <Form.Select size={bsSize === "large" ? "lg" : bsSize} {...props} />;
  }

  return (
    <Form.Control
      as={componentClass === "textarea" ? "textarea" : undefined}
      size={bsSize === "large" ? "lg" : bsSize}
      {...validationProps}
      {...props}
    />
  );
}

FormControl.Feedback = function Feedback() {
  return null;
};

export function Button({ bsSize, bsStyle, ...props }) {
  return (
    <BootstrapButton
      size={bsSize === "large" ? "lg" : bsSize}
      variant={normalizeVariant(bsStyle || "default")}
      {...props}
    />
  );
}

export function Checkbox({ children, ...props }) {
  return <Form.Check type="checkbox" label={children} {...props} />;
}

export function ListGroup(props) {
  return <BootstrapListGroup {...props} />;
}

export function ListGroupItem({ bsStyle, ...props }) {
  return (
    <BootstrapListGroup.Item
      variant={normalizeVariant(bsStyle)}
      {...props}
    />
  );
}

export function PanelGroup({ activeKey, children, onSelect, ...props }) {
  const { accordion: _accordion, ...accordionProps } = props;
  return (
    <Accordion activeKey={activeKey} onSelect={onSelect} {...accordionProps}>
      {children}
    </Accordion>
  );
}

export function Panel({ bsStyle, children, eventKey, header }) {
  return (
    <Accordion.Item
      className={bsStyle ? `border-${normalizeVariant(bsStyle)}` : undefined}
      eventKey={eventKey}
    >
      <Accordion.Header>{header}</Accordion.Header>
      <Accordion.Body>{children}</Accordion.Body>
    </Accordion.Item>
  );
}

const icons = {
  "align-justify": Menu,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "th-large": Grid3X3,
  upload: Upload,
};

export function Glyphicon({ glyph, ...props }) {
  const Icon = icons[glyph] || Menu;
  return (
    <Icon
      aria-hidden="true"
      className={`glyphicon glyphicon-${glyph}`}
      size={18}
      {...props}
    />
  );
}

export function Thumbnail(props) {
  return <Image thumbnail {...props} />;
}

export const Modal = BootstrapModal;
