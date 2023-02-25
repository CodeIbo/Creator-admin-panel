import { CodeInputEditorInterface, textAreaInterface } from "../../../Interfaces/inputIntefraces"
import './Input.scss'
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import { useRef, useEffect } from "react";


const ClassicTextArea= ({label,labelText,value,onChange,cols}:textAreaInterface ) =>{
    return(
        <div className="Input">
            <label htmlFor={label}>{labelText}</label>
            <textarea id={label} className="Input" value={value} onChange={onChange} wrap="soft" cols={cols || 5}/>
        </div>
        
    )
}


const DatePicker = () =>{

    return(
        <div className="Input Input--date">
            <label htmlFor="datePicker">Data:</label>
             <input className="Input__datePicker" id="datePicker" type="date" />
        </div>
       
    )
}

const CodeInputEditor = ({code,onChange}:CodeInputEditorInterface) =>{
    const textRef:any = useRef();

    useEffect(() => {
        if (textRef.current) {
            new SelectionText(textRef.current);
        }
    }, []);

    return(
        <div data-color-mode="night-mode">
        <label htmlFor="code">Kod:</label>
        <CodeEditor
          id="code"
          value={code}
          ref={textRef}
          language="html"
          placeholder="Please enter Html code."
          onChange={onChange}
          padding={15}
          style={{
            fontSize: 12,
          }}
        />
        </div>
    )
}



  



export {
    ClassicTextArea,
    DatePicker,
    CodeInputEditor
}



