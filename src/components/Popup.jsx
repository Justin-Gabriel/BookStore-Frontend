import React from 'react';
import { useForm } from 'react-hook-form';

const Popup = ({ isOpen, onClose, addBook }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (values) => {
    try {
        addBook(values)
        reset(); 
        onClose(); 
    } catch (error) {
      console.error('Error submitting form:', error);

    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl mb-4">Add Book</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full mt-2 p-2 border rounded outline-none focus:border-blue-300 ${errors.name && 'border-red-500'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`w-full mt-2 p-2 border rounded outline-none focus:border-blue-300 ${errors.description && 'border-red-500'}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Publish Date</label>
            <input
              type="date"
              {...register('publishDate', { required: 'Publish Date is required' })}
              className={`w-full mt-2 p-2 border rounded outline-none focus:border-blue-300 ${errors.publishDate && 'border-red-500'}`}
            />
            {errors.publishDate && <p className="text-red-500 text-sm">{errors.publishDate.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required' })}
              className={`w-full mt-2 p-2 border rounded outline-none focus:border-blue-300 ${errors.price && 'border-red-500'}`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 rounded p-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
