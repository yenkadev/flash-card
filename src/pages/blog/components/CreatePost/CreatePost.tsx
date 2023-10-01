import { addPost, cancelEditingPost, finishEditingPost } from 'pages/blog/blog.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { Post } from 'types/blog.type'

interface ICreatePostProps {}

const initialState: Post = {
  id: '',
  title: '',
  published: false,
  description: '',
  publishDate: '',
  featureImage: ''
}

export default function CreatePost(props: ICreatePostProps) {
  const [formData, setFormData] = useState<Post>(initialState)

  const dispatch = useDispatch()

  const editingPost = useSelector((state: RootState) => state.blog.editingPost)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (editingPost) {
      dispatch(finishEditingPost(formData))
    } else {
      const formDataWithId = { ...formData, id: new Date().toISOString() }
      dispatch(addPost(formDataWithId))
    }

    setFormData(initialState)
  }

  const handleCancelEditingPost = () => {
    dispatch(cancelEditingPost())
  }

  useEffect(() => {
    setFormData(editingPost || initialState)
  }, [editingPost])

  return (
    <form className='w-full max-w-sm' onSubmit={handleSubmit} onReset={handleCancelEditingPost}>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <input
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
        />
      </div>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <input
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Description'
          required
          value={formData.description}
          onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
        />
      </div>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <input
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Image'
          required
          value={formData.featureImage}
          onChange={(event) => setFormData((prev) => ({ ...prev, featureImage: event.target.value }))}
        />
      </div>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <input
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Publish Date'
          required
          value={formData.publishDate}
          onChange={(event) => setFormData((prev) => ({ ...prev, publishDate: event.target.value }))}
        />
      </div>
      <div className='flex items-center border-b border-teal-500 py-2'>
        <input
          id='checked-checkbox'
          type='checkbox'
          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          checked={formData.published}
          onChange={(event) => setFormData((prev) => ({ ...prev, published: event.target.checked }))}
        />
        <div className='ml-2 text-sm'>
          <label htmlFor='helper-checkbox' className='font-medium text-gray-900 dark:text-gray-300'>
            Published
          </label>
        </div>
      </div>
      <div className='flex items-center py-2'>
        {editingPost && (
          <React.Fragment>
            <button
              type='submit'
              className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            >
              Update Post
            </button>
            <button
              type='reset'
              className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ml-2'
            >
              Cancel
            </button>
          </React.Fragment>
        )}
        {!editingPost && (
          <button
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            type='submit'
          >
            Publish Post
          </button>
        )}
      </div>
    </form>
  )
}
