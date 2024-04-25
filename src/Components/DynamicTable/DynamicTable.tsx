import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonGroup, Typography } from '@mui/material';
import _ from 'lodash';
import { TableDataNames } from '../../Models/dataNames';
import jsonData from '../../Services/Helpers/tableNames.json';
import useFetch from '../../Services/Hooks/useFetch';
import LinkButton from '../LinkButton/LinkButton';
import {
  ApiCallback,
  AxiosResponseUnTypedData,
} from '../../Models/AxiosResponse';
import { TableHelper } from '../../Models/JSONHelpers';

function DynamicTable({
  data = [],
  dataName,
}: {
  data: AxiosResponseUnTypedData['data'];
  dataName: TableDataNames;
}) {
  const jsonUntypedData: TableHelper[TableDataNames] = jsonData[dataName];
  const [tableData, setTableData] = useState<ApiCallback[] | []>(
    data as ApiCallback[] | []
  );
  const { apiHandler } = useFetch();
  const [searchParams] = useSearchParams();

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
  return tableData && _.isArray(tableData) && tableData.length > 0 ? (
    <>
      <LinkButton
        variant="contained"
        sx={{
          margin: '0 0 1rem auto',
          display: 'block',
          maxWidth: '10rem',
          textAlign: 'center',
        }}
        component={Link}
        to="new"
        buttonText="ADD NEW"
        state={{ urlKey: searchParams.get('key') }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(jsonUntypedData).map((str) => (
                <TableCell align="center" key={str}>
                  {
                    jsonUntypedData[str as keyof TableHelper[TableDataNames]]
                      ?.header
                  }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((singleObject, index) => {
              return (
                <TableRow
                  key={Object.keys(singleObject)[index]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.keys(jsonUntypedData).map((key) => {
                    if (key in singleObject) {
                      return (
                        <TableCell align="center" key={key}>
                          {singleObject[key as keyof ApiCallback]}
                        </TableCell>
                      );
                    }
                    if (key === 'action') {
                      return (
                        <TableCell
                          key={key}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}
                        >
                          <Button
                            variant="outlined"
                            component={Link}
                            to={`edit/${singleObject.id}`}
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
                    }
                    if (key === 'children') {
                      return (
                        <TableCell sx={{ textAlign: 'center' }} key={key}>
                          <Link
                            to={{
                              pathname:
                                singleObject[
                                  jsonUntypedData[
                                    key as keyof TableHelper[TableDataNames]
                                  ]?.key as keyof ApiCallback
                                ],
                            }}
                          >
                            {`${jsonUntypedData[
                              key as keyof TableHelper[TableDataNames]
                            ]?.header}`}
                          </Link>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell sx={{ textAlign: 'center' }} key={key}>
                        <Typography
                          typography="p"
                          textAlign="center"
                          sx={{ color: 'red' }}
                        >
                          JSON ERROR
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : (
    <>
      <Typography typography="h3" textAlign="center" sx={{ marginTop: '5rem' }}>
        Add New Content :)
      </Typography>
      <ButtonGroup
        variant="outlined"
        size="large"
        sx={{ marginTop: '5rem', textAlign: 'center' }}
        fullWidth
      >
        <LinkButton
          color="error"
          component={Link}
          to=".."
          relative="path"
          buttonText="Back to Home Page"
        />
        <LinkButton
          component={Link}
          to="new"
          buttonText="ADD NEW"
          state={{ urlKey: searchParams.get('key') }}
        />
      </ButtonGroup>
    </>
  );
}

export default DynamicTable;
