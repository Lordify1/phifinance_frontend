import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { colorMap, likeProject } from '@/components/Tools/Misc';
import { useFetch } from '@/context/FetchContext';

interface StartupLikeProps {
    likes: number;
    project_id: number | string;
    user_id: number | string;
    guest: boolean;
    auth: boolean;
    slug: string;
}

const StartupLike: React.FC<StartupLikeProps> = ({
    likes,
    project_id,
    user_id,
    guest,
    slug,
}) => {
    const { store, fetchData } = useFetch();
    const [likeCount, setLikeCount] = useState<number>(likes);
    const guestId = typeof window !== 'undefined' ? localStorage.getItem('like_id') : null;

    const fetchLikes = async () => {
        try {
            const response = await fetch(`/project/get/${project_id}/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guestId }),
            });
            const res = await response.json();
            setLikeCount(res?.data?.project?.likes_count ?? likes);
        } catch (err) {
            console.error('Failed to fetch likes:', err);
        }
    };

    useEffect(() => {
        fetchLikes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project_id, slug]);

    const handleLike = async () => {
        try {
            await likeProject(project_id, user_id, guest);
            fetchLikes();
        } catch (err) {
            console.error('Failed to like project:', err);
        }
    };

    const hasLiked = store?.project?.has === true;

    return (
        <span>
            <FaHeart
                className={`inline cursor-pointer transition-colors ${
                    hasLiked ? colorMap.text_primary : 'hover:text-gray-500'
                }`}
                onClick={handleLike}
                aria-label="Like"
                role="button"
                tabIndex={0}
            />
            {' '}
            {store?.project?.likes_count ?? likeCount}
            {' '}
            Likes
        </span>
    );
};

export default StartupLike;