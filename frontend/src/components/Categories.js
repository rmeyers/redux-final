import React from 'react'
import { Table } from 'react-bootstrap'

export const Categories = () => {
    return (
        <Table striped bordered condensed hover className="cat-table">
            <thead>
              <tr>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All</td>
              </tr>
              <tr>
                <td>React</td>
              </tr>
              <tr>
                <td>Redux</td>
              </tr>
              <tr>
                <td>Udacity</td>
              </tr>
            </tbody>
        </Table>
    );
};