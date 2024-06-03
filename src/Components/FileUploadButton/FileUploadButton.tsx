import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

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

function FileUploadButton({
  onAdd,
  isLoading,
}: {
  onAdd: (newItem: FormData) => void;
  isLoading: boolean;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<FormData | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      setImage(formData);
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }
  };
  useEffect(() => {
    if (image) {
      onAdd(image);
    }
  }, [image]);
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      tabIndex={-1}
      disabled={isLoading}
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
