import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default class CreateEditPage extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            dueDate: "2019-09-23",
            completedDate: "2019-09-22"
        };

        this.setTodo = this.setTodo.bind(this);
    }

    componentDidMount() {
        const isEdit = window.location.href.indexOf('?') > -1;

        if (isEdit) {
            const item = window.localStorage.getItem(window.location.href.split('?')[1].split('=')[1]);
            const itemParts = item.split(',');
            this.setState({ name: itemParts[0], dueDate: itemParts[1], completedDate: itemParts[2] });
        }

    }

    setTodo() {
        //check if add or edit
        const isEdit = window.location.href.indexOf('?') > -1;

        if (isEdit) {
            //getting item from the local storage
            const key = window.location.href.split('?')[1].split('=')[1];
            const item = window.localStorage.getItem(key);

            const itemParts = item.split(',');

            itemParts[0] = this.state.name;
            itemParts[1] = this.state.dueDate;
            itemParts[2] = this.state.completedDate;

            window.localStorage.setItem(key, itemParts.toString());
            alert("TO DO IS UPDATED");
        } else {
            window.localStorage.setItem(Math.random(), this.state.name + "," + this.state.dueDate + "," + this.state.completedDate + ",true,false");
            alert("TO DO IS SET");
            window.location = '/home';
        }

    }

    render() {
        return (
            <div>
                <Form className="text-left">
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Text</Form.Label>
                                <Form.Control type="text" placeholder="Name" value={this.state.name} onChange={(evt) => {
                                    this.setState({ name: evt.target.value });
                                }} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control type="Date" placeholder="Select Date" value={this.state.dueDate} onChange={(evt) => {
                                    this.setState({ dueDate: evt.target.value });
                                    console.log(evt.target.value);
                                }} />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Button className="text-center" variant="primary" onClick={this.setTodo}>
                        {window.location.href.indexOf('?') > -1 ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </div>
        )
    }
}