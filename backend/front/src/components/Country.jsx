import React, { useState, useEffect } from "react";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import BackendService from "../services/BackendService";
import { useNavigate, useParams } from "react-router-dom";
import { store, alertActions } from "../utils/Rdx";
const Country = (props) => {
    const [value, setValue] = useState(null);
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();
    let id = useParams().id;
    useEffect(() => {
        if (parseInt(id) !== -1) {
            BackendService.retrieveMuseum(id)
                .then((res) => {
                    setValue(res.data.name);
                })
                .catch(() => setHidden(true));
        }
    }, []);
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let err = null;
        if (err) {
            store.dispatch(alertActions.error(err));
            return null;
        }
        let country = { id: id, name: value };
        if (parseInt(country.id) === -1) {
            BackendService.createCountry(country)
                .then(() => navigate(`/countries`))
                .catch(() => {});
        } else {
            BackendService.updateCountry(country)
                .then(() => navigate(`/countries`))
                .catch(() => {});
        }
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>Страна</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(`/countries`)}
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
                        placeholder="Enter country name"
                        onChange={(e) => handleChange(e)}
                        value={value}
                        name="name"
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
export default Country;