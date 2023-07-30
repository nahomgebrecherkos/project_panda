"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	const id = useSearchParams().get("id");

	const username = useSearchParams().get("username");
	const fetchPosts = async () => {
		const response = await fetch(`api/users/${id}/posts`);
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, [id]);
	session;

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasComfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasComfirmed) {
			try {
				await fetch(`api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});
				const filteredPost = posts.filter((p) => post._id !== p._id);
				setPosts(filteredPost);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name={session?.user.id === id ? "My" : username}
			desc="Welcome to your personalized profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
