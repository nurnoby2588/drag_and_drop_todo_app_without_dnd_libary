import React from 'react'
import type { Columns, ColumnsStyles } from './Type'

type ColumnsHeaderProps = {
    columnsStyles: ColumnsStyles,
    columnsName: string,
    columns: Columns
}

const ColumnsHeader: React.FC<ColumnsHeaderProps> = ({ columnsStyles, columnsName, columns }) => {
    return (
        <>
            <div
                className={`p-3 sm:p-4 text-white font-bold text-lg sm:text-xl rounded-t-md ${columnsStyles[columnsName].header}`}
            >
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <span>{columns[columnsName].name}</span>
                    <span className="px-2 py-1 bg-gray-800 bg-opacity-30 rounded-full text-xs sm:text-sm">
                        {columns[columnsName].items.length}
                    </span>
                </div>
            </div>
        </>
    )
}
export default ColumnsHeader