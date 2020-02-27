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
       return fetch('http://api.symfony-3.dev/app_dev.php/posts', {
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
