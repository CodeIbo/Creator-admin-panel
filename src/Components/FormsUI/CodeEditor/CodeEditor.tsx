import AceEditor from 'react-ace';
import ace from 'ace-builds/src-noconflict/ace';
import beautify from 'ace-builds/src-noconflict/ext-beautify';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/ext-language_tools';

import './CodeEditor.scss';
import { useEffect, useRef } from 'react';
import EditorParams from '../../../Models/EditorHandler';

function Editor({ editorHandler, value }: EditorParams) {
  const editorRef = useRef<any>();
  ace.config.set(
    'basePath',
    'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
  );
  ace.config.setModuleUrl(
    'ace/mode/javascript_worker',
    'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
  );
  useEffect(() => {
    beautify.beautify(editorRef.current.editor.session);
  }, []);
  return (
    AceEditor && (
      <AceEditor
        mode="html"
        onChange={editorHandler}
        value={value}
        ref={editorRef}
        theme="chaos"
        width="100%"
        height="100%"
        setOptions={{
          useWorker: false,
          enableLiveAutocompletion: true,
          wrap: true,
        }}
      />
    )
  );
}

export default Editor;
