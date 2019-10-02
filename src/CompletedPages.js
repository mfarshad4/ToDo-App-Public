import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

export default class CompletedPages extends React.Component {

    constructor() {
        super();
        this.state = {
            allToDos: this.getToDos()
        };
    }

    getToDos() {
        var alltodos = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            const val = localStorage.getItem(keys[i]).split(',');

            const isPending = val[3] === 'true';

            if (!isPending) {
                alltodos.push({ key: keys[i], text: val[0], dueDate: val[1], completeDate: val[2] });
            }
        }

        return alltodos;

    }

    deleteToDo = (key) => {
        const item = localStorage.getItem(key);
        const itemParts = item.split(',');

        itemParts[4] = true;

        localStorage.setItem(key, itemParts.toString());
        alert('TO DO DELETED');

        const { allToDos } = this.state;
        const index = allToDos.findIndex(x => x.key === key);
        allToDos.splice(index, 1);

        this.setState({ allToDos });
    }

    componentDidMount() {
        this.getToDos();
    }

    render() {
        return (
            <div><Table striped bordered hover className="mb-0">
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Due Date</th>
                        <th>Completed Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.allToDos.map((item, index) =>
                            <tr key={item.key}>
                                <td>{item.text}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.completeDate}</td>
                                <td className="d-flex text-center">
                                    <Form.Group>
                                        <Form.Check
                                            required
                                            name="pending"
                                            id="validationFormik0"
                                        />
                                    </Form.Group>
                                    <Button className="ml-3" variant="primary" onClick={() => this.deleteToDo(item.key)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            </div>
        )
    }
}