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

var {AppBar, IconMenu, IconButton, FontIcon} = MUI;
MenuItem = MUI.Libs.MenuItem;
//mui.Libs.MenuDivider

AppHead = React.createClass({
  PropTypes: {
    appTitle: React.PropTypes.string,
    navIcons : React.PropTypes.Array
  },

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme
    };
  },

  // _handleLeftIconTap: function(event){
  //   console.log("back btn event ");
  //   FlowRouter.history.back();
  // },

  navItems: [
      { route: 'home', text: 'Home'},
      { route: 'screens', text: 'Screens'},
      { route: 'circles', text: 'Circles'},
      { route: 'help', text: 'Help'},
      { route: 'feedback', text: 'Feedback'},
      { route: 'logout', text: 'Logout'}
    ],

  render: function(){

    var iconLeft = (<IconButton iconClassName="material-icons" id="navigation-back" iconStyle={{color: "#fff"}}>arrow_back</IconButton>);
    var styles = {
      navIcon: {
        color: "#fff"
      }
    };
    
    return (
      <div>
        <AppBar
          title={this.props.appTitle}
          iconElementLeft={iconLeft}
          iconElementRight={
            <div zDepth={0}>
              {
                this.props.navIcons.map(function(navicon, i){
                  return <IconButton key={i} iconClassName={navicon.class} iconStyle={styles.navIcon} id={navicon.id}>{navicon.maticon}</IconButton>
                })
              }
              <IconButton iconClassName="material-icons" iconStyle={{color: "#fff"}} id="navicon-right">menu</IconButton>
            </div>
          } />
        <SideNav show={this.props.sideNav} items={ this.navItems } />
      </div>
    )
  }
})
