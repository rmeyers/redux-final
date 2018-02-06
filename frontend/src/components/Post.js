import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Post = (props) => {
    const post = props.thisPost

    // Note to self: This 'new' looks like it's required so it doesn't read the current time.
    const date = new Date(post.timestamp).toString()

    return (
      <Media className="post">
        <Media.Body>
          <div className="row">
            <div className="col-sm-9">
              <Link to={"/post-detail/" + post.id}><Media.Heading>{ post.title }</Media.Heading></Link>
              <p>By { post.author }</p>
              <p>
                { post.body }
              </p>
            </div>
            <div className="col-sm-3 post-info">
              <p>{ date }</p>
              <p>
                <button className="btn" onClick={() => props.decRating(post.id)}>-</button>
                  { post.voteScore }
                <button className="btn" onClick={() => props.incRating(post.id)}>+</button>
              </p>
            </div>
          </div>
        </Media.Body>
      </Media>
    );
};
