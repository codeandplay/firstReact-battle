var React = require("react");
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');


require('./index.css');

// state
// lifecycle event
// UI
//
class Badge extends React.Component{
  render () {
    return (
      <div>
        <img
          src={this.props.img}
          alt='Avatar'
          style={{width:100, height:100}}
        />
        <h1>Name: {this.props.property}</h1>
        <h3>Username: {this.props.username}</h3>
      </div>
    )
  }
}

Badge.propTypes = {
  img: PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  username:PropTypes.string.isRequired
}

/*
 * 1. Implicit Binding
 * 2. Explicit Binding
 * 3. new Binding
 * 4. Window Binding
 */

// Implicit Binding
// Left of the dot at call time
var me = {
  name: 'Tyler',
  age: 25,
  sayName: function(){
    console.log(this.name);
  }
}

me.sayName();

// Explicit Binding
// call, apply and bind
var sayName = function(lang1, lang2, lang3){
  console.log('My name is ' + this.name + 'and I know ' + lang1 + ', ' + lang2 + ', ' + lang3);
};

var stacey = {
  names: 'Stacey'
};

var languages = ['Javascript', 'Ruby', 'Python'];

// call - take argument one by one
sayName.call(stacey, languages[0], languages[2], languages[3]);

// apply - can accept array for multiple arguments
sayName.apply(stacey, languages);

// bind - same as call, except it return the binded function, instead of invoking it.
var newFunc = sayName.bind(stacey, languages[0], languages[1], languages[3]);
console.log(newFunc);
newFunc();
newFunc('test', 'test2', 'test3');

// new Binding
// Bond to the new object created
var Animal = function(color, name, type){
  this.color = color;
  this.name = name;
  this.type = type;
}

var zebra = new Animal('Black and white', 'zoro', 'zebra')
console.log(zebra.name);
var tiger = new Animal('Orange and black', 'tyler', 'tiger')
console.log(tiger.name);

// Window Binding
var sayName = function(){
  console.log(this.age);
};

window.age = 35;
sayName();

ReactDOM.render(
  <Badge img="https://avatars0.githubusercontent.com/u/2933430?v3&s=460"
    name='Tyler Mcginnis'
    username='tylermcginies'
  />,
  document.getElementById('app')
);
