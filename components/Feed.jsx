"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
	// console.log("thsi is af")
	// console.log(data[0]?.prompt);
	return (
		<div className="mt-16 prompt_layout">
			{data.map((p) => (
				<PromptCard post={p} key={p._id} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const router = useRouter();

	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [searched, setsearched] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchedResult = filterPrompts(e.target.value);
				setsearched(searchedResult);
			}, 500)
		);
	};

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, "i");
		return posts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const fetchPosts = async () => {
		const response = await fetch("api/prompt");
		const data = await response.json();
		setPosts(data);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);

		const searchedResult = filterPrompts(tag);
		setsearched(searchedResult);
	};

	const handleProfile = (id, username) => {
		router.push(`/profile?id=${id}&&username=${username}`);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<PromptCardList
				data={searchText ? searched : posts}
				handleTagClick={handleTagClick}
				handleProfile={handleProfile}
			/>
		</section>
	);
};

export default Feed;
