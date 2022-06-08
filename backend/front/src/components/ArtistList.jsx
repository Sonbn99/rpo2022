import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import BackendService from "../services/BackendService";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
const ArtistList = (props) => {
    const [message, setMessage] = useState();
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [show_alert, setShowAlert] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 2;
    const navigate = useNavigate();

    const onPageChanged = (cp) => {
        refreshArtists(cp - 1);
    };
    const addArtistClicked = () => {
        navigate(`/artists/-1`);
    };
    const deleteArtistsClicked = () => {
        let x = [];
        artists.map((t, idx) => {
            if (checkedItems[idx]) {
                x.push(t);
            }
            return 0;
        });
        if (x.length > 0) {
            var msg;
            if (x.length > 1) {
                msg = "Пожалуйста подтвердите удаление " + x.length + " стран";
            } else {
                msg = "Пожалуйста подтвердите удаление страны " + x[0].name;
            }
            setShowAlert(true);
            setSelectedArtists(x);
            setMessage(msg);
        }
    };
    const handleGroupCheckChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
    };
    const setChecked = (v) => {
        setCheckedItems(Array(artists.length).fill(v));
    };
    const updateArtistClicked = (id) => {
        navigate(`/artists/${id}`);
    };
    const handleCheckChange = (e) => {
        const idx = e.target.name;
        const isChecked = e.target.checked;
        let checkedCopy = [...checkedItems];
        checkedCopy[idx] = isChecked;
        setCheckedItems(checkedCopy);
    };
    useEffect(() => {
        refreshArtists(page);
    }, []);
    const refreshArtists = (cp) => {
        BackendService.retrieveAllArtists(cp, limit)
            .then((resp) => {
                setArtists(resp.data.content);
                setHidden(false);
                setTotalCount(resp.data.totalElements);
                setPage(cp);
            })
            .catch(() => {
                setHidden(true);
                setTotalCount(0);
            })
            .finally(() => setChecked(false));
    };
    const onDelete = () => {
        BackendService.deleteArtists(selectedArtists)
            .then(() => refreshArtists(page))
            .catch(() => {});
    };
    const closeAlert = () => {
        setShowAlert(false);
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>Художники</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={addArtistClicked}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Добавить
                        </button>
                    </div>
                    <div className="btn-group ms-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={deleteArtistsClicked}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Удалить
                        </button>
                    </div>
                </div>
            </div>
            <div className="row my-2 me-0">
                <Pagination
                    totalRecords={totalCount}
                    pageLimit={limit}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                />
                <table className="table table-sm">
                    <thead className="thead-light">
                    <tr>
                        <th>Название</th>
                        <th>Страна</th>
                        <th>Век</th>
                        <th>
                            <div className="btn-toolbar pb-1">
                                <div className="btn-group ms-auto">
                                    <input type="checkbox" onChange={handleGroupCheckChange} />
                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {artists &&
                        artists.map((artist, index) => (
                            <tr key={artist.id}>
                                <td>{artist.name}</td>
                                <td>{artist.country.name}</td>
                                <td>{artist.century}</td>
                                <td>
                                    <div className="btn-toolbar">
                                        <div className="btn-group ms-auto">
                                            <button
                                                className="btn btn-outline-secondary btn-sm btn-toolbar"
                                                onClick={() => updateArtistClicked(artist.id)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} fixedWidth />
                                            </button>
                                        </div>
                                        <div className="btn-group ms-2 mt-1">
                                            <input
                                                type="checkbox"
                                                name={index}
                                                checked={
                                                    checkedItems.length > index
                                                        ? checkedItems[index]
                                                        : false
                                                }
                                                onChange={handleCheckChange}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Alert
                title="Удаление"
                message={message}
                ok={onDelete}
                close={closeAlert}
                modal={show_alert}
                cancelButton={true}
            />
        </div>
    );
};
export default ArtistList;