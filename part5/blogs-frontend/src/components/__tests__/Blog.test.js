/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

const blog = {
  title: 'title',
  author: 'author',
  url: '/',
  likes: 0,
  user: {
    username: 'username'
  }
}

describe("tests the Blog component", () => {
  test("renders the blog's title and author", async () => {
    render(<Blog blog={blog} />)

    expect(screen.queryByTestId('title').textContent).toContain('title')
    expect(screen.queryByTestId('author').textContent).toContain('author')
    expect(screen.queryByTestId('url')).toBeNull()
    expect(screen.queryByTestId('likes')).toBeNull()
  })

  test("renders the blog's url and likes on clicking view", async () => {
    render(<Blog user={{username: 'username'}} blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByTestId('url').textContent).toContain('/')
    expect(screen.queryByTestId('likes').textContent).toContain('0')
  })
})