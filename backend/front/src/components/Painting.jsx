import React, { useState, useEffect } from "react";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import BackendService from "../services/BackendService";
import { useNavigate, useParams } from "react-router-dom";
import { store, alertActions } from "../utils/Rdx";
const Painting = (props) => {
    const [value, setValue] = useState({
        name: "",
        artist: {},
        museum: {},
    });
    const [artists, setArtists] = useState([]);
    const [museums, setMuseums] = useState([]);
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();
    let id = useParams().id;
    useEffect(() => {
        if (parseInt(id) !== -1) {
            BackendService.retrievePainting(id)
                .then((res) => {
                    setValue(res.data);
                })
                .catch(() => setHidden(true));
        }
        BackendService.retrieveAllArtists(0, 0).then((res) =>
            setArtists(res.data.content)
        );
        BackendService.retrieveAllMuseums(0, 0).then((res) =>
            setMuseums(res.data.content)
        );
    }, []);
    const handleChange = (e) => {
        if (e.target.name === "artist" || e.target.name === "museum")
            setValue({ ...value, [e.target.name]: JSON.parse(e.target.value) });
        else setValue({ ...value, [e.target.name]: e.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let err = null;
        if (err) {
            store.dispatch(alertActions.error(err));
            return null;
        }
        let painting = { ...value, id: id };
        if (parseInt(painting.id) === -1) {
            BackendService.createPainting(painting)
                .then(() => navigate(`/paintings`))
                .catch(() => {});
        } else {
            BackendService.updatePainting(painting)
                .then(() => navigate(`/paintings`))
                .catch(() => {});
        }
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>Painting</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(`/paintings`)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} /> Back
                        </button>
                    </div>
                </div>
            </div>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter painting name"
                        onChange={(e) => handleChange(e)}
                        value={value.name}
                        name="name"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Artist</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => handleChange(e)}
                        name="artist"
                        value={JSON.stringify(value.artist)}
                    >
                        {artists &&
                            artists.map((artist, index) => (
                                <option key={index} value={JSON.stringify(artist)}>
                                    {artist.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Museum</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => handleChange(e)}
                        name="museum"
                        value={JSON.stringify(value.museum)}
                    >
                        {museums &&
                            museums.map((museum, index) => (
                                <option key={index} value={JSON.stringify(museum)}>
                                    {museum.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <button className="btn btn-outline-secondary" type="submit">
                    <FontAwesomeIcon icon={faSave} />
                    &nbsp;Save
                </button>
            </Form>
        </div>
    );
};
export default Painting;