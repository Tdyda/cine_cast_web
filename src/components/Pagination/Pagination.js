import React from 'react';
import styles from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className={`pagination ${styles.pagination} justify-content-center mt-4 ${styles['bs-pagination-hover-bg']}`}>
                <li className={`page-item`}>
                    <button
                        className={`page-link ${styles.color}`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Poprzednia
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        className={`page-item ${styles['page-item']} ${currentPage === index + 1 ? `${styles.active}` : ''}`}
                    >
                        <button
                            className={`page-link ${styles.color}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item`}>
                    <button
                        className={`page-link ${styles.color}`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Następna
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
