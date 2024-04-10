
import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://testurl.com',
      likes: 5,
    };

    component = render(
      <Blog blog={blog} />
    );
  });

  test('renders title and author, but does not render URL or likes by default', () => {
    const basicInfo = component.container.querySelector('.basic-info');
    expect(basicInfo).toHaveTextContent('Test Blog Title');
    expect(basicInfo).toHaveTextContent('Test Author');

    const detailedInfo = component.container.querySelector('.detailed-info');
    expect(detailedInfo).toBeNull(); // Detailed info (URL and likes) should not be in the document by default
  });
});
