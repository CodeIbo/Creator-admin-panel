import AceEditor from 'react-ace';
import ace from 'ace-builds/src-noconflict/ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/ext-language_tools';

import './CodeEditor.scss';
import EditorParams from '../../../Models/EditorHandler';

function Editor({ editorHandler, value }: EditorParams) {
  ace.config.set(
    'basePath',
    'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
  );
  ace.config.setModuleUrl(
    'ace/mode/javascript_worker',
    'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
  );
  return (
    AceEditor && (
      <AceEditor
        mode="html"
        onChange={editorHandler}
        value={value}
        theme="chaos"
        width="100%"
        height="100%"
        setOptions={{
          useWorker: false,
          enableLiveAutocompletion: true,
        }}
      />
    )
  );
}

export default Editor;
