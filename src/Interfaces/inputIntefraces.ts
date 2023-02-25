import { ChangeEvent } from "react";

export interface textAreaInterface {
    label: string,
    labelText:string,
    value: string,
    onChange: (event:ChangeEvent<HTMLTextAreaElement>) => void,
    cols?:number 
}

export interface CodeInputEditorInterface {
    code: string,
    onChange: (event:ChangeEvent<HTMLTextAreaElement>) => void,
}