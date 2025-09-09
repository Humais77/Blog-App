import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CreatePost = () => {
    const [file,setFile] = useState(null);
    const [imageUploadProgress,setImageUploadProgress] = useState(null);
    const [imageUploadingerror,setImageUploadingerror] = useState(null)
    const [formData,setFormData]= useState({});
    const handleUploadImagee = async()=>{
        try {
            if(!file){
                setImageUploadingerror('Please select an error');
                return;
            }
            setImageUploadingerror(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' +file.name;
            const storageRef = ref(storage,fileName);
            const UploadTask = uploadBytesResumable(storageRef,file);
            UploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadingerror(error);
                    setImageUploadProgress(null);
                },
                ()=>{
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadProgress(null)
                        setImageUploadingerror(null);
                        setFormData({...formData,image:downloadURL});
                    });
                }
            
            );
        } catch (error) {
            setImageUploadingerror('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
            
        }
    }
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
                    <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
                    <Button type='button'  className='bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800' size='sm' outline  onClick={handleUploadImagee} disabled={imageUploadProgress}>
                        {imageUploadProgress?(
                            <div className='w-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                            </div>
                        ):'Upload Image'
                        }
                    </Button>
                </div>
                {imageUploadingerror && (
                    <Alert color='failure'>
                        {imageUploadingerror}
                    </Alert>
                )}
                {formData.image && (
                    <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
                )}
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