import "./dataDisplayer.scss";
import { Link } from "react-router-dom";
import '../../Custom/Button/button.scss'
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/DataContext";
import post from "../../../Interfaces/Post";
const DataDisplayer = ({type}:{type:string}) => {
  const {requestApi} = useContext(DataContext);
  const [data,setData] = useState<post[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  const [tableProperty,setTableProperty] = useState({
    id: "id",
    title: "",
    firstColumn: "",
    secondColumn: "",
    thirdColumn: "Edycja",
    deleteButton: true,
    dataInFirstColumn: "",
    dataInSecondColumn: "",
    lastRow: ""
  })
  const fetchData = async (type:string) => {
    const response = await requestApi(type);
    if (response) {
      setData(response.data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch data");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    switch (type){
      case 'blog':
        fetchData('posts');
        setTableProperty( prevState => ({...prevState,
          title : "Blog",
          firstColumn : "Nazwa",
          secondColumn : "Adres Url",
          dataInFirstColumn: "title",
          dataInSecondColumn: "url",
          lastRow : "Dodaj Nowy Wpis",
        }))
        break
      case 'subpages':
        fetchData('pages');
        setTableProperty( prevState => ({...prevState,
          title : "Niestandardowa Podstrona",
          firstColumn : "Nazwa",
          secondColumn : "Podtytuł",
          dataInFirstColumn: "title",
          dataInSecondColumn: "url",
          lastRow : "Dodaj Nową Podstronę",
        }))
        break
      case 'users':
        fetchData('users');
        setTableProperty( prevState => ({...prevState,
          id: "uid",
          title : "Użytkownicy",
          firstColumn : "Nazwa",
          secondColumn : "Mail",
          dataInFirstColumn: "name",
          dataInSecondColumn: "email",
          lastRow : "Dodaj Nowego Użytkownika",
        }))
        break
        default:
          console.log(`Type ${type} didn't exist`);
    }
    
  }, [type]);



  
  return (
    <>
      <header className="header">
        <h1 className="title shadow">{tableProperty.title}</h1>
      </header>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="table__row shadow">
              <td >{tableProperty.firstColumn}</td>
              <td>{tableProperty.secondColumn}</td>
              <td>{tableProperty.thirdColumn}</td>
            </tr>
          </thead>
          <tbody>
            {isLoading  ? (
               <tr className="table__row shadow">
                 <td colSpan={3}><span>Loading...</span></td>
               </tr>
            ) : (data?.map((element: any) => (
              <tr className="table__row shadow" key={element.id}>
                <td>{element[`${tableProperty.dataInFirstColumn}`]}</td>
                <td>{element[`${tableProperty.dataInSecondColumn}`]}</td>
                <td>
                  <Link className="button bg-primary text-secondary" to={`${element[`${tableProperty.id}`]}/edit`}><span>Edycja</span></Link>
                </td>
              </tr>)
            ))}
            <tr className="table__row shadow">
                <td colSpan={3}><Link className="button bg-primary text-secondary" to=""><span>{tableProperty.lastRow}</span></Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataDisplayer;

