import React from 'react';

const Table = ({data}) => {

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Description</th>
            <th className="py-2 px-4 border-b border-gray-200">Publish Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? data.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="py-2 px-4 border-b border-gray-200">{item?.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item?.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item?.publishDate}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item?.price}</td>
            </tr>
          )) : <p>No data</p>}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
