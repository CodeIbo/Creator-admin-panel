import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent, useEffect, useRef } from 'react';
import useFetch from '../../Services/Hooks/useFetch';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FileUploadButton({ onAdd }: { onAdd: (newItem: any) => void }) {
  const { apiHandler, response, error, isLoading } = useFetch();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { triggerAlert } = useAlert();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      apiHandler({
        method: 'post',
        url: '/image',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      }).then(() => {
        if (inputFileRef.current) {
          inputFileRef.current.value = '';
        }
      });
    }
  };
  useEffect(() => {
    if (response?.data) {
      onAdd(response.data);

      triggerAlert('Image Added', 'success');
    }
    if (error) {
      triggerAlert(error.message, 'error');
    }
  }, [isLoading, error]);
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      tabIndex={-1}
    >
      Upload file
      <VisuallyHiddenInput
        ref={inputFileRef}
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
}
export default FileUploadButton;
