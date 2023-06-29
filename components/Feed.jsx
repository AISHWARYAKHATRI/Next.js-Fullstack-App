"use client"
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />)
      }
    </div>
  )
}

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  // search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchPosts();
  })

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i') // case insensitive search
    console.log(allPosts[0])
    return allPosts.filter((post) => regex.test(post.creator.username) || regex.test(post.prompt) || regex.test(post.tag));
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(setTimeout(() => {
      const searchResults = filterPrompts(e.target.value);
      setSearchResults(searchResults);
    }))
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResults = filterPrompts(tagName);
    setSearchResults(searchResults);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>

        <input type="text"
          className='search_input peer'
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username..."
          required
        />
      </form>

      {/* All Prompts */}
      {
        searchText ? (
          <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed