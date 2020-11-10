import React, { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([])
    const [filterInput, setFilterInput] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        async function fetchAllUsers() {
            const response = await fetch('http://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            data.sort((a, b) => {
                if (b.name > a.name) {
                    return -1
                }
            })
            setUsers(data)
        }
        fetchAllUsers()
    }, [])

    useEffect(() => {
        const filtered = users.filter((user) => {
            if ((user.name.includes(filterInput))
                || (user.email.includes(filterInput)) ||
                (user.username.includes(filterInput))) {
                return true
            }
        })
        setFilteredUsers(filtered)
    }, [filterInput, selectValue])

    const handleSelect = (e) => {
        // bit of a hack here to create a clone of the array and then sort
        const sortedUsers = users.slice().sort((a, b) => {
            if (b[e.target.value] > a[e.target.value]) {
                return -1
            }
        })
        setSelectValue(e.target.value)
        setUsers(sortedUsers)
    }

    const handleFilter = (e) => {
        setFilterInput(e.target.value)
    }

    return (
        <div>
            <div className='user-list'>
                <h3> Users </h3>
                <div className='search-sort-input-container'>
                    <div className='search-sort-input'>
                        <div className='input-header'>
                            <div>Search</div>
                            <input type='text' value={filterInput} onChange={handleFilter}></input>
                        </div>
                        <div className='input-header'>
                            <div>Sort</div>
                            <select onChange={handleSelect}>
                                <option value='name'>Name</option>
                                <option value='username'>Username</option>
                                <option value='email'>Email</option>
                            </select>
                        </div>
                    </div>

                </div>

            </div>
            <ul className="list-group">
                {(filterInput === '') ? renderUsers(users) : renderUsers(filteredUsers)}
            </ul>

        </div >)
}


const renderUsers = (users) => {
    return users.map(user => {
        return (
            <li key={user.id} className="list-group-item">
                <span className="list-item-avatar"></span>

                <div className="list-item-info">
                    <div style={{ flexDirection: 'column' }}>
                        <div className="list-item-name">{user.name}</div>
                        <div className="list-item-username">{user.username}</div>
                    </div>
                    <div className="list-item-email">
                        <a href={`mailto:${user.email}`} style={{ marginLeft: 'auto' }}>{user.email}</a>
                    </div>
                </div>

            </li>

        )
    })
}
export default UserList;