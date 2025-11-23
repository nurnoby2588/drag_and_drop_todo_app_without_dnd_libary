import React, { useState } from 'react'
import type { Columns, Task } from './Type'
type ColumnsContentProps = {
    columnsName: string, columns: Columns, handleDragStart: (columnsName: string, item: Task) => void, handleDelete: (columnsName: string, id: number | string) => void, handleTouchStart?: (columnsName: string, item: Task) => void, handleTouchEnd?: (columnsName: string) => void, allColumns?: string[]
}

const ColumnsContent: React.FC<ColumnsContentProps> = ({ columnsName, columns, handleDragStart, handleDelete, handleTouchStart, handleTouchEnd, allColumns }) => {
    const [selectedItemForMobile, setSelectedItemForMobile] = useState<string | number | null>(null);

    const handleMobileItemSelect = (item: Task) => {
        setSelectedItemForMobile(selectedItemForMobile === item.id ? null : item.id);
        if (handleTouchStart) {
            handleTouchStart(columnsName, item);
        }
    };

    const handleMobileMove = (targetColumnName: string) => {
        if (handleTouchEnd) {
            handleTouchEnd(targetColumnName);
        }
        setSelectedItemForMobile(null);
    };
    return (
        <div className="p-2 sm:p-3 min-h-64 space-y-2 sm:space-y-3">
                {columns[columnsName].items.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 italic text-xs sm:text-sm">
                        Drop tasks here
                    </div>
                ) : (
                    columns[columnsName].items.map((item: Task) => (
                        <div key={item.id}>
                            <div
                                className={`p-3 sm:p-4 mb-2 sm:mb-3 bg-gray-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600 gap-2 text-sm sm:text-base ${selectedItemForMobile === item.id ? 'ring-2 ring-yellow-400 scale-105' : ''}`}
                                draggable
                                onDragStart={() =>
                                    handleDragStart(columnsName, item)
                                }
                                onTouchStart={() => {
                                    handleMobileItemSelect(item);
                                }}
                                onTouchEnd={() => {
                                    // Touch end will be handled at the column level
                                }}
                            >
                                <span className="mr-2 grow wrap-break-word">{item.content}</span>
                                <button
                                    onClick={() =>
                                        handleDelete(columnsName, item.id)
                                    }
                                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600 shrink-0"
                                >
                                    <span className="text-lg cursor-pointer">x</span>
                                </button>
                            </div>
                            {/* Mobile Move Buttons */}
                            {selectedItemForMobile === item.id && (
                                <div className="sm:hidden mb-2 flex gap-2 flex-wrap">
                                    {allColumns && allColumns.map((col) => (
                                        col !== columnsName && (
                                            <button
                                                key={col}
                                                onClick={() => handleMobileMove(col)}
                                                className="text-xs flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Move to {columns[col]?.name || col}
                                            </button>
                                        )
                                    ))}
                                    <button
                                        onClick={() => setSelectedItemForMobile(null)}
                                        className="text-xs flex-1 px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
    )
}
export default ColumnsContent