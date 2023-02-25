import { useState } from "react"
import post from "../../../../Interfaces/Post"
import { ClassicTextArea, DatePicker ,CodeInputEditor} from "../../../Custom/Inputs/Inputs"

const BlogEditor = () =>{
    const [data,setData] = useState<post>({
        title:'',
        subtitle:'',
        date: '',
        content: '',
        tags: [],
        comments: []
    })
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>,dataProperty:string
        ) =>{
        setData((prevState => ({ ...prevState, [dataProperty]: e.target.value })))
    }

    return (
        <>
            <h1>BlogEditor</h1>
            <ClassicTextArea value={data.title} onChange={(e) => onChange(e,'title') } label="title" labelText="Tytuł:"  />
            <ClassicTextArea value={data.subtitle} onChange={(e) => onChange(e,'subtitle') } label="subtitle" labelText="Podtytuł:"  />
            <DatePicker/>
            <CodeInputEditor code={data.content} onChange={(e:any) => setData((prevState => ({ ...prevState, content: e.target.value })))}/>
        </>
    )
}

export default BlogEditor