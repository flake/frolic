var {
  Tabs,
  Tab,
  FontIcon,
  FlatButton
} = MUI;

const VScroll = BlazeToReact('vscroll');

SlideTabs = React.createClass({
  propTypes:{
    index: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  getDefaultProps: function(){
    return {
      index: 0,
      tabs: [
        {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'},
        {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'},
        {'title': 'Info', 'iconClass': 'material-icons', 'maticon': 'info_outline'}
      ]
    };
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
    return {
      ticonColor: 'rgba(255, 255, 255, 0.6)'
    };
  },

  _handleChangeTabs: function(index){
    Session.set("slideIndex", index);
  },

  render: function(){
    var tabWidth = "" + Session.get('win-width')/3;

    var styles = {
      container: {
        height: "100%"
      },
      slide: {
        height: "365px"
      },
      inkBar:{
        backgroundColor: "#fff"
      },
      tabItem: {
        width: tabWidth * this.props.tabs.length
      },
      tabsIcon: {
        height: '100%',
        display: 'inline-block',
        verticalAlign: 'middle',
        fontSize: "22px",
        lineHeight: '22px',
        color: "inherit",
        minWidth: "24px"
      }
    };

    return (
      <div>
        <Tabs
          onChange={this._handleChangeTabs}
          value={this.props.index + ''}
          inkBarStyle={styles.inkBar}
          tabItemContainerStyle={styles.tabItem}
          style={{"overflowX": "scroll"}}
          id="tabs-scroll">
          {
            this.props.tabs.map(function(tab, index){
              return (
                <Tab
                  label={
                    <div style={{"textAlign": "center"}}>
                      <div>
                        <FontIcon
                          style={styles.tabsIcon}
                          className={tab.iconClass}>{tab.maticon}</FontIcon>
                      </div>
                      <div>{tab.title}</div>
                    </div>
                  }
                  value={""+index}
                  width={"" + tabWidth}
                  key={index}
                  className="sliding-tab" />
              )
            })
          }
        </Tabs>
      </div>
    );
  }
});

// <SwipeableViews
//   index={this.props.index}
//   onChangeIndex={this._handleChangeSlide}
//   style={styles.container} >
//   {
//     this.props.views.map(function(slide, index){
//       return (
//         <div style={styles.slide} className="tab-slides" key={index}>
//           <VScroll page={slide.template} data={slide.data} />
//         </div>
//       )
//     })
//   }
// </SwipeableViews>

// <FlatButton
//   secondary={true}
//   label={tab.title}
//   labelPosition="after" >
//   <FontIcon
//     style={Styles.tabIcon}
//     className={tab.iconClass}>{tab.maticon}</FontIcon>
// </FlatButton>
