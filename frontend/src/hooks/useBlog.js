import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

export const useBlog = () => useContext(BlogContext);
