import React, { useState } from 'react';
import "tailwindcss";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, Target, DollarSign, ShoppingCart, AlertCircle } from 'lucide-react';

const MonthlyReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const octoberProjections = [
    { platform: 'Meta', spends: 489800.00, orders: 685, revenue: 1165202, roas: 2.38 },
    { platform: 'Google', spends: 31000.00, orders: 41, revenue: 64931, roas: 2.09 }
  ];

  const octoberTotal = {
    spends: 520800,
    orders: 726,
    revenue: 1230133,
    roas: 2.36
  };

  const actualData = [
    { platform: 'Meta', spends: 456937.35, orders: 671, revenue: 941633.94, roas: 2.06 },
    { platform: 'Google', spends: 5951.88, orders: 1, revenue: 1450, roas: 0.24 }
  ];

  const projectedData = [
    { platform: 'Meta', spends: 489800.00, orders: 685, revenue: 1165202, roas: 2.38 },
    { platform: 'Google', spends: 31000.00, orders: 41, revenue: 64931, roas: 2.09 }
  ];

  const totalActual = {
    spends: 462889,
    orders: 672,
    revenue: 943083.94,
    roas: 2.04
  };

  const totalProjected = {
    spends: 520800,
    orders: 726,
    revenue: 1230133,
    roas: 2.36
  };

  const comparisonData = [
    { metric: 'Spends', actual: 462889, projected: 520800 },
    { metric: 'Orders', actual: 672, projected: 726 },
    { metric: 'Revenue', actual: 943083.94, projected: 1230133 }
  ];

  const platformBreakdown = [
    { name: 'Meta', value: 456937.35, percentage: 98.7 },
    { name: 'Google', value: 5951.88, percentage: 1.3 }
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  const MetricCard = ({ title, actual, projected, prefix = '', suffix = '', icon: Icon }) => {
    const variance = ((actual - projected) / projected * 100).toFixed(1);
    const isPositive = actual >= projected;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {Icon && <Icon className="w-5 h-5 text-gray-400" />}
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {prefix}{actual.toLocaleString()}{suffix}
            </div>
            <div className="text-xs text-gray-500">Actual</div>
          </div>
          <div>
            <div className="text-lg text-gray-600">
              {prefix}{projected.toLocaleString()}{suffix}
            </div>
            <div className="text-xs text-gray-500">Projected</div>
          </div>
          <div className={`flex items-center text-sm font-medium ${
            title === 'Total Spend' 
              ? (isPositive ? 'text-green-600' : 'text-red-600')
              : (isPositive ? 'text-green-600' : 'text-red-600')
          }`}>
            {title === 'Total Spend' ? (
              <>
                {!isPositive ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                {Math.abs(variance)}% {!isPositive ? 'under budget' : 'over budget'}
              </>
            ) : (
              <>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(variance)}% {isPositive ? 'above' : 'below'} target
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BCM Monthly Report for - Shop Fusio</h1>
          <p className="text-gray-600">Reporting Period: September 1 - September 30, 2025</p>
        </div>

        {/* Executive Summary Alert */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <TrendingDown className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Budget Performance</h3>
              <p className="text-sm text-green-800">
                Spent 19% less than projected spends (₹462,889 vs ₹520,800), avoiding unnecessary burns. 
                Revenue variance due to higher projected ROAS from partial account access in initial projections.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
<div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
  <div
    className="
      flex 
      border-b border-gray-200 
      overflow-x-auto             /* enable horizontal scroll */
      whitespace-nowrap           /* prevent wrapping */
      scrollbar-hide              /* optional: hide scrollbar */
      sm:overflow-visible         /* normal layout on bigger screens */
    "
  >
    {['overview', 'platforms', 'insights', 'october-plan'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`
          px-6 py-3 font-medium capitalize flex-shrink-0 
          ${
            activeTab === tab
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        {tab === 'october-plan' ? 'October Plan' : tab}
      </button>
    ))}
  </div>
</div>


        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Spend"
                actual={totalActual.spends}
                projected={totalProjected.spends}
                prefix="₹"
                icon={DollarSign}
              />
              <MetricCard
                title="Total Orders"
                actual={totalActual.orders}
                projected={totalProjected.orders}
                icon={ShoppingCart}
              />
              <MetricCard
                title="Total Revenue"
                actual={totalActual.revenue}
                projected={totalProjected.revenue}
                prefix="₹"
                icon={TrendingUp}
              />
              <MetricCard
                title="Average ROAS"
                actual={totalActual.roas}
                projected={totalProjected.roas}
                suffix="x"
                icon={Target}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Actual vs Projected */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Spend & Revenue: Actual vs Projected</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Spend', actual: 462889, projected: 520800 },
                    { metric: 'Revenue', actual: 943083.94, projected: 1230133 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="actual" fill="#6366f1" name="Actual" />
                    <Bar dataKey="projected" fill="#cbd5e1" name="Projected" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Actual vs Projected */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Orders: Actual vs Projected</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Orders', actual: 672, projected: 726 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis domain={[0, 800]} />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar dataKey="actual" fill="#6366f1" name="Actual" />
                    <Bar dataKey="projected" fill="#cbd5e1" name="Projected" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Spend Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Spend Distribution by Platform</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Platforms Tab */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            {/* Meta Performance */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Meta Ads Performance</h3>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  Primary Platform
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Spend</div>
                  <div className="text-xl font-bold text-gray-900">₹456,937</div>
                  <div className="text-xs text-indigo-600">98.7% of total spend</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Orders</div>
                  <div className="text-xl font-bold text-gray-900">671</div>
                  <div className="text-xs text-indigo-600">99.9% of total orders</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Revenue</div>
                  <div className="text-xl font-bold text-gray-900">₹941,634</div>
                  <div className="text-xs text-indigo-600">99.8% of total revenue</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">ROAS</div>
                  <div className="text-xl font-bold text-gray-900">2.06x</div>
                  <div className="text-xs text-gray-600">Return on ad spend</div>
                </div>
              </div>
            </div>

            {/* Google Performance */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Google Ads Performance</h3>
                <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                  Testing Phase
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Spend</div>
                  <div className="text-xl font-bold text-gray-900">₹5,952</div>
                  <div className="text-xs text-amber-600">1.3% of total spend</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Orders</div>
                  <div className="text-xl font-bold text-gray-900">1</div>
                  <div className="text-xs text-amber-600">0.1% of total orders</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Revenue</div>
                  <div className="text-xl font-bold text-gray-900">₹1,450</div>
                  <div className="text-xs text-amber-600">0.2% of total revenue</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">ROAS</div>
                  <div className="text-xl font-bold text-gray-900">0.24x</div>
                  <div className="text-xs text-gray-600">Return on ad spend</div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  Limited testing with only 2 campaigns (standard shopping and Performance Max). 
                  Received 1 purchase from Performance Max campaign.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Meta Insights */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Meta: Key Insights & Takeaways</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✓ Catalogue Ads Success</h4>
                  <p className="text-gray-700">Catalogue ads delivered results consistently with no creative exceptions. Morpankh earrings emerged as the winner product.</p>
                </div>

                {/* Top Performing Products */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">📊 Top Performing Products - September</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Embossed Floral Earrings</span>
                        <span className="text-sm font-bold text-gray-900">₹34,782.39</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Gulnaar Earrings</span>
                        <span className="text-sm font-bold text-gray-900">₹34,181.31</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '98.3%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Zirconia Pearl Drop Earrings</span>
                        <span className="text-sm font-bold text-gray-900">₹30,216.57</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '86.9%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Black Flower & Enamel Earrings</span>
                        <span className="text-sm font-bold text-gray-900">₹30,097.39</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '86.5%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Suryakamal Earrings</span>
                        <span className="text-sm font-bold text-gray-900">₹27,972.74</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '80.4%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">Total Revenue (Top 5)</span>
                      <span className="text-lg font-bold text-blue-600">₹157,250.40</span>
                    </div>
                  </div>
                </div>

                {/* Top Performing Locations */}
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">📍 Top Performing Locations - September</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-purple-600 rounded-full mr-3"></span>
                          <span className="text-sm font-medium text-gray-700">Mumbai</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">10.12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">51 orders</div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                          <span className="text-sm font-medium text-gray-700">Bengaluru</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">8.73%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{width: '86.3%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">44 orders</div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-pink-600 rounded-full mr-3"></span>
                          <span className="text-sm font-medium text-gray-700">Kolkata</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">6.75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-pink-500 h-3 rounded-full" style={{width: '66.7%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">34 orders</div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-cyan-600 rounded-full mr-3"></span>
                          <span className="text-sm font-medium text-gray-700">Gurgaon</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">5.36%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-cyan-500 h-3 rounded-full" style={{width: '52.9%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">27 orders</div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-indigo-600 rounded-full mr-3"></span>
                          <span className="text-sm font-medium text-gray-700">Hyderabad</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">3.17%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-indigo-500 h-3 rounded-full" style={{width: '31.4%'}}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">16 orders</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">Total Orders (Top 5 Cities)</span>
                      <span className="text-lg font-bold text-purple-600">172 orders (34.13%)</span>
                    </div>
                  </div>
                </div>

                {/* Winner Ad Showcase */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-green-900 text-lg">🏆 Winner Ad - Morpankh Earrings</h4>
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      TOP PERFORMER
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ad Preview */}
                    <div className="bg-white rounded-lg p-4 shadow-md">
                      <div className="mb-3">
                        <img 
                          src="/creative1.png" 
                          alt="Morpankh Earrings Ad"
                          className="w-full h-auto rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div style={{display: 'none'}} className="bg-gray-100 p-8 rounded-lg text-center">
                          <div className="text-6xl mb-2">💍</div>
                          <p className="text-sm text-gray-600 font-medium">Morpankh Earrings</p>
                          <p className="text-xs text-gray-500 mt-2">22K Gold Plated | Tarnish Free</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold mb-1">Ad Copy:</p>
                        <p className="text-xs italic">"Sophistication that never goes unnoticed. With Morpankh design, gold plating, and striking green stones, this piece defines timeless elegance."</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xs text-gray-600 mb-1">Performance Highlights</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">ROAS</span>
                          <span className="text-2xl font-bold text-green-600">2.5+</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Consistent performance in September</div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-xs text-gray-600 mb-1">CTR</div>
                          <div className="text-lg font-bold text-gray-900">6.88%</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-xs text-gray-600 mb-1">CPC</div>
                          <div className="text-lg font-bold text-gray-900">₹7.5</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
                          <div className="text-xs text-gray-600 mb-1">CPM</div>
                          <div className="text-lg font-bold text-gray-900">₹520</div>
                        </div>
                      </div>

                      <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                        <p className="text-xs text-green-800 font-medium">
                          ✨ This ad delivered exceptional engagement with a CTR nearly 3x industry average, resulting in highly efficient cost per click and consistent revenue generation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Audience Testing & Optimization</h4>
                  <p className="text-gray-700 mb-2">Tested multiple audience types including direct and indirect jewellery audiences, retargeting, and lookalike audiences. Key findings:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Consolidated budgets into 4 performing audiences</li>
                    <li>Scaled: Broad women targeting, Lookalike 1-2% of purchasers, business professional interest-based audience</li>
                    <li>Retargeting maintained with different catalogue sets for high AOV products</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Budget Optimization</h4>
                  <p className="text-gray-700">Paused underperforming audiences and redistributed budgets to maximize revenue across campaigns. Revenue-focused approach improved overall efficiency.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">⏸️ Paused Campaigns</h4>
                  <p className="text-gray-700 mb-2">Strategic pauses to control spend:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Zodiac Necklaces campaign (underperformed after optimization)</li>
                    <li>Instagram traffic campaign (reduced budget for website traffic)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Google Insights */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Google: Key Insights & Takeaways</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔬 Minimal Testing Phase</h4>
                  <p className="text-gray-700">Launched 2 campaigns with conservative budget allocation to test platform viability:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Standard Shopping campaign</li>
                    <li>Performance Max campaign (generated 1 purchase)</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📉 Performance Assessment</h4>
                  <p className="text-gray-700">With only 1 conversion and ROAS of 0.24x, Google requires more data and optimization before scaling investment.</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-md p-6 border border-indigo-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Recommendations for October</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-indigo-900 mb-2">Meta Strategy</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Continue focusing on proven catalogue ads</li>
                    <li>• Scale winning audiences gradually</li>
                    <li>• Test new high AOV product sets</li>
                    <li>• Monitor retargeting performance closely</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-indigo-900 mb-2">Google Strategy</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Launch Performance Max with competitor add-to-cart audiences</li>
                    <li>• Expand interest-based Shopping campaigns</li>
                    <li>• Optimize product feed for better visibility</li>
                    <li>• Set clearer conversion tracking goals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* October Plan Tab */}
        {activeTab === 'october-plan' && (
          <div className="space-y-6">
            {/* October Overview */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-md p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">October 2025 Projections</h2>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                  Next Month
                </span>
              </div>
              <p className="text-gray-700">Strategic projections based on September learnings and optimization opportunities</p>
            </div>

            {/* October Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Projected Spend</h3>
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹520,800</div>
                <div className="mt-2 flex items-center text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs Sept actual
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Projected Orders</h3>
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">726</div>
                <div className="mt-2 flex items-center text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.0% vs Sept actual
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Projected Revenue</h3>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">₹1,230,133</div>
                <div className="mt-2 flex items-center text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +30.4% vs Sept actual
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Target ROAS</h3>
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2.36x</div>
                <div className="mt-2 flex items-center text-sm text-purple-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15.7% vs Sept actual
                </div>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Meta October Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Meta Ads - October Plan</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                    94% of Budget
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Projected Spend</div>
                    <div className="text-lg font-bold text-gray-900">₹489,800</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target Orders</div>
                    <div className="text-lg font-bold text-gray-900">685</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target Revenue</div>
                    <div className="text-lg font-bold text-gray-900">₹1,165,202</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target ROAS</div>
                    <div className="text-lg font-bold text-gray-900">2.38x</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Key Strategies:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Scale winning catalogue ads and morpankh earrings</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Focus budget on 4 performing audiences</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Maintain retargeting with high AOV product sets</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Test new creative variations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google October Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Google Ads - October Plan</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    6% of Budget
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Projected Spend</div>
                    <div className="text-lg font-bold text-gray-900">₹31,000</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target Orders</div>
                    <div className="text-lg font-bold text-gray-900">41</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target Revenue</div>
                    <div className="text-lg font-bold text-gray-900">₹64,931</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Target ROAS</div>
                    <div className="text-lg font-bold text-gray-900">2.09x</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Key Strategies:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Launch Performance Max with competitor add-to-cart audiences</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Scale interest-based Shopping campaigns targeting jewellery buyers</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Optimize product feed with enhanced titles and descriptions</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Implement conversion tracking improvements across all campaigns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Spend & Revenue Comparison */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Spend & Revenue Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Spend', Sept: 462889, Oct: 520800 },
                    { metric: 'Revenue', Sept: 943083.94, Oct: 1230133 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Sept" fill="#6366f1" name="September Actual" />
                    <Bar dataKey="Oct" fill="#8b5cf6" name="October Projection" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Comparison */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Orders Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { metric: 'Orders', Sept: 672, Oct: 726 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis domain={[0, 800]} />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar dataKey="Sept" fill="#6366f1" name="September Actual" />
                    <Bar dataKey="Oct" fill="#8b5cf6" name="October Projection" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 October Action Items</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2">PRIORITY</span>
                    Immediate Actions
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm text-gray-700">Increase Meta budget by 7% to capitalize on proven audiences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm text-gray-700">Launch Google Performance Max with competitor add-to-cart audiences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm text-gray-700">Create new morpankh earring variations for catalogue ads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm text-gray-700">Set up weekly performance reviews to track October targets</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded mr-2">TESTING</span>
                    Experiments to Run
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">◆</span>
                      <span className="text-sm text-gray-700">A/B test new creative formats for top-performing audiences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">◆</span>
                      <span className="text-sm text-gray-700">Test interest-based Shopping campaigns for jewellery audiences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">◆</span>
                      <span className="text-sm text-gray-700">Trial dynamic retargeting with personalized product recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">◆</span>
                      <span className="text-sm text-gray-700">Experiment with video ads for high-engagement products</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risk Mitigation */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Risk Considerations</h3>
                  <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                    <li>Monitor Google campaigns closely in first 2 weeks to validate 2.09x ROAS projection</li>
                    <li>Keep backup budget reserve (10%) in case primary audiences face saturation</li>
                    <li>Track competitive landscape changes that might impact Meta CPMs</li>
                    <li>Ensure conversion tracking is accurate across all platforms before scaling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;

