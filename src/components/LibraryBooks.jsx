import React from 'react'
import LibraryHeader from './LibraryHeader'

function LibraryBooks() {

    const [books] = React.useState([
        { code: "B001", name: "React Basics", price: 200 },
        { code: "B002", name: "JS Deep Dive", price: 300 },
        { code: "B003", name: "CSS Mastery", price: 150 },
    ])

    const totalprice = books.reduce((sum, book) => sum + book.price, 0)

    return (
        <div>
            <div>
                <LibraryHeader/>
                <h2>List of Books</h2>
            </div>
            <div>
                <ul style={{ padding: 0 }}>
                    {books.map(book => (
                        <li
                            key={book.code}
                            style={{
                                border: "3px solid blue",
                                marginTop: "3px",
                                listStyle: "none",
                                padding: "8px"
                            }}
                        >
                            <div>{book.code}</div>
                            <div>{book.name}</div>
                            <div>{book.price}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                The total price for {books.length} books is {totalprice}
            </div>
        </div>
    )
}

export default LibraryBooks