// 1.class
// import React, { Component } from 'react';

// const URL = "https://et3alem-w-etrafah.firebaseio.com/seriesInfo.json";

// class NormalClass extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//     }

//     componentDidMount() {
//         document.title = `You clicked ${this.state.count} times`;

//         fetch(URL)
//             .then(res => res.json())
//             .then(parsedRes => {
//                 console.log("parsedRes: ", parsedRes);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     componentDidUpdate() {
//         document.title = `You clicked ${this.state.count} times`;
//     }

//     render() {
//         return (
//             <div className="mt-5 pt-5 text-center" >
//                 <p style={{ color: "#FFF", fontSize: 20 }} >[Normal Class] You clicked {this.state.count} times</p>
//                 <button
//                     className="btn btn-success"
//                     onClick={() => this.setState({ count: this.state.count + 1 })}>
//                     Click me
//           </button>
//             </div>
//         );
//     }
// }

// export default NormalClass




// 1. hooks -----------------------------------------------------------------------------
// Use Multiple Effects to Separate Concerns

import React, { useState, useEffect } from 'react';

const URL = "https://et3alem-w-etrafah.firebaseio.com/seriesInfo.json";

function Hooks() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`; // 
    }, [count]);

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(parsedRes => {
                console.log("parsedRes: ", parsedRes);
            })
            .catch(err => {
                console.log(err);
            });
    });


    return (
        <div className="mt-5 pt-5 text-center" >
            <p style={{ color: "#FFF", fontSize: 20 }} >[Hooks] You clicked {count} times</p>
            <button
                className="btn btn-success"
                onClick={() => setCount(count + 1)}>
                Click me
      </button>
        </div>
    );
}

export default Hooks




// fetch(URL)
//     .then(res => res.json())
//     .then(parsedRes => {
//         console.log("parsedRes: ", parsedRes);
//     })
//     .catch(err => {
//         console.log(err);
//     });



// useEffect(() => {
//     fetch(URL)
//         .then(res => res.json())
//         .then(parsedRes => {
//             console.log("parsedRes: ", parsedRes);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }