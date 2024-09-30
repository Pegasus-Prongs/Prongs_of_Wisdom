'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//component
import VoteButton from '@/components/VoteButton';

interface IVote {

}

const VoteComment: React.FC = ({ blog_id }: { blog_id: string }) => {
    const [votes, setVotes] = useState([]);
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        const fetchVotes = async () => {
            const response = await axios.get(`http://localhost:3000/api/blog/${blog_id}/vote`);
            
        }

        fetchVotes();
    }, [])

    return (
        <div >
            <VoteButton voteType="Upvote" onVote={() => console.log('upvote')} isSelected={false} />
            <VoteButton voteType="Downvote" onVote={() => console.log('downvote')} isSelected={false} />
            <p>Your comment goes here...</p>
            <p>Blog ID: {blog_id}</p>
            <hr />
        </div>
    )
}