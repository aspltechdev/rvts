'use client';

import React, { useState } from 'react';
import { Mail, Calendar, Phone, Download, FileText, Search, Filter, Download as DownloadIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function QueriesTable({ queries }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'contact', 'download'
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterType, startDate, endDate]);

    const getQueryType = (subject) => {
        if (subject && subject.toLowerCase().includes('download request')) return 'download';
        return 'contact';
    };

    const filteredQueries = queries.filter(query => {
        const type = getQueryType(query.subject);
        const matchesType = filterType === 'all' || type === filterType;
        
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            query.firstName.toLowerCase().includes(searchLower) ||
            query.lastName.toLowerCase().includes(searchLower) ||
            query.email.toLowerCase().includes(searchLower) ||
            (query.phoneNumber && query.phoneNumber.includes(searchLower)) ||
            query.subject.toLowerCase().includes(searchLower);

        // Date Range Filtering
        let matchesDate = true;
        const queryDate = new Date(query.createdAt);
        // Reset time part for accurate date comparison
        queryDate.setHours(0, 0, 0, 0);

        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            if (queryDate < start) matchesDate = false;
        }

        if (endDate) {
            const end = new Date(endDate);
            end.setHours(0, 0, 0, 0);
            if (queryDate > end) matchesDate = false;
        }

        return matchesType && matchesSearch && matchesDate;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedQueries = filteredQueries.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const exportToExcel = () => {
        const dataToExport = filteredQueries.map(q => ({
            Date: new Date(q.createdAt).toLocaleString(),
            Type: getQueryType(q.subject) === 'download' ? 'Download Request' : 'Contact Inquiry',
            'First Name': q.firstName,
            'Last Name': q.lastName,
            Email: q.email,
            Phone: q.phoneNumber || 'N/A', // Separate Phone Column
            Subject: q.subject,
            Details: q.message, // Renamed Message to Details
            Status: q.status
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Queries");
        XLSX.writeFile(wb, `RVTS_Queries_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const clearDateFilter = () => {
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
                
                {/* Top Row: Search & Export */}
                <div className="flex items-center gap-3 w-full">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border-transparent focus:bg-white dark:focus:bg-zinc-900 border focus:border-brand-red rounded-lg text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 text-gray-900 dark:text-white"
                        />
                    </div>
                    
                    {/* Export Button (Desktop/Mobile unified) */}
                    <button 
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-colors shadow-md shadow-green-600/20 whitespace-nowrap shrink-0"
                    >
                        <DownloadIcon size={16} />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>

                {/* Bottom Row: Filters & Date */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                     {/* Filter Type Buttons */}
                    <div className="grid grid-cols-3 sm:flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
                        {['all', 'contact', 'download'].map((type) => (
                            <button 
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap text-center ${filterType === type ? 'bg-white dark:bg-zinc-700 text-brand-red shadow-sm' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Date Filter */}
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800/50 p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 w-full sm:w-auto">
                        <span className="text-xs font-bold text-gray-500 uppercase px-1 whitespace-nowrap hidden xl:inline-block">Date:</span>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-xs rounded px-2 py-1.5 text-gray-700 dark:text-zinc-300 outline-none focus:border-brand-red w-full sm:w-28"
                        />
                        <span className="text-gray-400 text-xs">-</span>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-xs rounded px-2 py-1.5 text-gray-700 dark:text-zinc-300 outline-none focus:border-brand-red w-full sm:w-28"
                        />
                        {(startDate || endDate) && (
                            <button onClick={clearDateFilter} className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full text-gray-500 transition-colors shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Date</th>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Type</th>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Name</th>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Email</th>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Phone</th>
                                <th className="px-6 py-3 font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider text-xs whitespace-nowrap">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {paginatedQueries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-zinc-500 italic">
                                        No queries found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                paginatedQueries.map((query) => {
                                    const type = getQueryType(query.subject);
                                    return (
                                        <tr key={query.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-2.5 text-gray-500 dark:text-zinc-400 whitespace-nowrap align-middle">
                                                <div>
                                                    {new Date(query.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(query.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </div>
                                            </td>
                                            <td className="px-6 py-2.5 align-middle">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                    type === 'download' 
                                                    ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                                                    : 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                                }`}>
                                                    {type === 'download' ? <Download size={10} /> : <Mail size={10} />}
                                                    {type === 'download' ? 'Download' : 'Contact'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-2.5 align-middle">
                                                <div className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[150px]" title={`${query.firstName} ${query.lastName}`}>
                                                    {query.firstName} {query.lastName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-2.5 align-middle">
                                                <a href={`mailto:${query.email}`} className="text-gray-600 dark:text-zinc-300 hover:text-brand-red transition-colors truncate max-w-[150px] text-sm block" title={query.email}>{query.email}</a>
                                            </td>
                                            <td className="px-6 py-2.5 align-middle">
                                                 {query.phoneNumber ? (
                                                    <span className="text-gray-600 dark:text-zinc-300 whitespace-nowrap text-sm">{query.phoneNumber}</span>
                                                ) : <span className="text-gray-400 italic text-xs">N/A</span>}
                                            </td>
                                            <td className="px-6 py-2.5 align-middle max-w-xs">
                                                {type === 'download' ? (
                                                     <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white" title={query.message}>
                                                        <FileText size={14} className="text-blue-500 shrink-0" />
                                                        <span className="truncate">{query.message}</span>
                                                     </div>
                                                ) : (
                                                    <div className="flex flex-col gap-0.5 max-w-[250px]">
                                                        <div className="font-bold text-gray-900 dark:text-white text-xs truncate uppercase tracking-wide" title={query.subject}>
                                                            {query.subject}
                                                        </div>
                                                        <div className="text-gray-500 dark:text-zinc-400 text-xs truncate" title={query.message}>
                                                            {query.message}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Controls */}
                <div className="bg-gray-50 dark:bg-zinc-950 px-6 py-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-zinc-500 font-medium uppercase tracking-wide">
                        Showing {filteredQueries.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredQueries.length)} of {filteredQueries.length} entries
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                            Page {currentPage} of {totalPages || 1}
                        </span>
                        <button 
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= totalPages || totalPages === 0}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
