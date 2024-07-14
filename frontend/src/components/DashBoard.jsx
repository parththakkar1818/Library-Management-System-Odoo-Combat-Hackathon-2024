import React from "react";
import Counter from "./Counter"; // Replace with your actual path
import { BarChart } from "@mui/x-charts/BarChart";

const DashBoard = () => {
  const data = {
    totalVisitors: 12345,
    totalBorrowers: 2345,
    usersPerDay: 123,
    totalFineCollected: 4567,
  };
  const data1 = {
    visitors: [
      { day: "Monday", count: 100 },
      { day: "Tuesday", count: 150 },
      { day: "Wednesday", count: 120 },
      { day: "Thursday", count: 180 },
      { day: "Friday", count: 200 },
      { day: "Saturday", count: 170 },
      { day: "Sunday", count: 160 },
    ],
    borrowers: [
      { day: "Monday", count: 20 },
      { day: "Tuesday", count: 25 },
      { day: "Wednesday", count: 30 },
      { day: "Thursday", count: 35 },
      { day: "Friday", count: 40 },
      { day: "Saturday", count: 30 },
      { day: "Sunday", count: 28 },
    ],
  };

  const booksVsCategoryData = [
    { category: "Fiction", count: 50 },
    { category: "Fantasy", count: 25 },
    { category: "Mystery", count: 40 },
    { category: "Romance", count: 35 },
    { category: "Horror", count: 20 },
    { category: "Science", count: 15 },
    { category: "Thriller", count: 10 },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Counter
          number={data.totalVisitors}
          title="Total Visitors Count"
          className="bg-gray-100 p-4 rounded shadow-lg"
        />
        <Counter
          number={data.totalBorrowers}
          title="Total Borrowers"
          className="bg-gray-100 p-4 rounded shadow-lg"
        />
        <Counter
          number={data.usersPerDay}
          title="Users Per Day"
          className="bg-gray-100 p-4 rounded shadow-lg"
        />
        <Counter
          number={data.totalFineCollected}
          title="Total Fine Collected (INR)"
          className="bg-gray-100 p-4 rounded shadow-lg"
        />
      </div>
      <div className="flex justify-center mt-8">
        <p className="font-bold"> Visitors & Borrowers</p>
        <BarChart
          title="Visitors vs Borrowers"
          xAxis={[
            { scaleType: "band", data: data1.visitors.map((item) => item.day) },
          ]}
          series={[
            {
              data: data1.visitors.map((item) => item.count),
              name: "Visitors",
            },
            {
              data: data1.borrowers.map((item) => item.count),
              name: "Borrowers",
            },
          ]}
          legends={[
            { data: "Visitors", color: "#1976d2" },
            { data: "Borrowers", color: "#f44336" },
          ]}
          width={600}
          height={400}
          className="shadow-lg rounded-lg bg-white p-4 mb-8"
        />
      </div>
      <div className="flex justify-center">
        <p className="font-bold">Category & Number of Books</p>
        <BarChart
          title="Books vs Category"
          xAxis={[
            {
              scaleType: "band",
              data: booksVsCategoryData.map((item) => item.category),
            },
          ]}
          series={[
            {
              data: booksVsCategoryData.map((item) => item.count),
              name: "Books",
            },
          ]}
          legends={[{ data: "Books", color: "#4caf50" }]}
          width={600}
          height={400}
          className="shadow-lg rounded-lg bg-white p-4"
        />
      </div>
    </div>
  );
};

export default DashBoard;
