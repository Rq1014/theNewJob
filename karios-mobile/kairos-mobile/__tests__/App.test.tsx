import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/navigation/RootNavigator', () => {
  const { Text } = require('react-native');
  return { RootNavigator: () => <Text>Kairos</Text> };
});

import App from '../App';

test('renders without crashing', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
