import React, { useState, useEffect } from "react";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import BackendService from "../services/BackendService";
import { useNavigate, useParams } from "react-router-dom";
import { store, alertActions } from "../utils/Rdx";
const User = (props) => {
    const [value, setValue] = useState({
        login: "",
        email: "",
    });
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();
    let id = useParams().id;
    useEffect(() => {
        if (parseInt(id) !== -1) {
            BackendService.retrieveUser(id)
                .then((res) => {
                    setValue(res.data);
                })
                .catch(() => setHidden(true));
        }
    }, []);
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let err = null;
        if (err) {
            store.dispatch(alertActions.error(err));
            return null;
        }
        let user = { ...value, id: id };
        if (parseInt(user.id) === -1) {
            BackendService.createUser(user)
                .then(() => navigate(`/users`))
                .catch(() => {});
        } else {
            BackendService.updateUser(user)
                .then(() => navigate(`/users`))
                .catch(() => {});
        }
    };
    if (hidden) return null;
    return (
        <div className="m-4">
            <div className="row my-2">
                <h3>User</h3>
                <div className="btn-toolbar">
                    <div className="btn-group ms-auto">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(`/users`)}
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
                        placeholder="Enter user name"
                        onChange={(e) => handleChange(e)}
                        value={value.login}
                        name="login"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        onChange={(e) => handleChange(e)}
                        value={value.email}
                        name="email"
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
export default User;