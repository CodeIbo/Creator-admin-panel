export interface ButtonInterface {
    clickFunction : (event?:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    name: string
    backgroundColorClass?: string
    textColorClass?: string,
    type?: "button" | "submit" | "reset" | undefined,
}

export interface IconButtonInterface {
    clickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
    Icon: React.ReactNode;
    title?: string;
    type?:  "button" | "submit" | "reset" | undefined,
    customClass?: string;
}
