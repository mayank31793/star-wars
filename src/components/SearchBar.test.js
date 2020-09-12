import React from 'react';

import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './SearchBar';


configure({adapter: new Adapter()});

describe('<SearchBar />',() => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SearchBar />);
    });

    it('should render <SearchBar /> component',() => {
        wrapper.setProps({search:""});
    });
})