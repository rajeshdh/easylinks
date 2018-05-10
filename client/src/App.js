import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import API from "./apiService";

import ListItem from "./components/ListItem";
import CreateLink from "./components/CreateLink";

const myApi = new API({ url: "http://localhost:3001" });
myApi.createEntity({ name: "link" });
class App extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.addLink = this.addLink.bind(this);
    this.loadEditLink = this.loadEditLink.bind(this);
    this.editLink = this.editLink.bind(this);
  }
  state = {
    links: [],
    updateItem: null
  };
  componentDidMount() {
    // console.log(myApi.endpoints);
    myApi.endpoints.link
      .getAll()
      .then(links => {
        this.setState({ links });
      })
      .catch(err => console.log(err));
  }
  removeItem(itemIndex) {
    myApi.endpoints.link.delete({ id: itemIndex }).then(msg => {
      // TODO: Do something with the msg
      let newState = this.state.links.filter(link => link._id !== itemIndex);
      this.setState({ links: newState });
    });
  }

  loadEditLink(item) {
    this.setState({ updateItem: item });
  }
  editLink(link) {
    // console.log(link);
    myApi.endpoints.link.update(link).then(data => {
      this.setState({ updateItem: null });
      let newState = this.state.links.map(function(link) {
        return link._id === data._id ? data : link;
      });
      this.setState({ links: newState });
    });
  }
  addLink(newLink) {
    myApi.endpoints.link.create(newLink).then(data => {
      let array = [...this.state.links].concat(data);
      this.setState({ links: array });
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="main">
          {this.state.updateItem ? (
            <CreateLink addLink={this.editLink} item={this.state.updateItem} />
          ) : (
            <CreateLink addLink={this.addLink} />
          )}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Category</th>
                <th>Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.links.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    item={item}
                    index={item._id}
                    removeItem={this.removeItem}
                    loadEditLink={this.loadEditLink}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
