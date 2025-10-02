import { Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm") || "";
    const sortFromURL = urlParams.get("sort") || "desc";
    const categoryFromURL = urlParams.get("category") || "uncategorized";

    setSidebarData({
      searchTerm: searchTermFromURL,
      sort: sortFromURL,
      category: categoryFromURL,
    });

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };
  const handleShowMore = async()=>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if(!res.ok) return;
    if(res.ok){
        const data = await res.json();
        setPosts((prev)=>[...prev, ...data.posts]);
        if(data.posts.length<9){
            setShowMore(false);
        }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className="p-6 md:min-h-screen w-full md:w-72 
          bg-gradient-to-b from-indigo-50 to-white 
          dark:from-gray-900 dark:to-gray-800
          shadow-lg rounded-lg md:rounded-none border-r border-gray-200 dark:border-gray-700"
      >
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Search Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Search Posts
            </label>
            <TextInput
              id="searchTerm"
              type="text"
              placeholder="Type to search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="rounded-xl border-gray-300 shadow-sm 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sort By
            </label>
            <Select
              id="sort"
              value={sidebarData.sort}
              onChange={handleChange}
              className="rounded-xl border-gray-300 shadow-sm 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Categories
            </label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
              className="rounded-xl border-gray-300 shadow-sm 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>

          {/* Apply Button */}
          <Button
            type="submit"
            color="indigo"
            className="w-full mt-4 py-2.5 px-4 text-center 
              font-semibold rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300"
          >
            Apply Filters
          </Button>
        </form>
      </aside>

      {/* Posts Results */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3">
          Posts Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="flex justify-center items-center min-h-screen w-full">
              <Spinner size="xl" />
            </div>
          )}
          {
            !loading && posts && posts.map((post)=>(
                <PostCard key={post._id} post={post}/>
            ))
          }
          {
            showMore && <button className="text-teal-500 text-lg hover:underline p-7 w-full" onClick={handleShowMore}>
                Show More
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Search;
