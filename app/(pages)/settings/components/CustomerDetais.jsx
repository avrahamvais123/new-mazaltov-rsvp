"use client";

import React from "react";

const CustomerDetails = ({ customer }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Customer Details
      </h2>
      <ul className="space-y-4">
        <li className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-900">{customer?.name}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-900">{customer?.email}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-600">Password:</span>
          <span className="text-gray-900">{customer?.password}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-600">Subscription:</span>
          <span className="text-gray-900">{customer?.subscription}</span>
        </li>
      </ul>
    </div>
  );
};

export default CustomerDetails;
