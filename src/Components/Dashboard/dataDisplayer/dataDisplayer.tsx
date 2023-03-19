import "./dataDisplayer.scss";
import { Link, useLocation } from "react-router-dom";
import "../../Custom/Button/button.scss";
import { useEffect, useState } from "react";
import { useAxiosFetch } from "../../../Hooks/useAxiosHook";
import PostRow from "./tableRows/postRow";
import ConfigRows from "./tableRows/configRow";
const DataDisplayer = ({ type }: { type: string }) => {
  const [typeData, setDataType] = useState("");
  const { data, fetchError, isLoading } = useAxiosFetch(typeData);
  const [jsxElement, setJsxElement] = useState(<></>);
  const location = useLocation();

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
    to: "",
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
          to: "new",
        }));
        setJsxElement(<PostRow tableProperty={tableProperty} data={data} />);
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
      case "config":
        setDataType("config/third-parties");
        setTableProperty((prevState) => ({
          ...prevState,
          title: "Konfiguracja kont",
          firstColumn: "Aplikacja",
          secondColumn: "Nazwa Użytkownika",
          dataInFirstColumn: "name",
          dataInSecondColumn: "email",
          lastRow: "",
        }));
        setJsxElement(<ConfigRows tableProperty={tableProperty} data={data} />);
        break;
      default:
        console.log(`Type ${type} didn't exist`);
    }
  }, [type, data]);

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
            ) : fetchError || jsxElement === null ? (
              <tr className="table__row shadow">
                <td colSpan={3}>
                  <span>{fetchError}</span>
                </td>
              </tr>
            ) : (
              <>{jsxElement}</>
            )}
            <tr className="table__row shadow">
              <td colSpan={3}>
                {tableProperty.lastRow ? (
                  <Link
                    className="button bg-primary text-secondary"
                    to={`${location.pathname}/${tableProperty.to}`}
                  >
                    <span>{tableProperty.lastRow}</span>
                  </Link>
                ) : (
                  <Link
                    className="button bg-primary text-secondary"
                    to="/dashboard"
                  >
                    <span>Dashboard</span>
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataDisplayer;

