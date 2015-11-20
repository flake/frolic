injectTapEventPlugin();

ThemeManager = MUI.Styles.ThemeManager;
appPalette = {
  primary1Color: "#1690DB",
  primary2Color: "#2173B3",
  primary3Color: "#A9D2EB",
  accent1Color: "#1690DB",
  accent2Color: "#ED2B2B",
  accent3Color: "#F58C8C",
  textColor: 'rgba(0, 0, 0, 0.87)',
  canvasColor: '#ffffff',
  borderColor: '#e0e0e0',
};
APP = {
  primary: "#1690DB",
  secondary: "#2173B3",
  themeGrey: "#A3C3D6",
  themeBg: "#C3D7E3"
}

lightTheme = ThemeManager.getMuiTheme(MUI.Styles.LightRawTheme);
newTheme = ThemeManager.modifyRawThemePalette(lightTheme, appPalette);
//ThemeManager.setTheme(ThemeManager.types.LIGHT);
// ThemeManager.setPalette(appPalette);

var {AppBar, IconMenu, IconButton} = MUI;
MenuItem = MUI.Libs.MenuItem;
//mui.Libs.MenuDivider

AppHead = React.createClass({
  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  navItems: [
      { route: 'screens', text: 'Screens'},
      { route: 'circles', text: 'Circles'},
      { route: 'help', text: 'Help'},
      { route: 'feedback', text: 'Feedback'},
      { route: 'logout', text: 'Logout'}
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
