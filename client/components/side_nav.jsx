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

  componentWillMount: function(){},

  componentWillUpdate: function(nextProps, nextState){
    if(nextProps.show != this.props.show){
      this.refs.SideNav.toggle();
    }
  },

  menuChange: function(index){
    // var eout = $(event.target).parent().attr('data-reactid');
    console.log("menuChange selected index " + index);
    // prettyJSON(event.target);

    switch (index) {
      case 0:
        FlowRouter.go('/');
        break;
      case 1:
        FlowRouter.go('/screens');
        break;
      case 2:
        FlowRouter.go('/circels');
        break;
      case 3:
        FlowRouter.go('/feedback');
        break;
      case 4:
        FlowRouter.go('/help');
        break;
      case 5:
        FlowRouter.go('/logout');
        break;
      default:
        console.log("Sorry! No matches to switch...");
    }

    Session.set('sideNav', false);
  },

  render: function(){

    // <MenuItem value="0" primaryText="Home" leftIcon={<FontIcon className="fa fa-home snav-icon" />} onTouchTap={this.menuChange} />
    // <MenuItem value="1" primaryText="Screens" leftIcon={<FontIcon className="fa fa-tv snav-icon" />} onTouchTap={this.menuChange} />
    // <MenuItem value="2" primaryText="Circles" leftIcon={<FontIcon className="fa fa-sun-o snav-icon" />} />
    // <MenuItem value="3" primaryText="Help" leftIcon={<FontIcon className="fa fa-question snav-icon" />} />
    // <MenuItem value="4" primaryText="Feedback" leftIcon={<FontIcon className="fa fa-angellist snav-icon" />} />
    // <MenuItem value="5" primaryText="Logout" leftIcon={<FontIcon className="fa fa-power-off snav-icon" />} />

    var navList = [
      { 'label' : "Home", 'class': "fa fa-home snav-icon" },
      { 'label' : "Screens", 'class': "fa fa-tv snav-icon" },
      { 'label' : "Circles", 'class': "fa fa-sun-o snav-icon" },
      { 'label' : "Messages", 'class': "fa fa-envelope snav-icon" },
      { 'label' : "Settings", 'class': "fa fa-gear snav-icon" },
      { 'label' : "Feedback", 'class': "fa fa-angellist snav-icon" },
      { 'label' : "Help & Support", 'class': "fa fa-question snav-icon" },
      { 'label' : "Logout", 'class': "fa fa-power-off snav-icon" }
    ];

    return (
      <LeftNav
        ref="SideNav"
        header={ this.renderHeader() }
        docked={false}
        disableSwipeToOpen={true}
        openRight={true}
      >
        <List>
          {
            navList.map(function(item, i){
              return <ListItem
                        leftIcon={<FontIcon className={item.class} />}
                        primaryText={item.label}
                        key={i}
                        onTouchTap={() => this.menuChange(i)}
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
        <div style={ styles.headerContainer } id="sidenav-header">
          <Avatar
            src="img/fravatar.jpg"
            size={56}
            style={styles.sidenavAvatar} />
          <div>{Meteor.user().profile.name}</div>
        </div>
      </div>
    );
  }
})




// <ListItem
//   leftIcon={<FontIcon className="fa fa-home snav-icon" />}
//   primaryText="Home"
//   onTouchTap={() => this.menuChange(0)}
// />
// <ListItem
//   leftIcon={<FontIcon className="fa fa-tv snav-icon" />}
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
