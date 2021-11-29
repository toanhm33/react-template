import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { wrapConfig } from 'utils/helper';
import HomePage from 'views/HomePage';
import AddEditPage from 'views/HomePage/components/AddEditPage';
import { HomeContextProvider } from 'views/HomePage/HomeContext';

afterEach(() => {
  cleanup();
});

describe('<AddEditPage/>', () => {
  test('should display correct error message Name field require', async () => {
    // const buttonSubmit = getByTestId('submit');
    // fireEvent.click(buttonSubmit);
    // const nameRequired = await findByText('Name is a required');
    // expect(nameRequired.innerHTML).toEqual('Name is a required');
  });

});
