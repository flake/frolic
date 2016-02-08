// const VScroll = BlazeToReact('vscroll');

Swipeables = React.createClass({
  propTypes: {
    index: React.PropTypes.number
  },
  getDefaultProps: function(){
    return {
      index: 0
    }
  },
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme //Manager.getMuiTheme(MUI.Styles.LightRawTheme)
    }
  },

  _handleChangeSlide: function(index, fromIndex){
    Session.set("slideIndex", index);
  },

  render: function(){
    var styles = {
      container: {
        height: "100%"
      }
    };

    return (
      <div>
        <ReactSwipe
          slideToIndex={this.props.index}
          callback={this._handleChangeSlide} >
          <div>
            <h1>Slide 1</h1>
          </div>
          <div>
            <h1>Slide 2</h1>
          </div>
          <div>
            <h1>Slide 3</h1>
          </div>
        </ReactSwipe>
      </div>
    );
  }
});
