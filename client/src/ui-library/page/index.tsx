import { styled } from "styled-components";
import { Flex } from "../flex";

export const PageContent = styled(Flex)`
  flex-grow: 1;
  height: 0;
  overflow-y: auto;
  padding: 24px 40px 24px 40px;
`;

export const PageContainer = styled(Flex).attrs({
  flexDirection: 'column',
})`
  height: 100vh;
  flex: 1;
  flex-flow: column nowrap;
`;