import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from '..';


const currentPhoto = {
  name: 'Park bench',
  category: 'landscape',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie',
  index: 1
};

const mockToggleModal = jest.fn();


afterEach(cleanup);

describe('Modal component', () => {
  it('renders', () => {
    render(<Modal currentPhoto={currentPhoto} onClose={mockToggleModal}
    />);
  })

  it('matches snapshot DOM node structure', () => {
    const { asFragment } = render(<Modal currentPhoto={currentPhoto} onClose={mockToggleModal} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('contains a submit button', () => {
    const { getByRole } = render(<Modal currentPhoto={currentPhoto} onClose={mockToggleModal} />);

    expect(getByRole('button', {type: /button/i})).toHaveTextContent('Close this modal');  
  });
});

describe('Click Event', () => {
  it('calls onClose handler', () => {
    const { getByText } = render(<Modal
      onClose={mockToggleModal}
      currentPhoto={currentPhoto}
    />);
    fireEvent.click(getByText('Close this modal'));

    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });
})  