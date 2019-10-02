import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ToDoHome from './ToDoHome';
import CompletedPages from './CompletedPages';
import TrashPage from './TrashPage';
import CreateEditPage from './CreateEditPage';
import { Route, withRouter } from 'react-router-dom';

class NavBar extends React.Component {

    getCurrentPage = () => {
        const location = window.location.href;
        const locArr = location.split('/');
        let currLoc = locArr[locArr.length - 1];
        if (currLoc === '') {
            currLoc = 'home';
        }

        if (currLoc.indexOf('?') > -1) {
            currLoc = currLoc.split('?')[0];
        }

        return currLoc;
    }
    render() {
        return (
            <div className="container p-5">
                <Tabs activeKey={this.getCurrentPage()} id="uncontrolled-tab-example" onSelect={(key) => { window.location = '/' + key; }}>
                    <Tab eventKey="home" title="Home" className='p-3 border-left border-right border-bottom'>
                        <Route exact path='/home' component={ToDoHome} />
                    </Tab>
                    <Tab eventKey="completed" title="Completed Pages" className='p-3 border-left border-right border-bottom'>
                        <Route path='/completed' component={CompletedPages} />
                    </Tab>
                    <Tab eventKey="trash" title="Trash Page" className='p-3 border-left border-right border-bottom'>
                        <Route path='/trash' component={TrashPage} />
                    </Tab>
                    <Tab eventKey="createEdit" title="Create/Edit Page" className='p-3 border-left border-right border-bottom'>
                        <Route path='/createEdit' component={CreateEditPage} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default withRouter(NavBar);