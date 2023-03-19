import BlogEditor from "./Blog/BlogEditor";
import CustomPageEditor from "./CustomPages/CustomPagesEditor";
import UserEditor from "./Users/UsersEditor";
import './dataEditor.scss'
import ConfigEditor from "./Config/ConfigEditor";
const DataEditor = ({type,mode}:{type:string,mode:"new" | "edit"}) => {
  let component
    switch(type){
        case 'blog':
            component = <BlogEditor mode={mode}/>
            break
        case 'customPages':
            component = <CustomPageEditor/>
            break
        case 'users':
            component = <UserEditor/>
            break
        case 'config':
            component = <ConfigEditor mode={mode}/>
            break
        default:
            console.log(`${type} didnt exist`)
    }


  return (
    <>
      <header className="header">
        <h1 className="title shadow">Edit mode</h1>
      </header>
      <div className="table-wrapper">
        <section className="backgroundWrapper">
            {component && component}
        </section>
        
      </div>
    </>
  );
};

export default DataEditor;
