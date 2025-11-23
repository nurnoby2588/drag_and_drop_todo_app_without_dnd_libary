import type React from "react"

type CreateTaskProps = {
    newTask: string,
    setNewTask: (value: string) => void,
    handleCreateNewTask: () => void,
    activeColumn: string,
    setActiveColumn: (value: string) => void,
    columns:
    {
        [key: string]: {
            name: string,
            items: Array<{ id: string | number, content: string }>
        }
    }

}

const CreateTask: React.FC<CreateTaskProps> = ({ newTask, setNewTask, handleCreateNewTask, activeColumn, setActiveColumn, columns }) => {
    return (
        <>
            {/* Task Input Section */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row w-full max-w-lg shadow-lg rounded-lg overflow-hidden gap-2 sm:gap-0">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="grow p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm sm:text-base"
                    placeholder="Add a new task..."
                    onKeyDown={(e) => e.key === "Enter" && handleCreateNewTask()}
                />
                <select
                    value={activeColumn}
                    onChange={(e) => setActiveColumn(e.target.value)}
                    className="p-3 bg-gray-700 text-white border-0 sm:border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-sm sm:text-base"
                >
                    {Object.keys(columns).map((columnsId) => (
                        <option value={columnsId} key={columnsId}>
                            {columns[columnsId].name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleCreateNewTask}
                    className="px-4 sm:px-6 py-3 sm:py-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                >
                    Add
                </button>
            </div>
        </>
    )
}
export default CreateTask
