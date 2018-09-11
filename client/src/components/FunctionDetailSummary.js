import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FunctionDetailSummary.css';

export const FunctionDetailSummary = ({ fn }) => {
  const repo = `${fn.gitOwner}/${fn.gitRepo}`;
  return (
    <div className="function-detail-summary row">
      <div className="col-md-5">
        <div className="panel panel-default">
          <div className="panel-body">
            <div>
              <h4>
                Summary <FontAwesomeIcon icon="info-circle" />
              </h4>
            </div>
            <dl className="dl-horizontal">
              <dt>Name:</dt>
              <dd>{fn.shortName}</dd>
              <dt>Endpoint:</dt>
              <dd>
                <a href={fn.endpoint} target="_blank">
                  {fn.endpoint}
                </a>
              </dd>
              <dt>Replicas:</dt>
              <dd>{fn.replicas}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="panel panel-default">
          <div className="panel-body">
            <div>
              <h4>
                Git <FontAwesomeIcon icon="code-branch" />
              </h4>
            </div>
            <dl className="dl-horizontal">
              <dt>Repository:</dt>
              <dd>
                <a href={`https://github.com/${repo}`} target="_blank">
                  {repo}
                </a>
              </dd>
              <dt>SHA:</dt>
              <dd>
                <a
                  href={`https://github.com/${repo}/commit/${fn.gitSha}`}
                  target="_blank"
                >{`${fn.gitSha}`}</a>
              </dd>
              <dt>Deploy Time:</dt>
              <dd>{`${fn.sinceDuration}`}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="col-sm-4 col-md-2">
        <div className="panel panel-default invocation-count">
          <div className="panel-body">
            <div>
              <h5>
                Invocation Count <FontAwesomeIcon icon="bolt" />
              </h5>
            </div>
            <div>
              <p>{fn.invocationCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FunctionDetailSummary.propTypes = {
  fn: PropTypes.object.isRequired,
};
