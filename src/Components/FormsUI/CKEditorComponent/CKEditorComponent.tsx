import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

interface CKEditorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

function CKEditorComponent({ value, onChange }: CKEditorComponentProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default CKEditorComponent;
