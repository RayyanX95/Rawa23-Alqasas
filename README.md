# Challenges

* make video player responsive for all sizes, especially when playing on mobile in [portrait] and then turn the mobile screen to [window] mode to was challenging to me to change the size of player automatically regarding to mobile screen mode. I could overcome this challenge by adding (event listener to the size)[ff], the next code show my solution:

``` js
  componentDidMount = () => {
      window.addEventListener("resize", this.updateDimensions);
  }
  componentDidUpdate = () => {
      window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
      this.setState({
          height: window.innerHeight,
          width: window.innerWidth
      });
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
  }
```

