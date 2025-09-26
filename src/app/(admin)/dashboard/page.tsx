"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ArrowDownIcon, ArrowUpIcon, Users,  Package, LineChart } from "lucide-react";
import { useGetCustomersQuery } from "@/lib/reduxStore/customers/customersApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {

const {
    data: customers = [],
    isLoading,
    isError,
  } = useGetCustomersQuery();

  // Total customers = unique by number (or id)
  const totalCustomers = new Set(customers.map((c: any) => c.number)).size;

  // Total orders = all records (including soft deleted)
  const totalOrders = customers.length;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [150, 380, 200, 280, 140, 180, 270, 90, 200, 370, 250, 100],
        backgroundColor: "#3b82f6",
        borderRadius: 4,
      },
    ],
  };
const userTraffic = [
  { day: "Mon", users: 20 },
  { day: "Tue", users: 35 },
  { day: "Wed", users: 28 },
  { day: "Thu", users: 45 },
  { day: "Fri", users: 32 },
  { day: "Sat", users: 50 },
  { day: "Sun", users: 40 },
]
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { ticks: { color: "#9ca3af" }, grid: { color: "#1f2937" } },
      x: { ticks: { color: "#9ca3af" }, grid: { color: "#1f2937" } },
    },
  };

  return (
    <div className="p-6 min-h-screen text-white grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Customers */}
      <Card className="border border-green-400">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <Users className="h-5 w-5 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalCustomers}</div>
          <p className="flex items-center text-green-500 text-sm">
            <ArrowUpIcon className="h-4 w-4 mr-1" /> 11.01%
          </p>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card className=" border border-green-400">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <Package className="h-5 w-5 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalOrders}</div>
          <p className="flex items-center text-red-500 text-sm">
            <ArrowDownIcon className="h-4 w-4 mr-1" /> 9.05%
          </p>
        </CardContent>
      </Card>

      {/* Monthly Target - Fixed Responsive Layout */}
      <Card className=" border border-green-400 col-span-1 lg:row-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="3" r="1" />
              <circle cx="8" cy="8" r="1" />
              <circle cx="8" cy="13" r="1" />
            </svg>
          </button>
        </CardHeader>
        
        <CardContent className="flex flex-col lg:flex-col items-center justify-between h-full">
          {/* Progress Circle - Always on top in desktop, properly centered in mobile */}
          <div className="flex flex-col items-center justify-center mb-4 lg:mb-6">
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * 75.55) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl lg:text-3xl font-bold">75.55%</span>
                <span className="flex items-center text-green-500 text-xs lg:text-sm mt-1">
                  <ArrowUpIcon className="h-3 w-3 lg:h-4 lg:w-4 mr-1" /> +10%
                </span>
              </div>
            </div>
          </div>

          {/* Content Section - Properly spaced and responsive */}
          <div className="flex-1 flex flex-col justify-between w-full">
            {/* Description */}
            <p className="text-center text-sm text-gray-400 mb-4 lg:mb-6 px-2">
              You earn $3287 today, it's higher than last month. Keep up your good work!
            </p>

            {/* Stats */}
            <div className="flex justify-between text-sm px-2">
              <div className="text-center flex-1">
                <p className="text-gray-400 text-xs lg:text-sm">Target</p>
                <p className="text-white font-medium text-sm lg:text-base">$20K</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-gray-400 text-xs lg:text-sm">Revenue</p>
                <p className="text-green-500 font-medium text-sm lg:text-base">$15.1K</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-gray-400 text-xs lg:text-sm">Today</p>
                <p className="text-green-500 font-medium text-sm lg:text-base">$3.3K</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Sales */}
      <Card className="border border-green-400 col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
}