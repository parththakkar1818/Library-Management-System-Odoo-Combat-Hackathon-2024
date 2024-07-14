import React from 'react';

const users = [
    {
      user_id: 'u1',
      name: 'John Doe',
      mobile_number: '123-456-7890',
      current_books: ['The Great Gatsby', '1984'],
      past_books: ['To Kill a Mockingbird', 'The Catcher in the Rye'],
    },
    {
      user_id: 'u2',
      name: 'Jane Smith',
      mobile_number: '987-654-3210',
      current_books: ['Pride and Prejudice'],
      past_books: ['Moby-Dick', 'War and Peace', 'The Odyssey'],
    },
    {
      user_id: 'u3',
      name: 'Alice Johnson',
      mobile_number: '555-123-4567',
      current_books: ['Ulysses', 'Hamlet'],
      past_books: ['The Iliad', 'Don Quixote'],
    },
    {
      user_id: 'u4',
      name: 'Robert Brown',
      mobile_number: '444-987-6543',
      current_books: ['Jane Eyre'],
      past_books: ['Wuthering Heights', 'Brave New World', 'Fahrenheit 451'],
    },
    {
      user_id: 'u5',
      name: 'Emily Davis',
      mobile_number: '333-654-7890',
      current_books: ['The Hobbit', 'The Lord of the Rings'],
      past_books: ['Harry Potter and the Sorcerer\'s Stone', 'The Lion, the Witch and the Wardrobe'],
    },
    {
      user_id: 'u6',
      name: 'Michael Wilson',
      mobile_number: '222-345-6789',
      current_books: ['The Catcher in the Rye', 'To Kill a Mockingbird'],
      past_books: ['1984', 'The Great Gatsby'],
    },
    {
      user_id: 'u7',
      name: 'Sophia Taylor',
      mobile_number: '111-987-6543',
      current_books: ['War and Peace', 'Moby-Dick'],
      past_books: ['Pride and Prejudice', 'Sense and Sensibility'],
    },
    {
      user_id: 'u8',
      name: 'Daniel Martinez',
      mobile_number: '666-123-4567',
      current_books: ['The Odyssey', 'The Iliad'],
      past_books: ['Ulysses', 'Hamlet'],
    },
    {
      user_id: 'u9',
      name: 'Olivia Anderson',
      mobile_number: '777-987-6543',
      current_books: ['The Great Gatsby', '1984'],
      past_books: ['To Kill a Mockingbird', 'The Catcher in the Rye'],
    },
    {
      user_id: 'u10',
      name: 'William Thompson',
      mobile_number: '888-654-7890',
      current_books: ['The Lord of the Rings', 'The Hobbit'],
      past_books: ['Harry Potter and the Sorcerer\'s Stone', 'The Lion, the Witch and the Wardrobe'],
    },
  ];

const Users = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-y-auto max-h-[400px] rounded-xl shadow-lg">
        <table className="min-w-full bg-white border">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Sr.No</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Past Books</th>
              <th className="px-4 py-2 border">Current Books</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.mobile_number}</td>
                <td className="px-4 py-2 border">
                  {user.past_books.join(', ')}
                </td>
                <td className="px-4 py-2 border">
                  {user.current_books.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
