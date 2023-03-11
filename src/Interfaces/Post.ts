export interface comment {
  id: string;
  userName: string;
  comment: string;
}

export  interface post {
    id?: string;
    title: string;
    subtitle: string;
    url: string;
    date: string;
    content: string;
    src_photo?: string;
    tags: string[];
    comments?: comment[] | [];
    [key: string]: any;
}