import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyHistory, clearSalaryState } from '../../../features/admin/salaryslip/salarySlice'; // ❗ Sahi path daalein
import { FiFilter, FiLoader, FiUsers, FiDollarSign } from 'react-icons/fi';

// Helper: Currency Formatter
const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

const SalaryHistory = () => {
    const dispatch = useDispatch();
    const { monthlyHistory, status, error } = useSelector(state => state.salary);

    const [filters, setFilters] = useState({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear(),
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleFetchHistory = (e) => {
        e.preventDefault();
        dispatch(fetchMonthlyHistory(filters));
    };

    // Automatically fetch history on initial load
    useEffect(() => {
        dispatch(fetchMonthlyHistory(filters));
        
        // Cleanup on component unmount
        return () => {
            dispatch(clearSalaryState());
        }
    }, [dispatch]); // Removed filters from dependency array to prevent re-fetch on every change

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Salary Disbursement History</h1>
            
            {/* Filter Form Card */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                <form onSubmit={handleFetchHistory} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="month-select" className="block text-sm font-medium text-gray-700">Month</label>
                        <select id="month-select" name="month" value={filters.month} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year-select" className="block text-sm font-medium text-gray-700">Year</label>
                        <select id="year-select" name="year" value={filters.year} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                    <div className="sm:col-start-3 lg:col-start-4">
                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#03286d] hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-indigo-300"
                        >
                            {status === 'loading' ? (
                                <>
                                    <FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <FiFilter className="-ml-1 mr-2 h-5 w-5" />
                                    <span>Apply Filter</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {error && <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">{error}</div>}

            {/* Summary Cards */}
            {status !== 'loading' && monthlyHistory.summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <FiUsers size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Employees Paid</p>
                            <p className="text-2xl font-bold text-gray-800">{monthlyHistory.summary.totalEmployeesPaid}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <FiDollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Salary Disbursed</p>
                            <p className="text-2xl font-bold text-gray-800">{formatCurrency(monthlyHistory.summary.totalPaidSalary)}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Slips Table Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {monthlyHistory.summary ? `Paid Slips for ${monthlyHistory.summary.month} ${monthlyHistory.summary.year}` : 'Salary Slips'}
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Published</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {status === 'loading' && (
                                <tr><td colSpan="4" className="text-center py-10"><FiLoader className="animate-spin mx-auto h-8 w-8 text-indigo-600" /></td></tr>
                            )}
                            {status !== 'loading' && monthlyHistory.slips.length > 0 ? (
                                monthlyHistory.slips.map(slip => (
                                    <tr key={slip._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slip.user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slip.user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{formatCurrency(slip.netSalary)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(slip.updatedAt).toLocaleDateString('en-GB')}</td>
                                    </tr>
                                ))
                            ) : (
                                status !== 'loading' && <tr><td colSpan="4" className="text-center py-10 text-gray-500">No published slips found for the selected period.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalaryHistory;