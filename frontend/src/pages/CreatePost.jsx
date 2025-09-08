import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold '>Create a post</h1>
            <form className='flex flex-col gap-4'>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-300 border-dotted p-3">
                    <FileInput type='file' accept='image/*' />
                    <Button type='button'  className='bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800' size='sm' outline >Upload Image</Button>
                </div>
                <ReactQuill theme='snow'placeholder='write something...' className='h-72 mb-12' required/>
                <Button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500
             to-pink-500 text-white' >
                    Publish
                </Button>
            </form>
        </div>
    )
}

export default CreatePost