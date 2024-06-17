import styled from "styled-components";
import { Flex } from "../../ui-library/flex";



export const FlexContainer = styled(Flex)`
    width: 70%;
    margin: auto;
    margin-top: 40px;
    flex-direction: column;

    @media (max-width: 740px) {
        width: 90%;
    }
`