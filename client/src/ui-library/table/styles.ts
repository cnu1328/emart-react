import styled from 'styled-components';
import { InputField } from '../input';

export const StyledInput = styled(InputField)`
  margin-top: -36px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  font-style: normal;
`;

export const TableWrapper = styled.div<{
  noShadows?: boolean;
  $readOnly?: boolean;
  transparent?: boolean;
}>`
  ${({ transparent }) =>
    transparent &&
    `.ant-table {
    background-color: inherit;
  }`}

  ${({ noShadows }) =>
    noShadows &&
    `
  .ant-table-container::before, 
  .ant-table-container::after {
    box-shadow: none !important;
  }
`}

  .ant-table-row {
    cursor: ${({ $readOnly }) => ($readOnly ? 'auto' : 'pointer')};
  }

  .ant-table-thead > tr > th,
  .ant-table-thead > tr > td {
    background-color: ${({ transparent }) => (transparent ? 'inherit' : 'white')};
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
      [colspan]
    )::before {
    display: none;
  }
  .ant-table-wrapper .ant-table-thead >tr>th {
    font-weight: 500;
  }

  .ant-table-thead > tr > th,
  .ant-table-thead > tr > td {
    border-bottom: 1px solid #D9D9D9;
  }


  .ant-pagination-item-active {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-table-filter-dropdown {
    .ant-input {
      height: 32px;
    }
  }

`;
