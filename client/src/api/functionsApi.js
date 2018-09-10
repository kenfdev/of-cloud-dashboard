import axios from 'axios';
import moment from 'moment';

class FunctionsApi {
  constructor() {
    this.selectedRepo = '';
    this.baseURL = window.PUBLIC_URL;
    this.prettyDomain = window.PRETTY_URL;
    this.queryPrettyUrl = window.QUERY_PRETTY_URL === 'true';

    this.apiBaseUrl =
      process.env.NODE_ENV === 'production' ? `${window.BASE_HREF}api` : '/api';
  }

  parseFunctionResponse({ data }, user) {
    data.sort((a, b) => {
      if (
        !a ||
        !b ||
        (!a.labels['Git-DeployTime'] || !b.labels['Git-DeployTime'])
      ) {
        return 0;
      }
      return (
        parseInt(b.labels['Git-DeployTime'], 10) -
        parseInt(a.labels['Git-DeployTime'], 10)
      );
    });

    const userPrefixRegex = new RegExp(`^${user}-`);

    return data.map(item => {
      const since = new Date(
        parseInt(item.labels['Git-DeployTime'], 10) * 1000
      );
      const sinceDuration = moment(since).fromNow();

      const shortName = item.name.replace(userPrefixRegex, '');

      let endpoint;

      if (this.queryPrettyUrl) {
        endpoint = this.prettyDomain
          .replace('user', user)
          .replace('function', shortName);
      } else {
        endpoint = this.baseURL + '/function/' + item.name;
      }

      let shortSha = item.labels['Git-SHA'];
      if (shortSha) {
        shortSha = shortSha.substr(0, 7);
      } else {
        shortSha = 'unknown';
      }

      return {
        name: item.name,
        shortName,
        endpoint,
        shortSha,
        sinceDuration,
        invocationCount: item.invocationCount,
        replicas: item.replicas,
        gitRepo: item.labels['Git-Repo'],
        gitOwner: item.labels['Git-Owner'],
        gitDeployTime: item.labels['Git-DeployTime'],
        gitSha: item.labels['Git-SHA'],
      };
    });
  }
  fetchFunctions(user) {
    const url = `${this.apiBaseUrl}/list-functions?user=${user}`;
    return axios.get(url).then(res => this.parseFunctionResponse(res, user));
  }

  fetchFunctionLog({ commitSHA, repoPath, functionName }) {
    const url = `${
      this.apiBaseUrl
    }/pipeline-log?commitSHA=${commitSHA}&repoPath=${repoPath}&function=${functionName}`;
    return axios.get(url).then(res => {
      return res.data;
    });
  }
}

export const functionsApi = new FunctionsApi();
