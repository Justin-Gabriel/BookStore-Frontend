import { useEffect, useState } from "react";
import Table from "../components/Table"
import Popup from "../components/Popup";
import axios from 'axios';

const Home = () => {
    let debounceTimer; 

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/book/search?name=${searchTerm}`);
            
            if (response?.data?.data.length) {
                setData(response?.data?.data);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const debounceSearch = (value) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleSearch(value);
        }, 700); 
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        if (value.trim() === '') {
            getBooks(); 
        } else {
            debounceSearch(value); 
        }
    };

    const addBook = async ({ name,description, publishDate, price }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/book/create-book', { name,description, publishDate, price });
            if (response?.data?.data) {
                setData([response?.data?.data, ...data ]);
            }

        } catch (error) {
            console.log('err: ', error)
        }
    }
    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/book/get-books');
            if (response?.data?.data) {
                setData(response.data.data);
            } 
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(()=> {
        getBooks();
    }, [])



    return (
        <div className="flex flex-col items-center">
            <div className="m-10">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={query}
                    onChange={handleChange}
                    className="w-[600px] h-10 px-2 border rounded outline-none focus:border-blue-300 placeholder-gray-600"
                />
                <button
                    className="bg-blue-400 rounded h-10 w-20 text-white"
                    onClick={openPopup}
                >
                    Add Book
                </button>
            </div>
            <Table data={data}/>
            {
                isPopupOpen &&
                <Popup isOpen={isPopupOpen} onClose={closePopup} addBook={addBook} />
            }
        </div>
    )
}

export default Home