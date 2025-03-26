import React, { useEffect } from "react";
import "./styles.css";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4 pagination-container">
            <ButtonGroup>
                <Button
                    size="small"
                    severity="secondary"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-md ${"bg-white hover:bg-gray-100"}`}
                    label="Prev"
                />

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <Button
                            size="small"
                            outlined
                            severity="secondary"
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "bg-white hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </Button>
                    )
                )}

                <Button
                    label="Next"
                    size="small"
                    severity="secondary"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded-md ${"bg-white hover:bg-gray-100"}`}
                />
            </ButtonGroup>
        </div>
    );
};

export default Pagination;
