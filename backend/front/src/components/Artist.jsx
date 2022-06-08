import React, { useState, useEffect } from "react";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import BackendService from "../services/BackendService";
import { useNavigate, useParams } from "react-router-dom";
import { store, alertActions } from "../utils/Rdx";
const Artist = (props) => {
    const [value, setValue] = useState({
        name: "",
        country: { id: "", name: "" },
        century: "",
    });
    const [hidden, setHidden] = useState(false);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    let id = useParams().id;
    useEffect(() => {
        if (parseInt(id) !== -1) {
            BackendService.retrieveArtist(id)
                .then((res) => {
                    setValue(res.data);
                })
                .catch(() => setHidden(true));
        }
        BackendService.retrieveAllCountries(0, 0).then((res) => {
            setCountries(res.data.content);
        });
    }, []);
    const handleChange = (e) => {
        if (e.target.name === "country")
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
        let artist = { id: id, ...value };
        if (parseInt(artist.id) === -1) {
            BackendService.createArtist(artist)
                .then(() => navigate(`/artists`))
                .catch(() => {});
        } else {
            BackendService.updateArtist(artist)
                .then(() => navigate(`/artists`))
                .catch(() => {});
        }
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>Художника</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(`/artists`)}
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
                        placeholder="Enter artist name"
                        onChange={(e) => handleChange(e)}
                        value={value.name}
                        name="name"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => handleChange(e)}
                        name="country"
                        value={JSON.stringify(value.country)}
                    >
                        {countries &&
                            countries.map((country, index) => (
                                <option key={index} value={JSON.stringify(country)}>
                                    {country.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Century</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter century"
                        onChange={(e) => handleChange(e)}
                        value={value.century}
                        name="century"
                        autoComplete="off"
                    />
                </Form.Group>
                <button className="btn btn-outline-secondary" type="submit">
                    <FontAwesomeIcon icon={faSave} />
                    &nbsp;Save
                </button>
            </Form>
        </div>
    );
};
export default Artist;