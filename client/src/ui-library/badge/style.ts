import { styled } from "styled-components";
import { Flex } from "../flex";

export const StyledBadge = styled(Flex) <{ background: string }>`
  padding: 4px 8px 4px 8px;
  width: 86px;
  height: 23px;
  background: ${({ background }) => background};
  border-radius: 8px;
`