// import React from "react";
// import { Link } from "react-router-dom";
// import "./HomePage.css";
// import gomuko from "../Images/gom4.jpeg";

// const Homepage = () => {
//   return (
//     <div className="body" style={{ height: "100vh" }}>
//       <div className="container">
//         <div >
//           <div style={{ marginTop: "20px" }}>
//             <h1 style={{ color: "white" }}>
//               Welcome to Play
//             </h1>
//             <img
//               class="img-responsive"
//               src={gomuko}
//               alt="Gomukoo"
//               id="logo"
//             />
//             <div class="center-container">
//               <Link to="/board">
//                 <button className="btnd">Start</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import gomuko from "../Images/gom4.jpeg";

const Homepage = () => {
  return (
    <div className="body" style={{ height: "100vh" }}>
      <div className="container">
        <div>
          <div style={{ marginTop: "20px" }}>
            <h1 style={{ color: "white" }}>Welcome to Play</h1>
            <img className="img-responsive" src={gomuko} alt="Gomuko" id="logo" />
            <div className="center-container">
              {/* AI vs Player Option */}
              <Link to="/board?mode=ai">
                <button className="btnd">AI vs Player</button>
              </Link>
              {/* Player vs Player Option */}
              <Link to="/board?mode=player">
                <button className="btnd">Player vs Player</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
