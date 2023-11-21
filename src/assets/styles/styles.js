import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const SHeader = styled.header`
  background-color: #7392b7;
  color: #fff;
  text-align: center;
  padding: 20px;
  position: fixed;
  width: 100%;
  height: 10vh;
  top: 0;
  left: 0;
  right: 0;
`;

export const SNavbar = styled.nav`
  background-color: #7392b7;
  color: #fff;
  text-align: center;
  padding: 10px;
  width: 100%;
  height: 5vh;
  position: fixed;
  top: 10vh;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const SSidebar = styled(SNavbar)`
  width: 4vw;
  height: 80vh;
  top: 15vh;
  right: 96vw;
  flex-direction: column;
`;

export const SFooter = styled.footer`
  background-color: #7392b7;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5vh;
`;

export const SFirstContainer = styled.main`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d8e1e9;
`;

export const SSecondContainer = styled.main`
  position: fixed;
  top: 17vh;
  bottom: 7vh;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #d8e1e9;
  overflow-y: auto;
`;

export const SThirdContainer = styled(SSecondContainer)`
  left: 5vw;
  right: 0;
  align-items: flex-start;
  padding: 3vw;
`;

export const SLink = styled(Link)`
  display: flex;
  flex-direction: ${(props) => props.flexdirection};
  justify-content: ${(props) => props.justifycontent};
  align-items: ${(props) => props.alignitems};
  height: 3vh;
  gap: 1vw;
  text-decoration: none;
  line-height: 0;
  color: #ffffff;
  &:hover {
    text-decoration: underline;
  }
`;
SLink.defaultProps = {
  flexdirection: "row",
  justifycontent: "center",
  alignitems: "center",
};

export const StyledForm = styled.form`
  width: 50vw;
  height: auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: ${(props) => props.justifycontent};
  align-items: ${(props) => props.alignitems};
  border-width: ${(props) => `${props.borderwidth}px`};
  border-style: ${(props) => props.borderstyle};
  border-color: ${(props) => props.bordercolor};
  border-radius: ${(props) => `${props.borderradius}px`};
  padding: ${(props) => `${props.padding}px`};
`;
SForm.defaultProps = {
  justifycontent: "center",
  alignitems: "start",
  borderwidth: 0,
  borderstyle: "none",
  bordercolor: "#FFFFFF",
  borderradius: 0,
};

export const SInput = styled.input`
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
`;
SInput.defaultProps = {
  height: 15,
  width: "auto",
};

export const SSelect = styled.select`
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
`;
SSelect.defaultProps = {
  height: 20,
  width: "auto",
};

export const SErrorMessage = styled.p`
  color: #ff0000;
  font-size: ${(props) => `${props.fontsize}px`};
`;
SErrorMessage.defaultProps = {
  fontsize: 15,
};

export const SSuccessMessage = styled(SErrorMessage)`
  color: #008000;
`;

export const SLabel = styled.label`
  display: flex;
  justify-content: ${(props) => props.justifycontent};
  align-items: ${(props) => props.alignitems};
  font-size: ${(props) => `${props.fontsize}px`};
`;
SLabel.defaultProps = {
  fontsize: 10,
  justifycontent: "center",
  alignitems: "center",
};

export const SButton = styled.button`
  padding: ${(props) => `${props.padding}px`};
  border-radius: ${(props) => `${props.borderradius}px`};
  margin-top: ${(props) => `${props.margintop}px`};
  background-color: #1f4d1f;
  color: #ffffff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
SButton.defaultProps = {
  padding: 10,
  borderradius: 5,
  margintop: 10,
};

export const SWrapper = styled.div`
  display: flex;
  width: ${(props) => `${props.width}%`};
  justify-content: ${(props) => props.justifycontent};
  align-items: ${(props) => props.alignitems};
  flex-direction: ${(props) => props.flexdirection};
`;
SWrapper.defaultProps = {
  justifycontent: "center",
  alignitems: "center",
  flexdirection: "row",
  width: 100,
};

export const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => `${props.marginright}px`};
`;
SFontAwesomeIcon.defaultProps = {
  marginright: 0,
};

export const SImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const StyledFormBlock = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const SBlockTitle = styled.h2`
  width: fit-content;
`;

export const StyledLabel = styled.label`
  font-size: 18px;
  color: #000000;
`;

export const StyledInput = styled.input`
  height: 25px;
  width: auto;
`;
