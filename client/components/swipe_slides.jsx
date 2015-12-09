const VScroll = BlazeToReact('vscroll');

SwipeSlides = React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    views: React.PropTypes.array
  },
  getDefaultProps: function(){
    return {
      index: 0,
      views: []
    }
  },

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme //Manager.getMuiTheme(MUI.Styles.LightRawTheme)
    };
  },
  getInitialState: function(){
    return { };
  },

  _handleChangeSlide: function(index){
    console.log("slide changed index: " + index);
  },

  render: function(){
    var styles = {
      container: {
        height: "100%"
      },
      slide: {
        height: "365px"
      }
    };

    return (
      <div>
        <SwipeableViews
          index={this.props.index}
          onChangeIndex={this._handleChangeSlide}
          style={styles.container}>
          {
            this.props.views.map(function(slide, index){
              return (
                <div style={styles.slide} className="tab-slides" key={index}>
                  <VScroll page={slide.template} data={slide.data} />
                </div>
              )
            })
          }
        </SwipeableViews>
      </div>
    )
  }
});
