import { Dispatch, SetStateAction } from 'react';

type EditorParams = {
  editorHandler: Dispatch<SetStateAction<string>>;
  value: string;
};

export default EditorParams;
