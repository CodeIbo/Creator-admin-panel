import "./dataDisplayer.scss";
import { Link } from "react-router-dom";
import "../../Custom/Button/button.scss";
import { useEffect, useState } from "react";
import {useAxiosFetch} from "../../../Hooks/useAxiosHook";
const DataDisplayer = ({ type }: { type: string }) => {
  const [typeData, setDataType] = useState("");
  const { data, fetchError, isLoading } = useAxiosFetch(typeData);

  const [tableProperty, setTableProperty] = useState({
    id: "id",
    title: "",
    firstColumn: "",
    secondColumn: "",
    thirdColumn: "Edycja",
    deleteButton: true,
    dataInFirstColumn: "",
    dataInSecondColumn: "",
    lastRow: "",
  });

  useEffect(() => {
    switch (type) {
      case "blog":
        setDataType("posts");
        setTableProperty((prevState) => ({
          ...prevState,
          title: "Blog",
          firstColumn: "Nazwa",
          secondColumn: "Tagi",
          dataInFirstColumn: "title",
          dataInSecondColumn: "tags",
          lastRow: "Dodaj Nowy Wpis",
        }));
        break;
      case "subpages":
        setDataType("pages");
        setTableProperty((prevState) => ({
          ...prevState,
          title: "Niestandardowa Podstrona",
          firstColumn: "Nazwa",
          secondColumn: "Podtytuł",
          dataInFirstColumn: "title",
          dataInSecondColumn: "url",
          lastRow: "Dodaj Nową Podstronę",
        }));
        break;
      case "users":
        setDataType("users");
        setTableProperty((prevState) => ({
          ...prevState,
          id: "uid",
          title: "Użytkownicy",
          firstColumn: "Nazwa",
          secondColumn: "Mail",
          dataInFirstColumn: "name",
          dataInSecondColumn: "email",
          lastRow: "Dodaj Nowego Użytkownika",
        }));
        break;
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
              <td>{tableProperty.firstColumn}</td>
              <td>{tableProperty.secondColumn}</td>
              <td>{tableProperty.thirdColumn}</td>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="table__row shadow">
                <td colSpan={3}>
                  <span>Loading...</span>
                </td>
              </tr>
            ) : fetchError ? (
              <tr className="table__row shadow">
                <td colSpan={3}>
                  <span>{fetchError}</span>
                </td>
              </tr>
            ) : (
              Array.isArray(data) && data?.map((element: any) => (
                <tr className="table__row shadow" key={element.id}>
                  <td>{element[`${tableProperty.dataInFirstColumn}`]}</td>
                  <td>{element[`${tableProperty.dataInSecondColumn}`]}</td>
                  <td>
                    <Link
                      className="button bg-primary text-secondary"
                      to={`${element[`${tableProperty.id}`]}/edit`}
                    >
                      <span>Edycja</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
            <tr className="table__row shadow">
              <td colSpan={3}>
                <Link className="button bg-primary text-secondary" to="">
                  <span>{tableProperty.lastRow}</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataDisplayer;

