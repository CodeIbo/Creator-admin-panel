import { Link } from "react-router-dom"
import '../dataDisplayer.scss'


const PodcastRow = ({ tableProperty, data }: { tableProperty: any, data: any }) => {
  return (
    <>
      {Array.isArray(data) &&
        data?.map((element: any) => (
          <tr className="table__row shadow" key={element.id}>
            <td>{element[`${tableProperty.dataInFirstColumn}`]}</td>

            <td className="table__row--overflow-text">{element[`${tableProperty.dataInSecondColumn}`]}</td>
            <td>
              {tableProperty.id && <Link
                className="button bg-primary text-secondary"
                to={tableProperty.id && `edit/${element[`${tableProperty.id}`]}`}
                replace={true}
              >
                <span>Edycja</span>
              </Link>}

            </td>
          </tr>
        ))}
    </>
  )
}

export default PodcastRow
