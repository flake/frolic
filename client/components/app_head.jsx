appPalette = {
  primary1Color: "#1690DB",
  primary2Color: "#2173B3",
  primary3Color: "#A9D2EB",
  accent1Color: "#ED3B3B",
  accent2Color: "#ED2B2B",
  accent3Color: "#F58C8C",
  textColor: 'rgba(0, 0, 0, 0.87)',
  canvasColor: '#ffffff',
  borderColor: '#e0e0e0',
};

ThemeManager = new mui.Styles.ThemeManager();
ThemeManager.setTheme(ThemeManager.types.LIGHT);
ThemeManager.setPalette(appPalette);

injectTapEventPlugin();

var {AppBar, IconMenu, IconButton} = mui;
//mui.Libs.Menu
var MenuItem = mui.MenuItem;
//mui.Libs.MenuDivider

AppHead = React.createClass({
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  navItems: [
      { route: 'channels', text: 'Channels'},
      { route: 'subscribes', text: 'Subscribes'},
      { route: 'help', text: 'Help'},
      { route: 'feedback', text: 'Feedback'}
    ],

  render: function(){
    var iconBtnElem = (<IconButton iconClassName="material-icons" iconStyle={ {color: "#fff"} }>more_vert</IconButton>);

    return (
      <div>
        <AppBar
          title={this.props.appTitle}
          onLeftIconButtonTouchTap={ SideNavActions.toggle }
          iconElementRight={
            <paper zDepth={0}>
              <IconButton iconClassName="material-icons" iconStyle={ {color: "#fff"} }>search</IconButton>
              <IconButton iconClassName="material-icons" iconStyle={ {color: "#fff"} } id="cam-record">videocam</IconButton>
              <IconMenu iconButtonElement= {iconBtnElem} >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Search" />
                <MenuItem primaryText="Find friends" />
                <MenuItem primaryText="Settings" />
              </IconMenu>
            </paper>
          } />
        <SideNav show={this.props.sideNav} items={ this.navItems } />
      </div>
    )
  }
})
