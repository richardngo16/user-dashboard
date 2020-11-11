import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserDetail() {
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState(null)
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1);
    useEffect(() => {
        async function fetchUserDetails() {
            const response = await fetch(`http://jsonplaceholder.typicode.com/users/${id}`)
            const data = await response.json()
            setUser(data)
        }
        fetchUserDetails()
    }, [])

    useEffect(() => {
        async function fetchUserPosts() {
            const response = await fetch(`http://jsonplaceholder.typicode.com/posts?userId=${id}`)
            const data = await response.json()
            setPosts(data)
        }
        fetchUserPosts()
    }, [])

    return user && (
        <div>
            <h1>
                <Link to="/">Users</Link> {'>'} {user.name}

            </h1>
            <div className='user-detail-cards'>
                {renderContactCard(user)}
                {renderAddressCard(user.address)}
                {renderCompanyCard(user.company)}
            </div>
            <h1> Posts by {user.name}</h1>
            <div className='user-posts-cards'>
                {posts && renderPostsCard(posts)}
            </div>
        </div>

    )
}

const renderContactCard = (user) => {
    const { username, email, phone, website } = user
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'>
                    Contact Info
            </h4>
                <div>Username:{username}</div>
                <div>Email:{email}</div>
                <div>Phone:{phone}</div>
                <div>Website:{website}</div>
            </div>
        </div>
    )
}

const renderAddressCard = (address) => {
    const { suite, street, city, zipcode } = address
    return (<div className='card'>
        <div className='card-body'>
            <h4 className='card-title'>Address</h4>
            <div>
                {`${suite}, ${street}, ${city}, ${zipcode}`}
            </div>
        </div>
    </div>)
}

const renderCompanyCard = (company) => {
    const { name, bs, catchphrase } = company
    return (<div className='card'>
        <div className='card-body'>
            <h4 className='card-title'>Company</h4>
            <div>{name}</div>
            <div>{bs}</div>
            <div>{catchphrase}</div>
        </div>
    </div>)
}

const renderPostsCard = (posts) => {
    return posts.map((post) => {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h4>{post.title}</h4>
                    <div>{post.body}</div>
                </div>
            </div>
        )
    })
}
export default UserDetail;