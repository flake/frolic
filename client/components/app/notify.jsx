var {
  Card,
  ListItem,
  Avatar
} = MUI;

Notify = React.createClass({
  propTypes: {
    fromUser: React.PropTypes.object,
    notify: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      fromUser: {},
      notify: {}
    }
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

  _handleNotify: function(){
    Meteor.call('notifyRead', this.props.notify._id, function(){});
    FlowRouter.go(this.props.notify.target);
  },

  render: function(){
    var notifyRead = (this.props.notify.read) ? APP.themeBg : "#FFF";
    var styles = {
      notifyItem: {
        backgroundColor: notifyRead
      },
      fromUser: {
        color: APP.secondary
      },
      notifyMsg:{
        display: "block"
      }
    };

    return (
      <Card style={styles.notifyItem}>
        <ListItem
          leftAvatar={<Avatar src="/img/fravatar.jpg"/>}
          primaryText={<div style={styles.notifyMsg}><span style={styles.fromUser}>{this.props.fromUser.profile.name}</span> {this.props.notify.message} </div>}
          secondaryText={this.props.notify.when}
          onTouchTap={this._handleNotify}/>
      </Card>
    )
  }
})

// <List subheader="Notifications" >
//   {
//     this.props.notifys.map(function(notify, i){
//       var notifyStyle = notify.read ? "none" : APP.themeBg;
//       return <ListItem style={{"backgroundColor" : notifyStyle}}>{notify.fromId} {notify.verb}</ListItem>
//     })
//   }
// </List>
