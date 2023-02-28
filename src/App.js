import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponents from './components/MyComponents';
import React from 'react';

class App extends React.Component {

  render() {
    return (
      <>
        <MyComponents />
      </>
    )
  }
}
export default App;
