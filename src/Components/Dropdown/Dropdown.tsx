import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { isArray } from 'lodash';

import { UrlAttributes } from '../../Models/Api/url.model';
import DropdownParams from '../../Models/DropdownParams';
import useFetch from '../../Services/Hooks/useFetch';

function Dropdown({
  dropdownHandler,
  api_url,
  label,
  dropdownValue = '',
}: DropdownParams) {
  const { apiHandler, response, isLoading, error } = useFetch();
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
    if (response && isArray(response.data)) {
      setUrlList(response.data);
    }
  }, [isLoading]);

  if (error) {
    return (
      <Box sx={{ minWidth: '100%' }}>
        <Typography>{error.message}</Typography>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box sx={{ minWidth: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minWidth: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          value={dropdownValue ?? ''}
          label={label}
          onChange={handleChange}
        >
          {urlList.length > 0 &&
            urlList.map((url) => {
              return (
                <MenuItem key={url.id} value={url.id}>
                  /{url.url} ({url.page_category})
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
