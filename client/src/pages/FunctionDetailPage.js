import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      this.setState({ isLoading: false, fn: res });
    });
  }
  render() {
    const { isLoading, fn, repoPath } = this.state;

    let panelBody;
    if (isLoading) {
      panelBody = (
        <div className="panel-body">
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon="spinner" spin />{' '}
          </div>
        </div>
      );
    } else {
      const to = `${fn.shortName}/log?repoPath=${repoPath}&commitSHA=${
        fn.gitSha
      }`;
      panelBody = (
        <div className="panel-body">
          <FunctionDetailSummary fn={fn} />
          <div className="pull-right">
            <Link className="btn btn-default" to={to}>
              <FontAwesomeIcon icon="folder-open" /> View Logs
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="panel panel-success">
        <div className="panel-heading">Function Overview</div>
        {panelBody}
      </div>
    );
  }
}
