var { LeftNav, FlatButton, FontIcon } = MUI;
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

  menuChange: function(event, selectedIndex, menuItem){
    switch (menuItem.route) {
      case "logout":
        Meteor.logout();
        FlowRouter.go('/');
        FlowRouter.reload();
        break;
      case "home":
        FlowRouter.go('/');
        break;
      default:
        console.log("Sorry! No matches to switch...");
    }
  },

  render: function(){

    // <MenuItem index={0} primaryText="Home" leftIcon={<FontIcon className="fa fa-home" />} />
    // <MenuItem index={1} primaryText="Screens" leftIcon={<FontIcon className="fa fa-tv" />} />
    // <MenuItem index={2} primaryText="Circles" leftIcon={<FontIcon className="fa fa-sun-o" />} />
    // <MenuItem index={3} primaryText="Help" leftIcon={<FontIcon className="fa fa-question" />} />
    // <MenuItem index={4} primaryText="Feedback" leftIcon={<FontIcon className="fa fa-angelist" />} />
    // <MenuItem index={5} primaryText="Logout" leftIcon={<FontIcon className="fa fa-power-off" />} />

    var navMenuItems = [
      (<MenuItem index={0} primaryText="Home" leftIcon={<FontIcon className="fa fa-home" />} />),
      (<MenuItem index={1} primaryText="Screens" leftIcon={<FontIcon className="fa fa-tv" />} />),
      (<MenuItem index={2} primaryText="Circles" leftIcon={<FontIcon className="fa fa-sun-o" />} />),
      (<MenuItem index={3} primaryText="Help" leftIcon={<FontIcon className="fa fa-question" />} />),
      (<MenuItem index={4} primaryText="Feedback" leftIcon={<FontIcon className="fa fa-angelist" />} />),
      (<MenuItem index={5} primaryText="Logout" leftIcon={<FontIcon className="fa fa-power-off" />} />)
    ];

    return (
      <LeftNav
        ref="SideNav"
        header={ this.renderHeader() }
        docked={false}
        onChange={this.menuChange}
        disableSwipeToOpen={true}
        openRight={true}
        menuItems= { navMenuItems }
        />
    )
  },

  renderHeader: function(){
    var styles = {
      headerContainer: {
        backgroundColor: "#1690DB",
        width: "100%",
        minHeight: "64px",
        overflow: "hidden",
        color: "#fff",
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
        <div style={ styles.headerContainer }>
          <h2 style={ styles.headerTitle }>frolic</h2>
        </div>
      </div>
    );
  }
})
