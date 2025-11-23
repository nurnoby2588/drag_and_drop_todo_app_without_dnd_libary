// // without drap and drop own section
import { useState } from "react";
import CreateTask from "./components/CreateTask";
import ColumnsHeader from "./components/ColumnsHeader";
import ColumnsContent from "./components/ColumnsContent";

// Define types for columns and tasks
type Task = {
  id: number | string;
  content: string;
};

type Column = {
  name: string;
  items: Task[];
};

type Columns = {
  [key: string]: Column;
};

function App() {
  const [columns, setColumns] = useState<Columns>({
    todo: {
      name: "To Do",
      items: [
        { id: 1, content: "Go to the market" },
        { id: 2, content: "Shopping" },
      ],
    },
    inprogress: {
      name: "In Progress",
      items: [{ id: 3, content: "Work on mobile app" }],
    },
    done: {
      name: "Done",
      items: [{ id: 4, content: "Set up mobile app" }],
    },
  });

  const [newTask, setNewTask] = useState<string>("");
  const [activeColumn, setActiveColumn] = useState<string>("todo");
  const [draggableItem, setDraggableItem] = useState<{
    columnsId: string;
    item: Task;
  } | null>(null);
  const [touchItem, setTouchItem] = useState<{
    columnsId: string;
    item: Task;
  } | null>(null);

  const handleCreateNewTask = () => {
    if (newTask.trim() === "") return;
    const updatedColumns = { ...columns };
    updatedColumns[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updatedColumns);
    setNewTask("");
  };

  const handleDelete = (activeColumnId: string, taskId: number | string) => {
    const updatedTask = { ...columns };
    updatedTask[activeColumnId].items = updatedTask[activeColumnId].items.filter(
      (item) => item.id !== taskId
    );
    setColumns(updatedTask);
  };

  const handleDragStart = (columnsId: string, item: Task) => {
    setDraggableItem({ columnsId, item });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnsId: string) => {
    e.preventDefault();
    console.log("column name", columnsId)
    if (!draggableItem) return;
    const { columnsId: sourceColumnsId, item } = draggableItem;
    if (sourceColumnsId === columnsId) return;

    const updatedColumns = { ...columns };
    // Remove item from source column
    updatedColumns[sourceColumnsId].items = updatedColumns[sourceColumnsId].items.filter(
      (i) => i.id !== item.id
    );

    // Add item to target column
    updatedColumns[columnsId].items.push(item);
    setColumns(updatedColumns);
    setDraggableItem(null);
  };

  // Touch handlers for mobile drag and drop
  const handleTouchStart = (columnsId: string, item: Task) => {
    setTouchItem({ columnsId, item });
  };

  const handleTouchEnd = (targetColumnsId: string) => {
    if (!touchItem) return;
    const { columnsId: sourceColumnsId, item } = touchItem;
    if (sourceColumnsId === targetColumnsId) {
      setTouchItem(null);
      return;
    }

    const updatedColumns = { ...columns };
    // Remove item from source column
    updatedColumns[sourceColumnsId].items = updatedColumns[sourceColumnsId].items.filter(
      (i) => i.id !== item.id
    );

    // Add item to target column
    updatedColumns[targetColumnsId].items.push(item);
    setColumns(updatedColumns);
    setTouchItem(null);
  };

  const columnsStyles: { [key: string]: { header: string; border: string } } = {
    todo: {
      header: "bg-gradient-to-r from-[#2F5755] to-[#007ea7]",
      border: "border-[#2F5755]",
    },
    inprogress: {
      header: "bg-gradient-to-r from-[#EDA35A] to-[#E1AA36]",
      border: "border-[#E1AA36]",
    },
    done: {
      header: "bg-gradient-to-r from-[#3F7D58] to-[#328E6E]",
      border: "border-[#328E6E]",
    },
  };

  return (
    <>
      <div className="p-3 sm:p-4 md:p-6 w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col gap-4 sm:gap-6 max-w-7xl w-full px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 animate-pulse text-center">
            Modern To-Do App
          </h1>

          {/* Task Input Section */}
          <CreateTask newTask={newTask} setNewTask={setNewTask} handleCreateNewTask={handleCreateNewTask} activeColumn={activeColumn} setActiveColumn={setActiveColumn} columns={columns} ></CreateTask>

          {/* Columns Section */}
          <div className="flex flex-col justify-center sm:flex-row gap-4 sm:gap-6 pb-6 w-full overflow-x-auto">
            {Object.keys(columns).map((columnsName) => (
              <div
                key={columnsName}
                className={`shrink-0 w-full sm:w-80 bg-gray-800 rounded-lg shadow-xl border-t-4 ${columnsStyles[columnsName].border} transition-all transform hover:scale-105`}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, columnsName)}
                onTouchEnd={() => handleTouchEnd(columnsName)}
              >
                {/* Column Header */}
               <ColumnsHeader columns={columns} columnsName={columnsName} columnsStyles={columnsStyles}></ColumnsHeader>

                {/* Column Content */}
               <ColumnsContent columns={columns} columnsName={columnsName} handleDelete={handleDelete} handleDragStart={handleDragStart} handleTouchStart={handleTouchStart} handleTouchEnd={handleTouchEnd} allColumns={Object.keys(columns)}></ColumnsContent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;



// // work only button to up
// // import { useState } from "react";

// // // Define types for columns and tasks
// // type Task = {
// //   id: number | string;
// //   content: string;
// // };

// // type Column = {
// //   name: string;
// //   items: Task[];
// // };

// // type Columns = {
// //   [key: string]: Column;
// // };

// // function App() {
// //   const [columns, setColumns] = useState<Columns>({
// //     todo: {
// //       name: "To Do",
// //       items: [
// //         { id: 1, content: "Go to the market" },
// //         { id: 2, content: "Shopping" },
// //       ],
// //     },
// //     inprogress: {
// //       name: "In Progress",
// //       items: [{ id: 3, content: "Work on mobile app" }],
// //     },
// //     done: {
// //       name: "Done",
// //       items: [{ id: 4, content: "Set up mobile app" }],
// //     },
// //   });

// //   const [newTask, setNewTask] = useState<string>("");
// //   const [activeColumn, setActiveColumn] = useState<string>("todo");
// //   const [draggableItem, setDraggableItem] = useState<{
// //     columnsId: string;
// //     item: Task;
// //   } | null>(null);

// //   const handleCreateNewTask = () => {
// //     if (newTask.trim() === "") return;
// //     const updatedColumns = { ...columns };
// //     updatedColumns[activeColumn].items.push({
// //       id: Date.now().toString(),
// //       content: newTask,
// //     });
// //     setColumns(updatedColumns);
// //     setNewTask("");
// //   };

// //   const handleDelete = (activeColumnId: string, taskId: number | string) => {
// //     const updatedTask = { ...columns };
// //     updatedTask[activeColumnId].items = updatedTask[activeColumnId].items.filter(
// //       (item) => item.id !== taskId
// //     );
// //     setColumns(updatedTask);
// //   };

// //   const handleDragStart = (columnsId: string, item: Task) => {
// //     setDraggableItem({ columnsId, item });
// //   };

// //   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
// //     e.preventDefault();
// //   };

// //   const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnsId: string) => {
// //     e.preventDefault();
// //     if (!draggableItem) return;

// //     const { columnsId: sourceColumnsId, item } = draggableItem;
// //     const updatedColumns = { ...columns };

// //     if (sourceColumnsId === columnsId) {
// //       // Reorder items within the same column
// //       const columnItems = [...updatedColumns[columnsId].items];
// //       const draggedIndex = columnItems.findIndex((i) => i.id === item.id);
// //       const targetIndex = Number(e.currentTarget.getAttribute("data-index"));

// //       if (draggedIndex !== targetIndex) {
// //         // Remove the item from its current position
// //         columnItems.splice(draggedIndex, 1);
// //         // Insert the item at the new position
// //         columnItems.splice(targetIndex, 0, item);
// //         // Update the column
// //         updatedColumns[columnsId].items = columnItems;
// //       }
// //     } else {
// //       // Move item to a different column
// //       updatedColumns[sourceColumnsId].items = updatedColumns[sourceColumnsId].items.filter(
// //         (i) => i.id !== item.id
// //       );
// //       updatedColumns[columnsId].items.push(item);
// //     }

// //     setColumns(updatedColumns);
// //     setDraggableItem(null);
// //   };

// //   const columnsStyles: { [key: string]: { header: string; border: string } } = {
// //     todo: {
// //       header: "bg-gradient-to-r from-blue-500 to-blue-400",
// //       border: "border-blue-400",
// //     },
// //     inprogress: {
// //       header: "bg-gradient-to-r from-yellow-500 to-yellow-400",
// //       border: "border-yellow-400",
// //     },
// //     done: {
// //       header: "bg-gradient-to-r from-green-500 to-green-400",
// //       border: "border-green-400",
// //     },
// //   };

// //   return (
// //     <>
// //       <div className="p-6 w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
// //         <div className="flex items-center justify-center flex-col gap-6 max-w-6xl">
// //           <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 animate-pulse">
// //             Modern To-Do App
// //           </h1>

// //           {/* Task Input Section */}
// //           <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
// //             <input
// //               type="text"
// //               value={newTask}
// //               onChange={(e) => setNewTask(e.target.value)}
// //               className="grow p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
// //               placeholder="Add a new task..."
// //               onKeyDown={(e) => e.key === "Enter" && handleCreateNewTask()}
// //             />
// //             <select
// //               value={activeColumn}
// //               onChange={(e) => setActiveColumn(e.target.value)}
// //               className="p-3 bg-gray-700 text-white border-0 border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
// //             >
// //               {Object.keys(columns).map((columnsId) => (
// //                 <option value={columnsId} key={columnsId}>
// //                   {columns[columnsId].name}
// //                 </option>
// //               ))}
// //             </select>

// //             <button
// //               onClick={handleCreateNewTask}
// //               className="px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
// //             >
// //               Add
// //             </button>
// //           </div>

// //           {/* Columns Section */}
// //           <div className="flex gap-6 overflow-x-auto pb-6 w-full">
// //             {Object.keys(columns).map((columnsName) => (
// //               <div
// //                 key={columnsName}
// //                 className={`shrink-0 w-80 bg-gray-800 rounded-lg shadow-xl border-t-4 ${columnsStyles[columnsName].border} transition-all transform hover:scale-105`}
// //                 onDragOver={(e) => handleDragOver(e)}
// //                 onDrop={(e) => handleDrop(e, columnsName)}
// //               >
// //                 {/* Column Header */}
// //                 <div
// //                   className={`p-4 text-white font-bold text-xl rounded-t-md ${columnsStyles[columnsName].header}`}
// //                 >
// //                   {columns[columnsName].name}
// //                   <span className="ml-2 px-2 py-1 bg-gray-800 bg-opacity-30 rounded-full text-sm">
// //                     {columns[columnsName].items.length}
// //                   </span>
// //                 </div>

// //                 {/* Column Content */}
// //                 <div className="p-3 min-h-64 space-y-3">
// //                   {columns[columnsName].items.length === 0 ? (
// //                     <div className="text-center py-10 text-gray-500 italic text-sm">
// //                       Drop tasks here
// //                     </div>
// //                   ) : (
// //                     columns[columnsName].items.map((item, index) => (
// //                       <div
// //                         key={item.id}
// //                         className="p-4 mb-3 bg-gray-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600"
// //                         draggable
// //                         onDragStart={() =>
// //                           handleDragStart(columnsName, item)
// //                         }
// //                         data-index={index} // Add index to identify drop position
// //                       >
// //                         <span className="mr-2">{item.content}</span>
// //                         <button
// //                           onClick={() =>
// //                             handleDelete(columnsName, item.id)
// //                           }
// //                           className="text-gray-400 hover:text-red-400 transition-colors duration-300 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600"
// //                         >
// //                           <span className="text-lg cursor-pointer">x</span>
// //                         </button>
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default App;





// import { useState } from "react";

// // Define types for columns and tasks
// type Task = {
//   id: number | string;
//   content: string;
// };

// type Column = {
//   name: string;
//   items: Task[];
// };

// type Columns = {
//   [key: string]: Column;
// };

// function App() {
//   const [columns, setColumns] = useState<Columns>({
//     todo: {
//       name: "To Do",
//       items: [
//         { id: 1, content: "Go to the market" },
//         { id: 2, content: "Shopping" },
//         { id: 3, content: "Clean the house" },
//       ],
//     },
//     inprogress: {
//       name: "In Progress",
//       items: [{ id: 4, content: "Work on mobile app" }],
//     },
//     done: {
//       name: "Done",
//       items: [{ id: 5, content: "Set up mobile app" }],
//     },
//   });

//   const [newTask, setNewTask] = useState<string>("");
//   const [activeColumn, setActiveColumn] = useState<string>("todo");
//   const [draggableItem, setDraggableItem] = useState<{
//     columnsId: string;
//     item: Task;
//   } | null>(null);

//   const handleCreateNewTask = () => {
//     if (newTask.trim() === "") return;
//     const updatedColumns = { ...columns };
//     updatedColumns[activeColumn].items.push({
//       id: Date.now().toString(),
//       content: newTask,
//     });
//     setColumns(updatedColumns);
//     setNewTask("");
//   };

//   const handleDelete = (activeColumnId: string, taskId: number | string) => {
//     const updatedTask = { ...columns };
//     updatedTask[activeColumnId].items = updatedTask[activeColumnId].items.filter(
//       (item) => item.id !== taskId
//     );
//     setColumns(updatedTask);
//   };

//   const handleDragStart = (columnsId: string, item: Task) => {
//     setDraggableItem({ columnsId, item });
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (
//     e: React.DragEvent<HTMLDivElement>,
//     columnsId: string,
//     targetIndex: number | null
//   ) => {
//     e.preventDefault();
//     if (!draggableItem) return;

//     const { columnsId: sourceColumnsId, item } = draggableItem;
//     const updatedColumns = { ...columns };

//     if (sourceColumnsId === columnsId) {
//       // Reorder items within the same column
//       const columnItems = [...updatedColumns[columnsId].items];
//       const draggedIndex = columnItems.findIndex((i) => i.id === item.id);

//       if (draggedIndex !== targetIndex && targetIndex !== null) {
//         // Remove the item from its current position
//         columnItems.splice(draggedIndex, 1);
//         // Insert the item at the new position
//         columnItems.splice(targetIndex, 0, item);
//         // Update the column
//         updatedColumns[columnsId].items = columnItems;
//       }
//     } else {
//       // Move item to a different column
//       updatedColumns[sourceColumnsId].items = updatedColumns[sourceColumnsId].items.filter(
//         (i) => i.id !== item.id
//       );
//       updatedColumns[columnsId].items.splice(targetIndex ?? 0, 0, item); // Insert at targetIndex or at the end if null
//     }

//     setColumns(updatedColumns);
//     setDraggableItem(null);
//   };

//   const columnsStyles: { [key: string]: { header: string; border: string } } = {
//     todo: {
//       header: "bg-gradient-to-r from-blue-500 to-blue-400",
//       border: "border-blue-400",
//     },
//     inprogress: {
//       header: "bg-gradient-to-r from-yellow-500 to-yellow-400",
//       border: "border-yellow-400",
//     },
//     done: {
//       header: "bg-gradient-to-r from-green-500 to-green-400",
//       border: "border-green-400",
//     },
//   };

//   return (
//     <>
//       <div className="p-6 w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
//         <div className="flex items-center justify-center flex-col gap-6 max-w-6xl">
//           <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 animate-pulse">
//             Modern To-Do App
//           </h1>

//           {/* Task Input Section */}
//           <div className="mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
//             <input
//               type="text"
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               className="grow p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
//               placeholder="Add a new task..."
//               onKeyDown={(e) => e.key === "Enter" && handleCreateNewTask()}
//             />
//             <select
//               value={activeColumn}
//               onChange={(e) => setActiveColumn(e.target.value)}
//               className="p-3 bg-gray-700 text-white border-0 border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
//             >
//               {Object.keys(columns).map((columnsId) => (
//                 <option value={columnsId} key={columnsId}>
//                   {columns[columnsId].name}
//                 </option>
//               ))}
//             </select>

//             <button
//               onClick={handleCreateNewTask}
//               className="px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:from-pink-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
//             >
//               Add
//             </button>
//           </div>

//           {/* Columns Section */}
//           <div className="flex gap-6  pb-6 w-full">
//             {Object.keys(columns).map((columnsName) => (
//               <div
//                 key={columnsName}
//                 className={`shrink-0 w-80 bg-gray-800 rounded-lg shadow-xl border-t-4 ${columnsStyles[columnsName].border} transition-all transform hover:scale-105`}
//                 onDragOver={(e) => handleDragOver(e)}
//                 onDrop={(e) => handleDrop(e, columnsName, null)} // Default drop at the end if no specific target index
//               >
//                 {/* Column Header */}
//                 <div
//                   className={`p-4 text-white font-bold text-xl rounded-t-md ${columnsStyles[columnsName].header}`}
//                 >
//                   {columns[columnsName].name}
//                   <span className="ml-2 px-2 py-1 bg-gray-800 bg-opacity-30 rounded-full text-sm">
//                     {columns[columnsName].items.length}
//                   </span>
//                 </div>

//                 {/* Column Content */}
//                 <div className="p-3 min-h-64 space-y-3">
//                   {columns[columnsName].items.length === 0 ? (
//                     <div className="text-center py-10 text-gray-500 italic text-sm">
//                       Drop tasks here
//                     </div>
//                   ) : (
//                     columns[columnsName].items.map((item, index) => (
//                       <div
//                         key={item.id}
//                         className="p-4 mb-3 bg-gray-700 text-white rounded-lg shadow-md cursor-move flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-600"
//                         draggable
//                         onDragStart={() =>
//                           handleDragStart(columnsName, item)
//                         }
//                         onDrop={(e) => handleDrop(e, columnsName, index)} // Pass index for proper reordering
//                       >
//                         <span className="mr-2">{item.content}</span>
//                         <button
//                           onClick={() =>
//                             handleDelete(columnsName, item.id)
//                           }
//                           className="text-gray-400 hover:text-red-400 transition-colors duration-300 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600"
//                         >
//                           <span className="text-lg cursor-pointer">x</span>
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

