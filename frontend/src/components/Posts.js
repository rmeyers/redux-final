import React from 'react'
import { Media, DropdownButton, MenuItem } from 'react-bootstrap'

export const Posts = () => {
    return (
        <div>
          <h1>Posts</h1>
          <div class="nav">
            <button className="btn btn-primary">Add Post</button>
            <DropdownButton
              title={'Sort By'}
            >
              <MenuItem eventKey="date" active>Date</MenuItem>
              <MenuItem eventKey="rating">Rating</MenuItem>
            </DropdownButton>
          </div>
          <Media className="post">
            <Media.Body>
              <div className="row">
                <div className="col-sm-9">
                  <Media.Heading>Media Heading</Media.Heading>
                  <p>By Author Name</p>
                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                    fringilla. Donec lacinia congue felis in faucibus.
                  </p>
                </div>
                <div className="col-sm-3 post-info">
                  <p>Timestamp</p>
                  <p>Rating</p>
                </div>
              </div>
            </Media.Body>
          </Media>
        </div>
    );
};