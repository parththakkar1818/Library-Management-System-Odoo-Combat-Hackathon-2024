import React from 'react';

const booksData = [
  { number: 1, name: "Book One", fine: 50 },
  { number: 2, name: "Book Two", fine: 70 },
  { number: 3, name: "Book Three", fine: 60 },
  { number: 4, name: "Book Four", fine: 80 },
  { number: 5, name: "Book Five", fine: 55 },
];

const Fine = () => {
  return (
    <div className="mt-10 rounded-xl overflow-hidden shadow-lg">
      <h2 className="text-xl font-bold mb-4 px-6 py-3 bg-gray-100">Book Fines</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fine (INR)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {booksData.map((book, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.number}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.fine}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fine;
