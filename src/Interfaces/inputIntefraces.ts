import { ChangeEvent,KeyboardEvent } from "react";

export interface textAreaInterface {
    label: string,
    labelText:string,
    value: string,
    maxLenght?:number,
    onChange: (event:ChangeEvent<HTMLTextAreaElement>) => void,
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void,
    cols?:number,
    required?: boolean
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