import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { isArray } from 'lodash';
import useFetch from '../../Services/Hooks/useFetch';
import DropdownParams from '../../Models/DropdownParams';
import { AxiosResponseTypedData } from '../../Models/AxiosResponse';
import { UrlAttributes } from '../../Models/Api/url.model';

function Dropdown({
  dropdownHandler,
  api_url,
  label,
  dropdownValue,
}: DropdownParams) {
  const { apiHandler, response, isLoading, error } = useFetch();
  const [fetchedData, setFetchedData] = useState<
    AxiosResponseTypedData<UrlAttributes> | object
  >({});
  const [urlList, setUrlList] = useState<UrlAttributes[] | []>([]);

  const handleChange = (event: SelectChangeEvent) => {
    dropdownHandler((prev) => {
      return {
        ...prev,
        url_id: event.target.value as string,
        position_on_list: urlList.length + 1,
      };
    });
  };

  useEffect(() => {
    apiHandler({
      method: 'get',
      url: api_url,
    });
  }, []);
  useEffect(() => {
    if (response) {
      setFetchedData(response);
      if (isArray(response.data)) {
        setUrlList(response.data);
      }
    }
  }, [response]);

  return (
    <Box sx={{ minWidth: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          value={dropdownValue}
          label={label}
          onChange={handleChange}
        >
          {urlList.length > 0 &&
            urlList.map((url) => {
              return (
                <MenuItem key={url.id} value={url.id}>
                  /{url.url}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
