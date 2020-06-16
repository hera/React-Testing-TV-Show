import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockFetchShow from './api/fetchShow';
import { mockData } from './api/mockData';
import App from './App';

jest.mock('./api/fetchShow');

test('test app', async () => {
    mockFetchShow.mockResolvedValueOnce(mockData);


    // check episodes in mockData

    expect(mockData).toHaveProperty('data');
    expect(mockData.data).toHaveProperty('_embedded');
    expect(mockData.data._embedded.episodes).toHaveLength(26);

    // render the component
    const { getByText, queryAllByTestId } = render(<App />);

    // wait for the select button to appear
    await waitFor(() => {
        expect(getByText(/select a season/i));
    });

    userEvent.click(
        getByText(/select a season/i)
    );

    // choose season
    userEvent.click(
        getByText(/season 1/i)
    );

    // check if all 8 episodes are present
    await waitFor(() => {
        const episodes = queryAllByTestId('episode');
        expect(episodes).toHaveLength(8);
    });
});