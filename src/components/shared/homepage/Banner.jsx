import React from 'react';
import bookImg from "../../../assets/hero_img.jpg"

const banner = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-[75vh] rounded-2xl my-8 max-w-292 m-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className='rounded-2xl w-xl'
                alt="hero image"
                src={bookImg}
                />
                <div className="max-w-125 space-y-9">
                <h1 className="text-5xl font-bold">Books to freshen up your bookshelf</h1>
                <button className="btn btn-success">View the list</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default banner;