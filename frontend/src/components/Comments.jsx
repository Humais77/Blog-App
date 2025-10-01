import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
const Comments = ({ comment, onLike,onEdit,onDelete }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUser();

    }, [comment]);
    const handleEdit = () => {
        setIsEditing(true);
        setEditContent(comment.content);
    }
    const handleSave = async () => {
        try {
            const res= await fetch(`/api/comment/EditComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: editContent }),
            });
            
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment,editContent);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className="flex-shrink-0 mr-3">
                <img src={user.profilePicture} alt={user.username} className='w-10 h-10 rounded-full bg-gray-200 ' />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className='font-bold mr-1 text-xs truncate '>{user ? `@${user.username}` : "anonymous user"}</span>
                    <span className='text-gray-500 text-xs '>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <>
                    <Textarea className='mb-2' value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                    <div className="flex justify-end gap-2 text-sm">
                        <Button type='button' size='sm' className='px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:opacity-90 transition' onClick={handleSave}>Save</Button>
                        <Button type='button' size='sm' outline className='px-5 py-2 rounded-lg font-semibold bg-white/20 text-white border border-white/40 backdrop-blur-lg hover:bg-white/30 transition' onClick={()=>setIsEditing(false)}>Cancel</Button>
                        
                    </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-600 max-w-fit gap-2">
                            <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}</p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                
                                  <button type='button' className='text-gray-500 hover:text-blue-500' onClick={handleEdit}>Edit</button>
                                 <button type='button' className='text-gray-500 hover:text-red-500' onClick={()=>onDelete(comment._id)}>Delete</button>
                                </>
                            )
                            }
                        </div>
                    </>
                )
                }

            </div>
        </div>
    )
}

export default Comments