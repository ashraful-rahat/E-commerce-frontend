import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react";

const metrics = [
  {
    label: "Revenue",
    value: "$124,830",
    delta: "+18.4%",
    description: "vs last 30 days",
    icon: ArrowUpRight,
  },
  {
    label: "Orders",
    value: "2,943",
    delta: "+6.2%",
    description: "Completed this month",
    icon: ShoppingCart,
  },
  {
    label: "Active Products",
    value: "184",
    delta: "+12",
    description: "New SKUs launched",
    icon: Package,
  },
  {
    label: "Customers",
    value: "18,492",
    delta: "+9.7%",
    description: "Returning customers",
    icon: Users,
  },
];

const recentOrders = [
  {
    id: "#SO-49721",
    customer: "Aria Stone",
    total: "$248.00",
    status: "Processing",
    date: "3 min ago",
  },
  {
    id: "#SO-49718",
    customer: "Leo Turner",
    total: "$612.40",
    status: "Shipped",
    date: "12 min ago",
  },
  {
    id: "#SO-49710",
    customer: "Mila Collins",
    total: "$1,120.99",
    status: "Completed",
    date: "35 min ago",
  },
  {
    id: "#SO-49690",
    customer: "Noah Benton",
    total: "$88.75",
    status: "Pending",
    date: "58 min ago",
  },
];

const topProducts = [
  {
    name: "Aurora Wireless Headset",
    sku: "SKU-9213",
    revenue: "$18,240",
    trend: "+22%",
  },
  {
    name: "Lumen Smart Lamp",
    sku: "SKU-8184",
    revenue: "$11,908",
    trend: "+14%",
  },
  {
    name: "Pulse Fitness Tracker",
    sku: "SKU-5541",
    revenue: "$9,421",
    trend: "+9%",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Welcome back! Here&apos;s your business overview.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
            Export Report
          </button>
          <button className="flex-1 sm:flex-none rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition">
            New Order
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ icon: Icon, label, value, delta, description }) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">
                  {label}
                </p>
                <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
                  {value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                {delta}
              </span>
              <span className="text-xs text-slate-600">{description}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Sales Overview */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Sales Overview
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Real-time performance metrics
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wide">
                Conversion Rate
              </p>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
                5.84%
              </p>
              <p className="mt-2 text-xs sm:text-sm text-emerald-600 font-medium">
                +0.9% vs last week
              </p>
              <div className="mt-4 h-12 rounded-lg bg-linear-to-r from-emerald-100 to-emerald-50" />
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-wide">
                Avg Order Value
              </p>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
                $112.63
              </p>
              <p className="mt-2 text-xs sm:text-sm text-emerald-600 font-medium">
                Peak at 8:00 PM
              </p>
              <div className="mt-4 flex h-12 items-end justify-between gap-1">
                {[46, 52, 63, 58, 72, 68, 80, 74].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-md bg-emerald-200 hover:bg-emerald-300 transition"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "High Intent",
                value: "386 checkouts",
                trend: "+11% vs yesterday",
              },
              {
                label: "Return Rate",
                value: "2.4%",
                trend: "Industry top 10%",
              },
              {
                label: "Fulfillment SLA",
                value: "98.6%",
                trend: "On-time within 24h",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg sm:text-xl font-bold text-slate-900">
                  {item.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-emerald-600 font-medium">
                  {item.trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
            <p className="mt-1 text-sm text-slate-600">Best performing items</p>
          </div>

          <div className="space-y-3">
            {topProducts.map(({ name, sku, revenue, trend }) => (
              <div
                key={sku}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 transition"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 truncate">
                    {sku}
                  </p>
                </div>
                <div className="ml-3 text-right">
                  <p className="text-sm font-bold text-slate-900 whitespace-nowrap">
                    {revenue}
                  </p>
                  <p className="mt-0.5 text-xs text-emerald-600 font-medium whitespace-nowrap">
                    {trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Recent Orders
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Latest customer transactions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {["Order ID", "Customer", "Total", "Status", "Date"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentOrders.map(({ id, customer, total, status, date }) => (
                <tr key={id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {id}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                    {customer}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                    {total}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : status === "Processing"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                    {date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
