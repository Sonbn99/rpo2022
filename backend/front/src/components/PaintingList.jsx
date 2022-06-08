import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import BackendService from "../services/BackendService";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
const PaintingList = (props) => {
    const [message, setMessage] = useState();
    const [paintings, setPaintings] = useState([]);
    const [selectedPaintings, setSelectedPaintings] = useState([]);
    const [show_alert, setShowAlert] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 2;
    const navigate = useNavigate();

    const onPageChanged = (cp) => {
        refreshPaintings(cp - 1);
    };
    const addPaintingClicked = () => {
        navigate(`/paintings/-1`);
    };
    const deletePaintingsClicked = () => {
        let x = [];
        paintings.map((t, idx) => {
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
            setSelectedPaintings(x);
            setMessage(msg);
        }
    };
    const handleGroupCheckChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
    };
    const setChecked = (v) => {
        setCheckedItems(Array(paintings.length).fill(v));
    };
    const updatePaintingClicked = (id) => {
        navigate(`/paintings/${id}`);
    };
    const handleCheckChange = (e) => {
        const idx = e.target.name;
        const isChecked = e.target.checked;
        let checkedCopy = [...checkedItems];
        checkedCopy[idx] = isChecked;
        setCheckedItems(checkedCopy);
    };
    useEffect(() => {
        refreshPaintings(page);
    }, []);
    const refreshPaintings = (cp) => {
        BackendService.retrieveAllPaintings(cp, limit)
            .then((resp) => {
                setPaintings(resp.data.content);
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
        BackendService.deletePaintings(selectedPaintings)
            .then(() => refreshPaintings(page))
            .catch(() => {});
    };
    const closeAlert = () => {
        setShowAlert(false);
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>Картины</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={addPaintingClicked}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Добавить
                        </button>
                    </div>
                    <div className="btn-group ms-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={deletePaintingsClicked}
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
                        <th>Автор</th>
                        <th>Музей</th>

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
                    {paintings &&
                        paintings.map((painting, index) => (
                            <tr key={painting.id}>
                                <td>{painting.name}</td>
                                <td>{painting.artist.name}</td>
                                <td>{painting.museum.name}</td>
                                <td>
                                    <div className="btn-toolbar">
                                        <div className="btn-group ms-auto">
                                            <button
                                                className="btn btn-outline-secondary btn-sm btn-toolbar"
                                                onClick={() => updatePaintingClicked(painting.id)}
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
export default PaintingList;