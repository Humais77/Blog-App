import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { Link } from 'react-router-dom';

const DashBoardComp = () => {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5')
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error);
            }

        }
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5')
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error);
            }

        }
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])

    return (
        <div className="p-3 md:mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col gap-4 p-4 w-full sm:w-60 md:w-72 lg:w-80 rounded-xl shadow-md transition  bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm sm:text-md uppercase">
                                Total Users
                            </h3>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {totalUsers}
                            </p>
                        </div>
                        <HiOutlineUserGroup
                            className="bg-teal-600 text-white rounded-full text-4xl sm:text-5xl p-2 sm:p-3 shadow-lg"
                        />
                    </div>
                    <div className="flex gap-2 items-center text-xs sm:text-sm">
                        <span className="text-teal-600 dark:text-teal-400 flex items-center font-medium">
                            <HiArrowNarrowUp className="mr-1" />
                            {lastMonthUsers}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">Last month</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-4 w-full sm:w-60 md:w-72 lg:w-80 rounded-xl shadow-md transition  bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm sm:text-md uppercase">
                                Total Comments
                            </h3>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {totalComments}
                            </p>
                        </div>
                        <HiAnnotation
                            className="bg-indigo-600 text-white rounded-full text-4xl sm:text-5xl p-2 sm:p-3 shadow-lg"
                        />
                    </div>
                    <div className="flex gap-2 items-center text-xs sm:text-sm">
                        <span className="text-teal-600 dark:text-teal-400 flex items-center font-medium">
                           {lastMonthComments > 0 ? (
                                <span className="flex items-center text-teal-600 dark:text-teal-400 font-medium">
                                    <HiArrowNarrowUp className="mr-1" />
                                    {lastMonthComments}
                                </span>
                            ) : (
                                <span className="text-gray-500 dark:text-gray-400">No comments</span>
                            )}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">Last month</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-4 w-full sm:w-60 md:w-72 lg:w-80 rounded-xl shadow-md transition  bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm sm:text-md uppercase">
                                Total Posts
                            </h3>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {totalPosts}
                            </p>
                        </div>
                        <HiDocumentText
                            className="bg-lime-600 text-white rounded-full text-4xl sm:text-5xl p-2 sm:p-3 shadow-lg"
                        />
                    </div>
                    <div className="flex gap-2 items-center text-xs sm:text-sm">
                        <span className="text-teal-600 dark:text-teal-400 flex items-center font-medium">
                            <HiArrowNarrowUp className="mr-1" />
                            {lastMonthPosts}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">Last month</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
                <div className="mt-6">
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className='text-center p-2'>Recent Users</h1>
                            <Button outline className='px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all'>
                                <Link to={'/dashboard?tab=users'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>User image</TableHeadCell>
                                    <TableHeadCell>Username</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {users && users.map((user) => (
                                    <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <TableCell>
                                            <img
                                                src={user.profilePicture}
                                                alt="user"
                                                className="w-10 h-10 rounded-full bg-gray-500 object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {user.username}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className='text-center p-2'>Recent Comments</h1>
                            <Button outline className='px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all'>
                                <Link to={'/dashboard?tab=comments'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Comment content</TableHeadCell>
                                    <TableHeadCell>likes</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {comments && comments.map((comment) => (
                                    <TableRow key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <TableCell className='w-96'>
                                            <p className='line-clamp-2'>{comment.content}</p>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {comment.numberOfLikes}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className='text-center p-2'>Recent Posts</h1>
                            <Button outline className='px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all'>
                                <Link to={'/dashboard?tab=posts'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Post image</TableHeadCell>
                                    <TableHeadCell>Post Title</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {posts && posts.map((post) => (
                                    <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <TableCell>
                                            <img
                                                src={post.image}
                                                alt="user"
                                                className="w-14 h-10 rounded-md bg-gray-500 object-cover"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {post.title}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {post.category}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoardComp;