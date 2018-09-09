import axios from 'axios';
import { functionsApi } from './functionsApi';
jest.mock('axios');

const user = 'some-user';
const baseFunction = {
  name: `${user}-some-function`,
  image: `ofcommunity/${user}-some-function-repo-some-function:latest-xxxxxxx`,
  invocationCount: 0,
  replicas: 1,
};
const baseFunctionLabels = {
  'Git-Cloud': '1',
  'Git-DeployTime': '1536401680',
  'Git-Owner': user,
  'Git-Repo': 'some-function-repo',
  'Git-SHA': 'abcdefghijklmnopqrstuvwxyz0123456789ABCD',
  app: `${user}-some-function`,
  faas_function: `${user}-some-function`,
  uid: '111111111',
};

describe('functionsApi', () => {
  describe('fetchFuncions', () => {
    it('parses the shortname of the function', async () => {
      // Arrange
      const functionResponse = {
        ...baseFunction,
        labels: { ...baseFunctionLabels },
      };
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: [functionResponse] })
      );

      // Act
      const response = await functionsApi.fetchFunctions(user);

      // Assert
      const [actual] = response;
      expect(actual.shortName).toEqual('some-function');
    });
  });
});
