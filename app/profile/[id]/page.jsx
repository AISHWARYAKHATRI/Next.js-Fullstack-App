"use client"

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const page = ({ params }) => {

    const searchParams = useSearchParams();
    const username = searchParams.get('name');

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setUserPosts(data);
        }
        if (params?.id) fetchPosts();
    }, [params.id])

    return (
        <Profile
            name={username}
            desc={`Welcome to ${username}'s personalized profile. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    )
}

export default page
