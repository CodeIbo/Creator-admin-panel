import { Link } from "react-router-dom";
import "../dataDisplayer.scss";

const PostRow = ({ tableProperty, data }:{tableProperty:any,data:any}) => {
  return (
    <>
      {Array.isArray(data) &&
        data?.map((element: any) => (
          <tr className="table__row shadow" key={element.id}>
            <td>{element[`${tableProperty.dataInFirstColumn}`]}</td>
            <td>
              {Array.isArray(element[`${tableProperty.dataInSecondColumn}`]) ? (
                <>
                  {element[`${tableProperty.dataInSecondColumn}`]
                    .slice(0, 2)
                    .map((item: string) => (
                      <span>{item}&nbsp;</span>
                    ))}
                </>
              ) : (
                <>{element[`${tableProperty.dataInSecondColumn}`]}</>
              )}
            </td>
            <td>
              <Link
                className="button bg-primary text-secondary"
                to={`${element[`${tableProperty.id}`]}/edit`}
              >
                <span>Edycja</span>
              </Link>
            </td>
          </tr>
        ))}
    </>
  );
};

export default PostRow;
