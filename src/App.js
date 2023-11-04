import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationTodo, setPaginationTodo] = useState([]);
  let pageSize = 10;
  let pageNumber;
  // ***************************************************************

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((respons) => respons.json())
      .then((datas) => {
        setTodos(datas);
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize;
        let allShowTodo = datas.slice(startIndex, endIndex);
        setPaginationTodo(allShowTodo);
      });
  }, []);



  useEffect(()=>{
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let allShowTodo = todos.slice(startIndex, endIndex);
    setPaginationTodo(allShowTodo);
  },[currentPage])
  // ****************************************************

  const changPagination = (newPage) => {
    setCurrentPage(newPage);
    
  };

  const pageCount = Math.ceil(todos.length / pageSize);
  pageNumber = Array.from(Array(pageCount).keys());

  return (
    <>
      <div>
        {!todos ? (
          "Is not Data"
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Id</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginationTodo.map((todo) => (
                <tr key={todo.id}>
                  <td> {todo.id} </td>
                  <td> {todo.userId} </td>
                  <td> {todo.title} </td>
                  <td>
                    <p
                      className={
                        todo.completed ? "btn btn-success" : "btn btn-danger"
                      }
                    >
                      {todo.completed ? "Completed" : "Reject"}{" "}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* paigination******************' */}
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination pagination-lg">
            {pageNumber.map((page) => (
              <li
              style={{cursor:'pointer'}}
                className={
                  page + 1 === currentPage ? "page-item active" : "page-item"
                }
                key={page + 1}
                onClick={() => {changPagination(page + 1);}}
              >
                <span className="page-link">{page + 1}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
