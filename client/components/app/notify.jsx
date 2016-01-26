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

  render: function(){
    var styles = {
      fromUser: {
        color: APP.secondary
      },
      notifyMsg:{
        display: "block"
      }
    };

    return (
      <Card>
        <ListItem
          leftAvatar={<Avatar src="/img/fravatar.jpg"/>}
          primaryText={<div style={styles.notifyMsg}><span style={styles.fromUser}>{this.props.fromUser.profile.fullname}</span> {this.props.notify.message} </div>}
          secondaryText={this.props.notify.when}
          onTouchTap={()=>{
            FlowRouter.go(this.props.notify.target);
          }}/>
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
