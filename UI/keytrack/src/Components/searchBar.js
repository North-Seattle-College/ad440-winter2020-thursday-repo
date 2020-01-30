//same as home
import React from 'react';

const Home = (props) => {
    return (
        <div className="main-content">
            <div className="container">
                <h2>{props.title}</h2>
                <div className="home-image"></div>
                <div className="thumbnail-container">
                    <div className="home-thumbnail-1"></div>
                    <div className="home-thumbnail-2"></div>
                    <div className="home-thumbnail-3"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;


// import React, {Component} from 'react';
// import FilterResults from 'react-filter-search';
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       value: ''
//     };
//   }
//   componentWillMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(json => this.setState({ data: json }));
//   }
//   handleChange = event => {
//     const { value } = event.target;
//     this.setState({ value });
//   };
//   render() {
//     const { data, value } = this.state;
//     return (
//       <div>
//         <input type="text" value={value} onChange={this.handleChange} />
//         <SearchResults
//           value={value}
//           data={data}
//           //array of objects
//           renderResults={results => (
//             <div>
//               {results.map(el => (
//                 <div>
//                   <span>{el.name}</span>
//                   <span>{el.email}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         />
//       </div>
//     );
//   }
// }
