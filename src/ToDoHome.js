import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class ToDoHome extends React.Component {

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
            const isDeleted = val[4] === 'true';

            if (isPending && !isDeleted) {
                alltodos.push({ key: keys[i], text: val[0], dueDate: val[1], completeDate: val[2], isPending: val[3] });
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

    completeToDo = (key) => {
        const item = localStorage.getItem(key);
        const itemParts = item.split(',');

        const today = new Date();

        itemParts[2] = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        itemParts[3] = false;

        window.localStorage.setItem(key, itemParts.toString());
        alert('TO DO COMPLETED');

        const { allToDos } = this.state;
        const index = allToDos.findIndex(x => x.key === key);
        allToDos.splice(index, 1);
    }

    componentDidMount() {
        this.getToDos();
    }

    render() {
        return (
            <div>
                <Table striped bordered hover className="mb-0">
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allToDos.map((item, index) =>
                                <tr key={item.key}>
                                    <td>{item.text}</td>
                                    <td>{item.dueDate}</td>
                                    <td className="d-flex text-center mx-auto">
                                        <Button className="ml-3 btn-primary" variant="primary" onClick={() => this.completeToDo(item.key)}>Complete</Button>
                                        <Button className="ml-3 btn-danger" variant="primary" onClick={() => this.deleteToDo(item.key)}>Delete</Button>
                                        <Button className="ml-3 btn-warning" variant="primary" onClick={() => window.location = '/createEdit?id=' + item.key}>Edit</Button>
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