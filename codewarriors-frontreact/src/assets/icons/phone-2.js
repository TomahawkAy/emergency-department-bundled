import React from 'react';

function Phone2(props) {
    const title = props.title || "phone Call";
    const height= props.height || 48;
    const width= props.width || 48;
    const fill= props.fill || "#ffffff";
    const select= props.select || "one";

    if (select === "one"){
        return (
            <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <title>{title}</title>
                <g fill={fill}>
                    <path d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49C35.1 30.6 37.51 31 40 31c1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2C21.22 42 6 26.78 6 8c0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z" fill={fill}/>
                </g>
            </svg>
        );
    }
    else{
        return (
            <svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <title>{title}</title>
                <g fill={fill}>
                    <path d="M40 31c-2.49 0-4.89-.4-7.14-1.14-.69-.22-1.48-.06-2.03.49l-4.4 4.41c-5.67-2.88-10.29-7.51-13.18-13.17l4.4-4.41c.55-.55.71-1.34.49-2.03C17.4 12.9 17 10.49 17 8c0-1.11-.89-2-2-2H8c-1.11 0-2 .89-2 2 0 18.78 15.22 34 34 34 1.11 0 2-.89 2-2v-7c0-1.11-.89-2-2-2zm-2-7h4c0-9.94-8.06-18-18-18v4c7.73 0 14 6.27 14 14zm-8 0h4c0-5.52-4.48-10-10-10v4c3.31 0 6 2.69 6 6z" fill={fill}/>
                </g>
            </svg>
        );
    }

};

export default Phone2;
