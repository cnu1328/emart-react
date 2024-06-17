import { styled } from "styled-components";
import { Flex } from "../flex";


export const HeaderContainer = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 16px 48px 16px 48px;
  width: 100%;
  box-shadow: 0px 0px 10px 0px #0000001A;
  margin-bottom: 8px;
`
export const IconContainer = styled(Flex)`
  width: 20px;
  height: 15px;
`
export const ProfileIcon = styled(Flex)`
  background: #B3B3B3;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`