import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';

import { renderWithRedux, initialState } from '../Helpers/testUtils';
import SearchUser from '../Components/Search/SearchUser';

afterEach(cleanup);

describe('Test SearchUser component', () => {

    it('Should render SearchUser correctly', () => {
        const { getByTestId } = renderWithRedux(<SearchUser />);
    
        const searchInput = getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'somebody' } });
        expect(searchInput.value).toBe('somebody');

        fireEvent.keyDown(searchInput, { key: "Enter", code: 13, keyCode: 13, charCode: 13 });
        
        expect(searchInput.value).toBe('somebody');

    });

    it('Should render users suggestions', () => {
        const { getByTestId, container } = renderWithRedux(<SearchUser />, {initialState: initialState});
    
        const usersList = container.querySelectorAll('#userDiv')

        expect(usersList.length).toBe(7);

        const searchInput = getByTestId('search-input');

        fireEvent.keyDown(searchInput, { key: "Arrow", code: 40, keyCode: 40, charCode: 40 });
        fireEvent.keyDown(document.activeElement, { key: "Arrow", code: 40, keyCode: 40, charCode: 40 });        
        fireEvent.keyDown(document.activeElement, { key: "Arrow", code: 40, keyCode: 40, charCode: 40 });

        expect(document.activeElement).toEqual(usersList[2])
    });    
});
