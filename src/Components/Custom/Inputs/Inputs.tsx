import { CodeInputEditorInterface, dateInputInterface, defaultInput, textAreaInterface } from "../../../Interfaces/inputIntefraces"
import './Input.scss'
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import { useRef, useEffect } from "react";


const ClassicTextArea= ({label,labelText,value,onChange,onKeyDown,required,cols,maxLenght}:textAreaInterface ) =>{
    return(
        <div className="Input">
            <label htmlFor={label}>{labelText}</label>
            <textarea id={label} onKeyDown={onKeyDown} className="Input" value={value} onChange={onChange} wrap="soft" cols={cols || 5} required={required || false} maxLength={maxLenght || 200}/>
        </div>
        
    )
}
const ClassicTextInput= ({label,labelText,value,onChange,onKeyDown,required,type}:defaultInput<HTMLInputElement> ) =>{
    return(
        <div className="Input">
            <label htmlFor={label}>{labelText}</label>
            <input id={label} onKeyDown={onKeyDown} className="Input" value={value} onChange={onChange} required={required || false} type={type}/>
        </div>
        
    )
}


const DatePicker = ({date,onChange,required}:dateInputInterface) =>{

    return(
        <div className="Input Input--date">
            <label htmlFor="datePicker">Data:</label>
             <input className="Input__datePicker" id="datePicker" type="date" value={date} onChange={onChange} required={required || false}/>
        </div>
       
    )
}

const CodeInputEditor = ({code,onChange,language,placeholder}:CodeInputEditorInterface) =>{
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
          language={language ||"html"}
          placeholder={placeholder || "Please enter Html code."}
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
    ClassicTextInput,
    ClassicTextArea,
    DatePicker,
    CodeInputEditor
}



