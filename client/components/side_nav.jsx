var { LeftNav, FlatButton, FontIcon } = MUI;

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
        FlowRouter.reload();
        break;
      default:
        console.log("Sorry! No matches to switch...");
    }
  },

  render: function(){
    return (
      <LeftNav ref="SideNav" header={ this.renderHeader() } menuItems={this.props.items} docked={false} onChange={this.menuChange} disableSwipeToOpen={true} openRight={true}/>
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
