import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";

const AccountContext = createContext();

const Account = props => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: err => {
          console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        }
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
// import React from 'react';
// import './Account.css';

/**
 * Component to display and possibly update user account information
 *
 * Required props: none
 *
 * Accepted props: none
 *
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
// export default function Account() {
//   return(
//     <div>
//       <h2>Account information</h2>
//     </div>
//   );
// }

// import React from 'react';

// const Home = (props) => {
//     return (
//         <div className="main-content">
//             <div className="container">
//                 <h2>{props.title}</h2>
//                 <div className="home-image"></div>
//                 <div className="thumbnail-container">
//                     <div className="home-thumbnail-1"></div>
//                     <div className="home-thumbnail-2"></div>
//                     <div className="home-thumbnail-3"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
