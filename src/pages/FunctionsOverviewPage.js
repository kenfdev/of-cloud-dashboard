import React, { Component } from 'react';
import { FunctionTable } from '../components/FunctionTable';
import { functionsApi } from '../api/functionsApi';

export class FunctionsOverviewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      fns: [],
    };
  }
  componentDidMount() {
    const { userId } = this.props.match.params;
    this.setState({ isLoading: true });
    functionsApi.fetchFunctions(userId).then(res => {
      this.setState({ isLoading: false, fns: res });
    });
  }
  render() {
    const { userId } = this.props.match.params;
    return (
      <div className="panel panel-success">
        <div className="panel-heading">Functions</div>
        <div className="panel-body">
          <p>
            Welcome <span id="username">{userId}</span>
          </p>
          <FunctionTable isLoading={this.state.isLoading} fns={this.state.fns} />
        </div>
      </div>
    );
  }
}
