import React from 'react';
import './App.css';
 import LogIn from './components/log-in/log-in.component';
 import SignUp from './components/sign-up/sign-up.component';

function App() {
//   useEffect(() => {
//     const sayHello = async () => {
//       let todo = {
//         title: "impsum doloris",

//     };
//     fetch('api/customer/618c22204b8153d5f2bf45f5', {
//         method: 'PUT',
//         body: JSON.stringify(todo),
//         headers: { 'Content-Type': 'application/json' }
//     }).then(res => res.json())
//       .then(json => console.log(json));
//     };
//     sayHello();
// }, []);
  return (
    <div className="App">
      { 
     // <LogIn />
      <SignUp /> 
    }
    </div>
  );
}

export default App;
