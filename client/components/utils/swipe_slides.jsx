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

  componentDidUpdate: function(prevProps, prevState){
    console.log("Swipes prevProps " + prevProps);
  },

  _handleChangeSlide: function(index){
    Session.set("slideIndex", index);

    var stabs = $('.sliding-tab');
    var tabCount = stabs.length;

    if(tabCount){
      var offset = $(stabs[index]).offset();
      var width = $(window).width();
      var tabWidth = width / tabCount;
      var hidRight = (offset.left + tabWidth) > width;
      var hidLeft = offset.left < 0;

      console.log("handle change slide " + offset.left);
      if(hidRight || hidLeft){
        console.log("animating tabs...");
        $('#tabs-scroll').animate({
          scrollLeft: offset.left
        }, 500);
      }
    }
  },

  render: function(){
    var styles = {
      container: {
        height: "100%"
      },
      slide: {
        // height: "365px"
      }
    };

    return (
      <div>
        <SwipeableViews
          index={this.props.index}
          onChangeIndex={this._handleChangeSlide}
          style={styles.container}
          resistance={true}>
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
