import fetch from 'isomorphic-fetch';

// componentDidMount() {
//        fetch('http://jsonplaceholder.typicode.com/users')
//        .then(res => res.json())
//        .then((data) => {
//          this.setState({ contacts: data })
//        })
//        .catch(console.log)
//      }
//      ...
//    }
   export function createBlogPost(data) {
       return fetch('https://github.com/North-Seattle-College/ad440-winter2020-thursday-repo/wiki/API-POST-Property, {
           method: 'POST',
           mode: 'CORS',
           body: JSON.stringify(data),
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(res => {
           return res;
       }).catch(err => err);
   }
