"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Users,
  Package,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useGetCustomersQuery } from "@/lib/reduxStore/customers/customersApi";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const {
    data: customers = [],
    isLoading,
    isError,
  } = useGetCustomersQuery();

  // Stats
  const totalCustomers = new Set(customers.map((c: any) => c.number)).size;
  const totalOrders = customers.length;
  const completedOrders = customers.filter((c: any) => c.status === "complete").length;
  const pendingOrders = customers.filter((c: any) => c.status === "pending").length;
  
  // Calculate percentages
  const completedPercentage = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(2) : "0.00";
  const pendingPercentage = totalOrders > 0 ? ((pendingOrders / totalOrders) * 100).toFixed(2) : "0.00";

  // Monthly Sales Chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [150, 380, 200, 280, 140, 180, 270],
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
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
    <div className="p-6 min-h-screen text-white grid gap-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Customers */}
        <StatCard
          title="Customers"
          value={totalCustomers}
          icon={<Users className="h-6 w-6 text-blue-400" />}
          change="+11.01%"
          positive
        />
        {/* Orders */}
        <StatCard
          title="Orders"
          value={totalOrders}
          icon={<Package className="h-6 w-6 text-blue-400" />}
          change="-9.05%"
          positive={false}
        />
        {/* Completed Orders */}
        <ProgressStatCard
          title="Completed"
          value={completedOrders}
          percentage={completedPercentage}
          icon={<CheckCircle2 className="h-6 w-6 text-green-400" />}
          strokeColor="#22c55e"
          change="+5.2%"
          positive
        />
        {/* Pending Orders */}
        <ProgressStatCard
          title="Pending"
          value={pendingOrders}
          percentage={pendingPercentage}
          icon={<Clock className="h-6 w-6 text-yellow-400" />}
          strokeColor="#facc15"
          change="-2.8%"
          positive={false}
        />
      </div>
      {/* Middle Section - Monthly Target */}
      <Card className="border border-green-400 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Target</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-around">
          {/* Circular Progress */}
          <div className="relative w-40 h-40 mb-6 md:mb-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#334155"
                strokeWidth="8"
              />
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
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">75.55%</span>
              <span className="flex items-center text-green-500 text-sm mt-1">
                <ArrowUpIcon className="h-4 w-4 mr-1" /> +10%
              </span>
            </div>
          </div>
          {/* Info */}
          <div className="text-center md:text-left space-y-4">
            <p className="text-gray-400">
              You earned <span className="text-white font-semibold">$3287</span>{" "}
              today. That’s higher than last month — keep up the great work!
            </p>
            <div className="flex justify-between text-sm md:text-base gap-8">
              <div>
                <p className="text-gray-400">Target</p>
                <p className="font-medium">$20K</p>
              </div>
              <div>
                <p className="text-gray-400">Revenue</p>
                <p className="text-green-500 font-medium">$15.1K</p>
              </div>
              <div>
                <p className="text-gray-400">Today</p>
                <p className="text-green-500 font-medium">$3.3K</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Bottom Section - Charts */}
      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Sales Bar Chart */}
        <Card className="border border-green-400 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* --- Reusable Stat Card --- */
function StatCard({
  title,
  value,
  icon,
  change,
  positive,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}) {
  return (
    <Card className="border border-green-400 shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p
          className={`flex items-center text-sm ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  );
}

/* --- Reusable Progress Stat Card --- */
function ProgressStatCard({
  title,
  value,
  percentage,
  icon,
  strokeColor,
  change,
  positive,
}: {
  title: string;
  value: number;
  percentage: string;
  icon: React.ReactNode;
  strokeColor: string;
  change: string;
  positive: boolean;
}) {
  return (
    <Card className="border border-green-400 shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * parseFloat(percentage)) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold">{percentage}%</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{value}</div>
          <p
            className={`flex items-center text-sm justify-end ${
              positive ? "text-green-500" : "text-red-500"
            }`}
          >
            {positive ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
