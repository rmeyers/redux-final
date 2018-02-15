import React from 'react'
import { Link } from 'react-router-dom'

function NoMatch(props) {
  return (
    <div>
        <h1>404 Error - Page Not Found</h1>
        <Link to="/">Back to Main</Link>
    </div>
  );
}

export default NoMatch
