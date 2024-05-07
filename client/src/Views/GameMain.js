import React from "react";

import { Outlet } from "react-router";

export default function MainGame(props){
    return (
        <div className="bg-bg2 bg-no-repeat bg-center bg-cover h-screen w-screen overflow-hidden overscroll-y-none overscroll-none">
            <div className=" w-screen h-screen bg-black bg-opacity-50">
                <Outlet />
            </div>
        </div>
    )
}