var {
  Avatar,
  LeftNav,
  FlatButton,
  FontIcon,
  List,
  ListItem
} = MUI;
var MenuItem = MUI.Libs.MenuItem;

SideNav = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    selectedItem: React.PropTypes.object,
    items: React.PropTypes.array,
    show: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      selectedItem: {},
      items: [],
      show: false
    };
  },
  getInitialState: function(){
    return {}
  },

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  // componentWillMount: function(){},

  componentWillUpdate: function(nextProps, nextState){
    console.log("sidenav updated...");
    if(nextProps.show != this.props.show){
      console.log("sidenav toggle...");
      this.refs.SideNav.toggle();
    }
  },

  menuChange: function(navItem){
    // console.log("menuChange selected index " + navItem.index);
    Session.set('sideNav', false);
    if(navItem.route){
      FlowRouter.go(navItem.route);
    }
  },

  _handleSideHeader: function(){
    FlowRouter.go('/profile/'+this.data.currentUser._id);
    Session.set('sideNav', false);
  },

  render: function(){
    console.log("SideNav render...");

    var navList = [
      { 'label' : "Home", 'class': "fa fa-home snav-icon", 'route': "/" },
      { 'label' : "Notifications", 'class': "fa fa-bell-o snav-icon", 'route': "/notify"},
      { 'label' : "Messages", 'class': "fa fa-envelope snav-icon", 'route': "/messages" },
      { 'label' : "Screens", 'class': "fa fa-film snav-icon", 'route': "/screens"},
      { 'label' : "Circles", 'class': "fa fa-sun-o snav-icon", 'route': "/circles" },
      { 'label' : "Settings", 'class': "fa fa-gear snav-icon", 'route': "/settings" },
      { 'label' : "Feedback", 'class': "fa fa-angellist snav-icon", 'route': "/feedback" },
      { 'label' : "Help & Support", 'class': "fa fa-question snav-icon", "route": "/help" },
      { 'label' : "Logout", 'class': "fa fa-power-off snav-icon", "route": "/logout" }
    ];

    var styles = {
      navItem: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        lineHeight: "14px",
        color: "#fff",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)"
      },
      snavIcon: {
        color: "#0E496E !important",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)"
      }
    };

    // header={ this.renderHeader() }
    return (
      <LeftNav
        ref="SideNav"
        header={ this.renderHeader() }
        docked={false}
        disableSwipeToOpen={true}
        openRight={true}
        style={{"backgroundColor": APP.primary}}
      >
        <List style={{"backgroundColor": APP.primary}}>
          {
            navList.map(function(item, i){
              return <ListItem
                        leftIcon={<FontIcon className={item.class} style={styles.snavIcon}/>}
                        primaryText={item.label}
                        key={i}
                        onTouchTap={() => this.menuChange({'route': item.route, 'index': i})}
                        style={styles.navItem}
                        innerDivStyle={{paddingLeft: "48px"}}
                      />
                  }, this)
          }
        </List>
      </LeftNav>
    )
  },

  renderHeader: function(){
    var styles = {
      headerContainer: {
        backgroundColor: "#1690DB",
        width: "100%",
        minHeight: "128px",
        overflow: "hidden",
        color: "#fff",
        textAlign: "center",
        boxShadow: "0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)"
      },
      headerTitle: {
        paddingLeft: "20px"
      },
      headerActions: {
        margin: "0 auto"
      },
      addNewBtn: {
        width: "100%",
        paddingTop: "5px",
        paddingBottom: "5px"
      },
      noItem: {
        display: "block",
        textAlign: "center",
        color: "#ddd"
      },
      sidenavAvatar: {
        marginTop: "8%"
      },
      proTitle: {
        fontWeight: "normal",
        fontSize: "12px",
        color: APP.themeLite,
        textShadow: "0px 1px 0px rgba(0, 0, 0, 0.4)"
      },
      proName: {
        fontWeight: "600",
        fontSize: "14px",
        color: "#fff",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)"
      }
    };

    var noItem = null;
    if(this.props.items.length == 0){
      noItem = (
        <span style={ styles.noItem }>No Item here!</span>
      );
    }

    return (
      <div>
        <div style={ styles.headerContainer } id="sidenav-header" onClick={this._handleSideHeader}>
          <Avatar
            src={this.data.currentUser.avatar}
            size={48}
            style={styles.sidenavAvatar} />
          <div style={styles.proName}>{this.data.currentUser.profile.fullname}</div>
          <div style={styles.proTitle}>{this.data.currentUser.profile.title}</div>
        </div>
      </div>
    );
  }
})


// <MenuItem value="0" primaryText="Home" leftIcon={<FontIcon className="fa fa-home snav-icon" />} onTouchTap={this.menuChange} />
// <MenuItem value="1" primaryText="Screens" leftIcon={<FontIcon className="fa fa-film snav-icon" />} onTouchTap={this.menuChange} />
// <MenuItem value="2" primaryText="Circles" leftIcon={<FontIcon className="fa fa-sun-o snav-icon" />} />
// <MenuItem value="3" primaryText="Help" leftIcon={<FontIcon className="fa fa-question snav-icon" />} />
// <MenuItem value="4" primaryText="Feedback" leftIcon={<FontIcon className="fa fa-angellist snav-icon" />} />
// <MenuItem value="5" primaryText="Logout" leftIcon={<FontIcon className="fa fa-power-off snav-icon" />} />

    // switch (index) {
    //   case 0:
    //     FlowRouter.go('/');
    //     break;
    //   case 1:
    //     FlowRouter.go('/screens');
    //     break;
    //   case 2:
    //     FlowRouter.go('/circels');
    //     break;
    //   case 3:
    //     FlowRouter.go('/feedback');
    //     break;
    //   case 4:
    //     FlowRouter.go('/help');
    //     break;
    //   case 5:
    //     FlowRouter.go('/logout');
    //     break;
    //   default:
    //     console.log("Sorry! No matches to switch...");
    // }



// <ListItem
//   leftIcon={<FontIcon className="fa fa-home snav-icon" />}
//   primaryText="Home"
//   onTouchTap={() => this.menuChange(0)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-film snav-icon" />}
//   primaryText="Screens"
//   onTouchTap={() => this.menuChange(1)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-sun-o snav-icon" />}
//   primaryText="Circles"
//   onTouchTap={() => this.menuChange(2)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-angellist snav-icon" />}
//   primaryText="Feedback"
//   onTouchTap={() => this.menuChange(3)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-question snav-icon" />}
//   primaryText="Help"
//   onTouchTap={() => this.menuChange(4)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-power-off snav-icon" />}
//   primaryText="Logout"
//   onTouchTap={() => this.menuChange(5)}
// />
