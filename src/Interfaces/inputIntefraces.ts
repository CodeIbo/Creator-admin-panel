import { ChangeEvent,KeyboardEvent } from "react";

export interface defaultInput<TypeElement> {
    label: string,
    labelText:string,
    value: string,
    onChange: (event:ChangeEvent<TypeElement>) => void,
    onKeyDown?: (event: KeyboardEvent<TypeElement>) => void,
    required?: boolean
    type? : string
}

export interface textAreaInterface extends defaultInput<HTMLTextAreaElement>{
    maxLenght?:number,
    cols?:number,
    rows?:number
}

export interface CodeInputEditorInterface {
    code: string,
    onChange: (event:ChangeEvent<HTMLTextAreaElement>) => void,
    language?: string,
    placeholder?: string,
}

export interface dateInputInterface {
    date: string,
    onChange: (event:ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}