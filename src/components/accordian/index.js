import React from "react";
import {
  Container,
  Inner,
  Frame,
  Title,
  Item,
  Header,
  Body,
} from "../accordian/styles/accordian";

const ToggleContext = React.createContext();

export default function Accordian({ children, restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordian.Title = function AccordianTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordian.Frame = function AccordianFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordian.Item = function AccordianItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = React.useState(false);
  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordian.Header = function AccordianHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = React.useContext(ToggleContext);
  return (
    //You can use () => setToggleShow((toggleShow) => !toggleShow) if ract starts batching state updates
    <Header onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      {children}
      {toggleShow ? (
        <img src="/images/icons/close-slim.png" alt="close" />
      ) : (
        <img src="/images/icons/add.png" alt="open" />
      )}
    </Header>
  );
};

Accordian.Body = function AccordianBody({ children, ...restProps }) {
  const { toggleShow } = React.useContext(ToggleContext);

  return toggleShow ? <Body {...restProps}>{children}</Body> : null;
};
