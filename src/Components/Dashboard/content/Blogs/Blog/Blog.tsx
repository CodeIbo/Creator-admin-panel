import "../../../dataDisplayer/dataDisplayer.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Blog = () => {
  let { id } = useParams();
  const [post, setPost]: any = useState({});
  const requestAPI = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/post/${id}`);
      console.log(res);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <>
      {post && (
        <>
          <header className="header">
            <h1 className="title shadow">{post.title}</h1>
          </header>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr className="table__row shadow">
                  <td>Nazwa</td>
                  <td>Kontent</td>
                  <td>Edycja</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(post).map(([key, value]: any, i) => key !== 'id' && (
                  <tr className="table__row shadow" key={i}>
                    <td>{key}</td>
                    <td>{value}</td>
                    <td>
                      <Link
                        className="button bg-primary text-secondary"
                        to={`${key}`}
                      >
                        <span>Edytuj</span>
                      </Link>
                    </td>
                  </tr>
                ))}
                <tr className="table__row shadow">
                  <td colSpan={4}>
                    <Link className="button bg-primary text-secondary" to="">
                      <span>Zapisz</span>
                    </Link>
                    <Link className="button bg-primary text-secondary" to="">
                      <span>Anuluj</span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
export default Blog;
