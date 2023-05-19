import { useAxiosFetch, useAxiosPost } from "../../../../Hooks/useAxiosHook";
import { headersObject } from "../../../../Interfaces/dynamicHeadersObject";
import { ClassicTextInput } from "../../../Custom/Inputs/Inputs";
import { Link, useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../../Custom/Button/Button";
const ConfigEditor = ({ mode }: { mode: "new" | "edit" }) => {
  const { app } = useParams();
  const navigate = useNavigate();
  let dynamicUrl = app as string;
  const { data, isLoading, fetchError } = useAxiosFetch("config/third-parties");
  const { response, postAxios } = useAxiosPost("config/set-third-parties", {
    "name-config": dynamicUrl,
  });
  const [dataToSend, setDataToSend] = useState<null | headersObject>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: string
  ) => {
    setDataToSend((prevState) => {
      if(prevState){
        return{
          ...prevState,
          [dynamicUrl]: { 
            ...prevState[dynamicUrl],
            [key]: e.target.value
          }
          
        }
      }
    });
  };

  const Submit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    e?.preventDefault();
    if (dataToSend) {
      await postAxios(JSON.stringify(dataToSend[dynamicUrl]));
      navigate("/dashboard/config");
    }
  };
  useEffect(() => {
    setDataToSend(data);
  }, [data]);

  return (
    <form>
      <h1>Konfiguracja Kont</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : fetchError && mode === "edit" ? (
        <p>{fetchError}</p>
      ) : (
        <>
          {dataToSend &&
            Object.entries(dataToSend[dynamicUrl]).map(([key, value], i) => (
              <ClassicTextInput
                label={i.toString()}
                labelText={key}
                value={value as string}
                onChange={(e) => {
                  onChange(e, key);
                }}
                key={i}
              />
            ))}
          <section className="py-2 d-flex justify-content-center gap-1">
            <Link to="../.." relative="path" className="button text-secondary bg-primary">Powrót</Link>
            <Button clickFunction={Submit} name="Zaktualizuj Dane" />
          </section>
        </>
      )}
    </form>
  );
};

export default ConfigEditor;
