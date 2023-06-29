"use client"

import Form from "@components/form"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react";

const page = () => {

    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    console.log(promptId);

    const router = useRouter();
    const { data: session } = useSession();
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
        if (promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (!promptId) return alert('Missing PrompId!');

                const response = await fetch(`api/prompt/${promptId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                });

                if (response.ok) {
                    router.push("/")
                }
            }
        catch (error) {
            console.log(error);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default page
