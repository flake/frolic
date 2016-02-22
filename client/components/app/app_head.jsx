// injectTapEventPlugin();

APP = {
  primary: "#1690DB",
  secondary: "#48A1D9",
  paper: "#24242B",
  themeGrey: "#A3C3D6",
  themeBg: "#C3D7E3",
  themeLite: "#D4EEFF",
  themeRed: "#ED2B2B"
};

AIMG = {
  avatar: '/img/defaultAvatar.png',
  cover: '/img/frocover.jpg'
};

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

lightTheme = ThemeManager.getMuiTheme(MUI.Styles.LightRawTheme);
newTheme = ThemeManager.modifyRawThemePalette(lightTheme, appPalette);
//ThemeManager.setTheme(ThemeManager.types.LIGHT);
// ThemeManager.setPalette(appPalette);

var {
  AppBar,
  IconMenu,
  IconButton,
  FontIcon,
  Badge
} = MUI;
MenuItem = MUI.Libs.MenuItem;
//mui.Libs.MenuDivider

AppHead = React.createClass({
  PropTypes: {
    appTitle: React.PropTypes.string,
    navIcons : React.PropTypes.array,
    hasSideNav: React.PropTypes.bool,
    sideNav: React.PropTypes.bool,
    notify: React.PropTypes.number
  },

  getDefaultProps: function(){
    return {
      appTitle: 'frolic',
      navIcons: [
        {"id": "frolic-search", "class": "material-icons", "maticon": "search"},
        {"id": "frolic-notify", "class": "material-icons", "maticon": "notifications"},
        {"id": "frolic-videocam", "class": "material-icons", "maticon": "videocam"}
      ],
      hasSideNav: true,
      sideNav: false,
      notify: 0
    };
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

  // navItems: [
  //     { route: 'home', text: 'Home'},
  //     { route: 'screens', text: 'Screens'},
  //     { route: 'circles', text: 'Circles'},
  //     { route: 'help', text: 'Help'},
  //     { route: 'feedback', text: 'Feedback'},
  //     { route: 'logout', text: 'Logout'}
  //   ],

  render: function(){
    var styles = {
      navIcon: {
        color: "#fff"
      },
      navPaper: {
        marginRight: "16px"
      },
      badge:{
        padding: "0"
      },
      badgeCount: {
        color: "#fff",
        backgroundColor: "#ED2B2B",
        borderRadius: "4px",
        width: "18px",
        right: "6px"
      },

    };

    // <IconButton iconClassName="material-icons" iconStyle={{color: "#fff"}} id="navicon-right">menu</IconButton>

    var iconLeft = (<IconButton iconClassName="material-icons" id="navigation-back" iconStyle={{color: "#fff"}}>arrow_back</IconButton>);

    // var iconRight = (
    //   <div zDepth={0} style={styles.navPaper}>
    //     {
    //       this.props.navIcons.map(function(navicon, i){
    //         return <IconButton key={i} iconClassName={navicon.class} iconStyle={styles.navIcon} id={navicon.id} >{navicon.maticon}</IconButton>
    //       })
    //     }
    //   </div>
    // );

    var curRoute = FlowRouter.current();
    if(curRoute.route.path === '/'){
      iconLeft = (<div></div>);
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
                  if(navicon.id === "frolic-notify" && this.props.notify > 0){
                    return <Badge key={i} style={styles.badge} badgeStyle={styles.badgeCount} badgeContent={this.props.notify} ><IconButton iconClassName={navicon.class} iconStyle={styles.navIcon} id={navicon.id} >{navicon.maticon}</IconButton></Badge>
                  }
                  return <IconButton key={i} iconClassName={navicon.class} iconStyle={styles.navIcon} id={navicon.id} >{navicon.maticon}</IconButton>
                }, this)
              }
              {
                (() => {
                  if(this.props.hasSideNav){
                    return <IconButton iconClassName="material-icons" iconStyle={{color: "#fff"}} id="navicon-right">menu</IconButton>
                  }
                })()
              }
            </div>
          } />
        {
          (() => {
            if(this.props.hasSideNav){
              return <SideNav show={this.props.sideNav} />
            }
          })()
        }
      </div>
    )
  }
})


// {
//   (() => {
//     if(this.props.SideNav){
//       return <IconButton iconClassName="material-icons" iconStyle={{color: "#fff"}} id="navicon-right">menu</IconButton>
//     }
//   })()
// }

// {
//   (() => {
//     if(this.props.SideNav){
//       return <SideNav show={this.props.sideNav} />
//     }
//   })()
// }
