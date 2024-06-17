import styled from 'styled-components';

export interface FlexProps {
  wrap?: boolean;
  spaceBetween?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
  alignSelfCenter?: boolean;
  justifyContent?: string;
  flexDirection?: string;
  alignItems?: string;
  alignSelf?: string;
  margin?: string;
  noShrink?: boolean;
  borderRadius?: string;
  centered?: boolean;
  inline?: boolean;
  textAlignStart?: boolean;
  flexGrow?: boolean;
  hiddenOverflow?: boolean;
  gap?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ gap }) => gap ? `gap: ${gap};` : ''};
  ${({ inline }) => inline ? `display: inline-flex;` : ''};
  ${({ wrap }) => wrap ? `flex-wrap: wrap;` : ''};
  ${({ spaceBetween }) => spaceBetween ? `justify-content: space-between;` : ''};
  ${({ justifyContentCenter }) => justifyContentCenter ? `justify-content: center;` : ''};
  ${({ alignItemsCenter }) => alignItemsCenter ? ` align-items: center;` : ''};
  ${({ margin }) => margin ? margin : ''};
  ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection}` : ''};
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''};
  ${({ alignSelf }) => alignSelf ? alignSelf : ''};
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''};
  ${({ noShrink }) => noShrink ? `flex-shrink: 0;` : ''};
  ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ''};
  ${({ textAlignStart }) => textAlignStart ? `text-align: start;` : ''};
  ${({ flexGrow }) => flexGrow ? `flex-grow: 1;` : ''};
  ${({ hiddenOverflow }) => hiddenOverflow ? `overflow: hidden;` : ''};
  ${({ alignSelfCenter }) => alignSelfCenter ? `align-self: center;` : ''};

  ${({ centered }) => centered ? `
    justify-content: center;
    align-items: center;
  ` : ''};
`;
