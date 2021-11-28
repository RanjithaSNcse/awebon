import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Accordion, Table } from 'react-bootstrap';
import { apiCall } from './common/ApiCall';

import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accordionList: [],
      isLoading: true
    }
    this.eventHandler = this.eventHandler.bind(this);
    this.eventHandlerChild = this.eventHandlerChild.bind(this);
  }

  componentDidMount() {
    this.getAccordionList();
  }

  getAccordionList() {
    apiCall('/v1/getBanner/1', undefined, 'get', resp => {
      if (resp) {
        this.setState({
          accordionList: resp.accordian
        },
          this.setState({
            isLoading: false
          })
        )

      }
    });
  }

  eventHandler = (index) => {
    var array = this.state.accordionList;
    array[index].IsMandatory = !this.state.accordionList[index].IsMandatory;
    this.setState({
      accordionList: array
    })
  }

  eventHandlerChild = (ParentIndex, childIndex) => {
    var array = this.state.accordionList;
    array[ParentIndex].PluginList[childIndex].BlockingEnabled = !this.state.accordionList[ParentIndex].PluginList[childIndex].BlockingEnabled;
    this.setState({
      accordionList: array
    })
  }

  render() {
    if (this.state.isLoading) {
      return (<p>loading...</p>)
    } else {
      return (
        <div className="bodyBgColor">
          <p>cookie banner / minimalista</p>
          <div className="containerBody">
            <div className="firstContainer">
              <h1>Can we store cookies?</h1>
              <p>
                We and our partners use technologies, such as cookies, and process personal data, such as IP addresses and cookies identifiers, to personalize ads and content based on your interest, measure the performance of ads and content, and derive insights about the audiences who saw ads and content.
                <br /><br />
                Click below to consent to the use of the technology and the processing of your personal data for these purposes. You can change your mind and change your consent choices at any time by returning to this site.
                <br /><br />
                you can familiarize with our <strong style={{ textDecoration: 'underline' }}>Privacy Policy</strong>
              </p>
              <br />
              <div>
                <button className="primaryBtn">Accept All</button>
                <button className="SecondaryBtn">Save Settings</button>
                <span className="select">Customize </span>
              </div>
              <br />
            </div>

            <div className="secondContainer">
              {this.state.accordionList.length > 0 ? this.state.accordionList.map((event, index) => {
                return (<div className="accordionDiv" key={event.CategoyId}>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>
                        <label class="switch">
                          <input type="checkbox" checked={event.IsMandatory} onClick={() => this.eventHandler(index)} />
                          <span class="slider round"></span>
                        </label>
                        {event.CategoyHeading}</Accordion.Header>
                      <Accordion.Body>
                        {event.CategoyText}                        
                        <br/><br/>
                        <div className="accorddionTableWith">
                          <Table >
                            <thead>
                              <tr><th>Plugins</th>
                                <th>Block/Enable</th>
                                <th></th></tr>
                            </thead>
                            <tbody>
                              {event.PluginList.length > 0 ? event.PluginList.map((childEvent, childIndex) => {
                                return (<tr key={event.ComplianceTypeID}>
                                  <td>{childEvent.ComplianceType}</td>
                                  <td>
                                    <label class="switch">
                                      <input type="checkbox" checked={childEvent.BlockingEnabled} onClick={() => this.eventHandlerChild(index,childIndex)} />
                                      <span class="slider round"></span>
                                    </label>
                                  </td>
                                  <td><a href={childEvent.optOutExternalLink} target="_blank">Go to Site</a></td>
                                </tr>);
                              }) : <tr></tr>
                              }
                            </tbody>
                          </Table >
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>)
              })
                : <Container>
                  <h3>No Upcoming Events</h3>
                </Container>
              }

            </div>
          </div>
        </div>
      );
    }
  }
}

export default App
