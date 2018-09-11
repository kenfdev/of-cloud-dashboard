import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { functionsApi } from '../api/functionsApi';
import { FunctionDetailSummary } from '../components/FunctionDetailSummary';

export class FunctionDetailPage extends Component {
  constructor(props) {
    super(props);
    const { repoPath } = queryString.parse(props.location.search);
    const { user, functionName } = props.match.params;
    this.state = {
      isLoading: true,
      fn: null,
      user,
      repoPath,
      functionName,
    };
  }
  componentDidMount() {
    const { user, repoPath, functionName } = this.state;
    this.setState({ isLoading: true });
    functionsApi.fetchFunction(user, repoPath, functionName).then(res => {
      console.log('fn', res);
      this.setState({ isLoading: false, fn: res });
    });
  }
  render() {
    const { isLoading, fn } = this.state;
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon="spinner" spin />{' '}
        </div>
      );
    }

    return <FunctionDetailSummary fn={fn} />;
  }
}
