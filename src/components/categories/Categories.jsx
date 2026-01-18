import React, { useState , useEffect} from 'react';
import axiosInstance from '../../api/axiosInstance';
 
export default function Categories() {
   
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
    try {
      const response = await axiosInstance.get('admin/Categories');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <div>
            
        </div>
    );
}