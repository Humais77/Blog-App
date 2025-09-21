import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center mb-4">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='textgray-600 my-2'>
                Checkout these awesome resources to get started with JavaScript and enhance your web development skills.
            </p>
            <Button  className="rounded-tl-xl rounded-bl-none bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
                <a href="https://www.100jsprojects.com" target='blank' rel='noopener noreferrer'>100 JavaScript Projects</a>
            </Button>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"  />
            </div>
        </div>
    </div>
  )
}

export default CallToAction