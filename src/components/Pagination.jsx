import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  if (totalPages <= 1 && totalItems === 0) return null;

  // Calculate shown range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first, last, and pages around current
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-100 sm:px-6 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button className="cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border ${
            currentPage === 1 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
          }`}
        >
          Previous
        </button>
        <button className="cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border ${
            currentPage === totalPages 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {totalItems > 0 ? (
            <p className="text-sm text-gray-700">
              Showing <span className="font-semibold">{startItem}</span> to <span className="font-semibold">{endItem}</span> of{' '}
              <span className="font-semibold">{totalItems}</span> results
            </p>
          ) : (
            <p className="text-sm text-gray-700">No results found</p>
          )}
        </div>
        <div>
          {totalPages > 1 && (
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="cursor-pointer"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 border ${
                  currentPage === 1 
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                ) : (
                  <button className="cursor-pointer"
                    key={page}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      page === currentPage
                        ? 'z-10 bg-blue-600 text-white focus-visible:outline-blue-600 border-blue-600'
                        : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}

              <button className="cursor-pointer"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 border ${
                  currentPage === totalPages 
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
