import BlogEditor from "./Blog/BlogEditor";
import CustomPageEditor from "./CustomPages/CustomPagesEditor";
import UserEditor from "./Users/UsersEditor";
import './dataEditor.scss'
const DataEditor = ({type}:{type:string}) => {
    let component
    switch(type){
        case 'blog':
            component = <BlogEditor mode="edit"/>
            break
        case 'customPages':
            component = <CustomPageEditor/>
            break
        case 'users':
            component = <UserEditor/>
            break
        default:
            console.log(`${type} didnt exist`)
    }


  return (
    <>
      <header className="header">
        <h1 className="title shadow">TEST</h1>
      </header>
      <div className="table-wrapper">
        <section className="backgroundWrapper">
            {component}
        </section>
        
      </div>
    </>
  );
};

export default DataEditor;
