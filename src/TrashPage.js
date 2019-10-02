import React from 'react';
import { Table, Button } from 'react-bootstrap';

export default class TrashPage extends React.Component {
    constructor() {
        super();
        this.state = {
            allToDos: this.getDeletedToDos()
        };
    }

    getDeletedToDos() {
        var alltodos = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            const val = localStorage.getItem(keys[i]).split(',');
            const isDeleted = val[4] === 'true';

            if (isDeleted) {
                alltodos.push({ key: keys[i], text: val[0], dueDate: val[1], completeDate: val[2], isPending: val[3] });
            }


        }

        return alltodos;

    }

    restoreToDo = (key) => {
        const item = localStorage.getItem(key);
        const itemParts = item.split(',');

        itemParts[4] = false;

        localStorage.setItem(key, itemParts.toString());
        alert('TO DO RESTORED');

        const { allToDos } = this.state;
        const index = allToDos.findIndex(x => x.key === key);
        allToDos.splice(index, 1);

        this.setState({ allToDos });
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
                                        <Button className="ml-3 btn-danger" variant="primary" onClick={() => this.restoreToDo(item.key)}>Restore</Button>
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