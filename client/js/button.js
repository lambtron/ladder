import {component,dom} from 'deku';

let Button = component({
  onClick(e) {
    console.log('Clicked!');
  },
  render() {
    return dom('button', { onClick: this.onClick }, 'Click me');
  }
});

export Button;