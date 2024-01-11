// BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivateInstance } from '../../api/apiConfig';

const BlogDetail = () => {
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const response = await axiosPrivateInstance.get(`blog/blog-posts/${id}`);
                setBlogPost(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du blog:', error);
            }
        };

        fetchBlogPost();
    }, [id]);

    if (!blogPost) return <div>Chargement...</div>;

    const sections = blogPost.content.split(/\d+\./).slice(1);

    return (
        <div>
            {sections.map((section, index) => (
                <div key={index}>
                    <h2>{`Section ${index + 1}`}</h2>
                    <p>{section.trim()}</p>
                </div>
            ))}
        </div>
    );
};


export default BlogDetail;
