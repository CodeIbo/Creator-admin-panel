import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { AnyObject } from 'yup';

export interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (row: T, value?: any) => JSX.Element;
}

interface TableProps<T extends AnyObject> {
  data: T[];
  columns: Column<T>[];
  includeKeys?: (keyof T)[];
}

function TableGenerator<T extends AnyObject>({
  data,
  columns,
  includeKeys = [],
}: TableProps<T>) {
  const finalColumns = useMemo(() => {
    return columns.filter(
      (column) =>
        includeKeys.includes(column.accessor as keyof T) || column.render
    );
  }, [columns, includeKeys]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {finalColumns.map((column) => (
              <TableCell key={column.accessor as string} align="center">
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={uuidv4()}>
              {finalColumns.map((column) => {
                if (column.render) {
                  return (
                    <TableCell key={uuidv4()} align="center">
                      {column.render(row)}
                    </TableCell>
                  );
                }
                const value = row[column.accessor as keyof T];
                return (
                  <TableCell key={uuidv4()} align="center">
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableGenerator;
