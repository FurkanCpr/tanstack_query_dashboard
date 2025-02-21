import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostsContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    updatePost: (post: Post) => void;
    deletePost: (id: number) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};

interface PostsProviderProps {
    children: ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (post: Post) => {
        setPosts(prev => [...prev, post]);
    };

    const updatePost = (updatedPost: Post) => {
        setPosts(prev =>
            prev.map(post => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

    const deletePost = (id: number) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    return (
        <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
            {children}
        </PostsContext.Provider>
    );
};