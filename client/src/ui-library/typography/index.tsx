import styled from 'styled-components';
import theme from "../../assets/css/theme";


interface Props { color?: string; fontWeight?: 400 | 500 | 600 }

const colorStyle = ({ color }: { color?: string }) => `
color: ${color || theme.primary};
`;

const fontWeightStyle = ({ fontWeight }: { fontWeight?: 400 | 500 | 600 }) => `
font-weight: ${fontWeight || 500};
`;

export const H1 = styled.h1<Props>`
  font-size: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  font-weight: 500;
`
export const H2 = styled.h2<Props>`
  font-size: 18px !important;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
`


export const Label = styled.span<Props>`
  display: inline-block;
  font-size: 16px;
  ${colorStyle};
  ${fontWeightStyle};
`;

export const Subtext = styled.div<{
  error?: boolean;
  secondary?: boolean;
  color?: string;
  fontWeight?: 400 | 500 | 600;
}>`
  font-size: 0.875rem;
  line-height: 1.375rem;
  ${colorStyle};
  ${fontWeightStyle};
`;

export const XtraSmallText = styled.div<{
  error?: boolean;
  secondary?: boolean;
  color?: string;
  fontWeight?: 400 | 500 | 600;
}>`
  font-size: 12px;
  line-height: 1rem;
  ${colorStyle};
  ${fontWeightStyle};
`;


const linkStyle = `
  font-weight: normal;
  color: ${theme.colorLink};
  cursor: pointer;
  &:hover, :active, :focus {
    text-decoration: underline;
  }
`;

export const Link1 = styled.a`
  ${linkStyle}
  font-size: ${theme.fontSize}px;
  line-height: 1.375rem;
`;

export const Link2 = styled.a`
  ${linkStyle}
  font-size: ${theme.fontSizeSM}px;
  line-height: 1.125rem;
`;