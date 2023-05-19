import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAxiosFetch, useAxiosPost } from "../../../../Hooks/useAxiosHook";
import { post, comment } from "../../../../Interfaces/Post";
import { Button, IconButton } from "../../../Custom/Button/Button";
import {
  ClassicTextArea,
  DatePicker,
  CodeInputEditor,
  ClassicTextInput,
} from "../../../Custom/Inputs/Inputs";
import "./BlogEditor.scss";
import { AiFillDelete } from "react-icons/ai";

const BlogEditor = ({ mode }: { mode: "new" | "edit" }) => {
  let postLink = "add/post"
  let { id } = useParams();
  if(mode === "edit"){
    postLink = `edit/post/${id}`
  }
 
  const navigate = useNavigate();
  const { response, postAxios } = useAxiosPost(postLink);
  const { data, isLoading, fetchError } = useAxiosFetch(`post/${id}`);
  const [post, setPostData] = useState<post>({
    title: "",
    subtitle: "",
    date: "",
    url: "",
    content: "",
    tags: [],
    comments: [],
  });
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (data && !Array.isArray(data) && mode === "edit") {
      setPostData(data as post);
    }
  }, [data]);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    dataProperty: string
  ) => {
    if (dataProperty === "tags") {
      setInputValue(e.currentTarget.value);
    } else {
      setPostData((prevState) => ({
        ...prevState,
        [dataProperty]: e.target.value,
      }));
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagList = post.tags;
      let duplicate: boolean = tagList.includes(inputValue);
      if (!duplicate) {
        tagList.push(inputValue);
        setInputValue("");
        setPostData((prevState) => ({ ...prevState, tags: tagList }));
      } else {
        setInputValue("");
      }
    }
  };

  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | number,
    dataProperty: string
  ) => {
    e.preventDefault();
    setPostData((prevState) => {
      const arrayOfData = prevState[dataProperty]?.filter(
        (oneElemnt: string | comment, index: number) => {
          if (dataProperty === "comments" && typeof oneElemnt === "object") {
            return oneElemnt.id !== id;
          } else {
            return index !== id;
          }
        }
      );
      return { ...prevState, [dataProperty]: arrayOfData };
    });
  };

  const submit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    e?.preventDefault();
    await postAxios(JSON.stringify(post));
    navigate("/dashboard/blog");
  };

  return (
    <form>
      <h1>BlogEditor</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : fetchError && mode === "edit" ? (
        <p>{fetchError}</p>
      ) : (
        <>
          <ClassicTextInput
            value={post.url}
            onChange={(e) => onChange(e, "url")}
            label="url"
            labelText="Adres:"
            required={true}
          />
          <ClassicTextInput
            value={post.title}
            onChange={(e) => onChange(e, "title")}
            label="title"
            labelText="Tytuł:"
            required={true}
          />
          <ClassicTextInput
            value={post.subtitle}
            onChange={(e) => onChange(e, "subtitle")}
            label="subtitle"
            labelText="Podtytuł:"
            required={true}
          />
          <ClassicTextInput
            value={inputValue}
            onChange={(e) => onChange(e, "tags")}
            onKeyDown={(e) => onKeyPress(e)}
            label="tag"
            labelText="Tagi:"
            required={false}
          />
          <div className="d-flex justify-content-center gap-1 flex-wrap pb-2">
            {post.tags.length > 0 ? (
              post.tags.map((tag, index) => (
                <span
                  className="p-1 bg-secondary d-flex justify-content-center align-items-center gap-1"
                  key={index}
                >
                  {tag}
                  <IconButton
                    clickFunction={(e) => {
                      removeItem(e, index, "tags");
                    }}
                    title="Usuń Tag"
                    Icon={<AiFillDelete />}
                    customClass="text-primary d-flex justify-content-center align-items-center"
                  />
                </span>
              ))
            ) : (
              <p className="p-1 bg-secondary text-primary">
                Dodaj nowe Tagi :)
              </p>
            )}
          </div>
          <CodeInputEditor
            code={post.content}
            onChange={(e: any) =>
              setPostData((prevState) => ({
                ...prevState,
                content: e.target.value,
              }))
            }
          />
          <DatePicker
            date={post.date}
            onChange={(e) => onChange(e, "date")}
            required={true}
          />
          <h3 className="my-2 text-center">Sekcja Komentarzy</h3>
          <table className="commentTable w-100 text-center mb-2">
            <thead>
              <tr>
                <th>Autor</th>
                <th>Komentarz</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {post.comments && post.comments.length > 0 ? (
                post.comments?.map((comment, index) => (
                  <tr key={index}>
                    <td>{comment.userName}</td>
                    <td>{comment.comment}</td>
                    <td>
                      <IconButton
                        clickFunction={(e) => {
                          removeItem(e, comment.id, "comments");
                        }}
                        title="Usuń komentarz"
                        Icon={<AiFillDelete />}
                        customClass="text-primary"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Brak Komentarzy :)</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="py-2 d-flex justify-content-center gap-1">
            <Link
              to={mode === "new"? "../": "../.."}
              relative="path"
              className="button text-secondary bg-primary"
            >
              Powrót
            </Link>
            <Button clickFunction={submit} name={mode === "new" ? "Dodaj" : "Aktualizuj"} />
          </div>
        </>
      )}
    </form>
  );
};

export default BlogEditor;

