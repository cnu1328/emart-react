import { Table as AntTable, TableProps } from 'antd';
import { TableWrapper } from './styles';

export type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

export interface CustomTableProps<T> extends TableProps<T> {
  readOnly?: boolean;
  transparent?: boolean;
  noShadows?: boolean;
}

export const Table = <T extends object>({
  columns,
  tableLayout = 'fixed',
  noShadows = false,
  readOnly = false,
  transparent = false,
  ...props
}: CustomTableProps<T>) => (
  <TableWrapper transparent={transparent} $readOnly={readOnly} noShadows={noShadows}>
    <AntTable
      id="members-table"
      rowKey="id"
      tableLayout={tableLayout}
      columns={columns}
      // style={{ border: "1px solid #ccc", borderRadius: "10px"}}
      {...props}
      getPopupContainer={() => document.getElementById('members-table')!}
    />
  </TableWrapper>
);
