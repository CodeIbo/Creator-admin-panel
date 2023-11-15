/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable array-callback-return */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DynamicObject from '../../Models/DynamicObject';
import DataNames from '../../Models/dataNames';
import jsonData from '../../Services/Helpers/tableNames.json';
import useFetch from '../../Services/Hooks/useFetch';
import AlertDialog from '../AlertDialog/AlertDialog';

function DynamicTable({
  data,
  dataName,
}: {
  data: DynamicObject[];
  dataName: DataNames;
}) {
  const jsonUntypedData = jsonData[dataName] as DynamicObject;
  const [tableData, setTableData] = useState(data);
  const navigate = useNavigate();
  const { response, isLoading, error, apiHandler } = useFetch();
  const redirectToEditPage = (objectId: string) => {
    navigate(objectId, { relative: 'path' });
  };

  const deleteHandler = (objectId: string) => {
    apiHandler({
      method: 'delete',
      url: `${dataName}/${objectId}`,
    });
    setTableData((prev) =>
      prev.filter((obj) => {
        return obj.id !== objectId;
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.keys(jsonUntypedData).map((str: string) => (
              <TableCell align="center" key={str}>
                {jsonUntypedData[str]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((singleObject: any, index) => {
            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(jsonUntypedData).map((key: string, indexJSON) => {
                  if (singleObject[key]) {
                    return (
                      <TableCell align="center" key={singleObject[key]}>
                        {singleObject[key]}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={indexJSON}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          redirectToEditPage(singleObject.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          deleteHandler(singleObject.id);
                        }}
                      >
                        DELETE <DeleteIcon />
                      </Button>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DynamicTable;
