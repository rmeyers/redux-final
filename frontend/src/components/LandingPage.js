import React from 'react'
import { Categories } from "./Categories";
import { Posts } from "./Posts";

export const LandingPage = () => {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Categories />
            </div>
            <div className="col-sm-9">
              <Posts />
            </div>
          </div>
        </div>
    );
};