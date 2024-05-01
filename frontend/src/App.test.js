// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles click event', () => {
    const wrapper = shallow(<App />);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('count')).toBe(1);
  });
});
