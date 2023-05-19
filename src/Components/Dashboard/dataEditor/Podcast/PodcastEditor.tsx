import { Link, useNavigate, useParams } from "react-router-dom";
import { useAxiosFetch, useAxiosPost } from "../../../../Hooks/useAxiosHook";
import { useEffect, useState } from "react";
import spotifyEpisode from "../../../../Interfaces/spotifyEpisode";
import { ClassicTextArea, ClassicTextInput } from "../../../Custom/Inputs/Inputs";
import { AiFillDelete } from "react-icons/ai";
import { Button, IconButton } from "../../../Custom/Button/Button";

const PodcastEditor = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const { response, postAxios } = useAxiosPost(`spotify/podcast/edit/${id}`);
    const { data, isLoading, fetchError } = useAxiosFetch(`spotify/podcast/episodes/${id}`);
    const [dataToSend, setDataToSend] = useState<null | spotifyEpisode>(null)
    const [tagValue, setTagValue] = useState<string>("");
    useEffect(() => {
        setDataToSend(data);
    }, [data]);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => {
        if (value === 'tags') {
            setTagValue(e.target.value)
        }
        else {
            setDataToSend((prevState) => {
                if (prevState && dataToSend) {
                    let key = Object.keys(dataToSend as spotifyEpisode).find(k => dataToSend[k] === value);
                    return {
                        ...prevState,
                        [key as string]: e.target.value
                    }
                }
                else {
                    return prevState
                }
            })
        }

    }

    const removeItem = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string | number,
        dataProperty: string
    ) => {
        e.preventDefault();
        setDataToSend((prevState) => {
            if (prevState) {
                const arrayOfData = prevState[dataProperty]?.filter(
                    (oneElemnt: string, index: number) => {
                        return index !== id;
                    }
                )
                return { ...prevState, [dataProperty]: arrayOfData };
            }
            else {
                return prevState
            }

        });
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && dataToSend) {
            e.preventDefault();
            const tagList: string[] = dataToSend.tags;
            let duplicate: boolean = tagList.includes(tagValue);
            if (!duplicate) {
                tagList.push(tagValue);
                setTagValue("");
                setDataToSend((prevState) => {
                    if (prevState) {
                        return { ...prevState, tags: tagList }
                    }
                    else {
                        return prevState
                    }
                })
            } else {
                setTagValue("");
            }
        }
    };
    const submit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
      ) => {
        e?.preventDefault();
        await postAxios(JSON.stringify(dataToSend));
        navigate("/dashboard/blog");
      };

    return (
        <form>
            <h1>Podcast Editor</h1>
            {isLoading ? <p>Loading....</p> :
                fetchError ? <p>{fetchError}</p> :
                    <>
                        {dataToSend &&
                            <>
                                <ClassicTextInput label="title" labelText="Tytuł" value={dataToSend.title} onChange={e => onChange(e, dataToSend.title)} />
                                <ClassicTextArea label="description" labelText="Opis" value={dataToSend.description} onChange={e => onChange(e,dataToSend.description)}/>
                                <ClassicTextInput
                                    
                                    value={tagValue}
                                    onChange={(e) => onChange(e, "tags")}
                                    onKeyDown={(e) => onKeyPress(e)}
                                    label="tag"
                                    labelText="Tagi:"
                                    required={false}
                                />
                                <div className="d-flex justify-content-center gap-1 flex-wrap pb-2">
                                    {dataToSend.tags.length > 0 ?
                                        dataToSend.tags.map((tag, index) => (
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
                                        :
                                        <p className="p-1 bg-secondary text-primary">
                                            Dodaj nowe Tagi :)</p>
                                    }
                                </div>
                            </>

                        }

                    </>
            }
            <div className="py-2 d-flex justify-content-center gap-1">
                <Link
                to="/dashboard/podcast"
                relative="path"
                className="button text-secondary bg-primary"
                >
                Powrót
                </Link>
                <Button clickFunction={submit} name="Aktualizuj" />
          </div>
        </form>
    )
}

export default PodcastEditor