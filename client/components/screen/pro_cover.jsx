var {
  CardMedia,
  CardTitle,
  Avatar,
  ListItem,
  RaisedButton,
  FontIcon,
  IconButton
} = MUI;

ProCover = React.createClass({
  propTypes: {
    screen: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      screen: {
        title: 'Set Title',
        description: 'Description ...',
        cover: () => {return AIMG.cover;},
        avatar: () => {return AIMG.cover;}
      }
    }
  },

  //IMPORTANT SET CHILD CONTEXT
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function(){
    return {
      muiTheme: newTheme //Manager.getMuiTheme(MUI.Styles.LightRawTheme)
    };
  },
  getInitialState: function(){
    return { }
  },

  _handleFollow: function(event){
    // console.log("screen page follow tap ");
    if(this.props.screen.isFollower()){
      Meteor.call('unfollow', this.props.screen._id, function(){});
    }else{
      Meteor.call('followScreen', this.props.screen._id, function(){});
    }
  },

  _handleEdit: function(event){
    console.log("handle Edit");
    // FlowRouter.go('/screen/edit/' + this.props.screen._id);
  },

  render: function(){

    var styles = {
      cover: {
        height: "204px",
        maxHeight: "204px",
        backgroundColor: "#000"
      },
      avatar: {
        border: "2px solid " + APP.themeLite,
        top: '-36px',
        left: "8px"
      },
      img: {
        height: "100%",
        width: "100%"
      },
      listInnerDiv:{
        color: "#fff",
        padding: '8px 72px'
      },
      followIcon: {
        fontSize: "16px",
        color: "#fff",
        top: "3px"
      },
      followRaised: {
        // borderRadius: "18px",
      	lineHeight: "28px",
      	height: "28px",
        minWidth: "64px",
      	width: "88px",
      	margin: "8px",
        backgroundColor: APP.primary,
        top: '4px',
        padding: "0 4px"
      },
      followLabel: {
        fontSize: "10px",
        fontWeight: "600",
        padding: "0",
        paddingLeft: "6px",
        top: "-1px"
      },
      editScreen:{
        position: 'absolute',
        top: 0,
        right: 0,
        margin: '8px 18px'
      },
      editIcon:{
        color: '#fff',
        zIndex: 89,
        fontSize: "21px",
        padding: '4px',
        borderRadius: '32px',
        backgroundColor: APP.primary
      }
    };

    // var overlay = (
    //   <CardTitle
    //     title={this.props.screen.title}
    //     subtitle={this.props.screen.description}
    //     style={{padding: "8px", paddingTop: "0"}}
    //   />);

    var avatar = (
      <Avatar
        src={this.props.screen.avatar()}
        size={56}
        style={styles.avatar}
      />);

    var followLabel = this.props.screen.isFollower() ? "Un Follow" : "Follow";
    var followIcon = this.props.screen.isFollower() ? "stop_screen_share" : "screen_share";
    console.log("pro cover follow label: %s & icon: %s ", followLabel, followIcon);
    var rightIconBtn = (
      <div style={{"top": "0px"}}>
        {
          (() => {
            if(!this.props.screen.isOwner()){
              return (
                <RaisedButton
                  secondary={true}
                  label={followLabel}
                  labelPosition="after"
                  style={styles.followRaised}
                  labelStyle={styles.followLabel}
                  className="follow-raised"
                  onTouchTap={this._handleFollow} >
                  <FontIcon
                    style={styles.followIcon}
                    className="material-icons">{followIcon}</FontIcon>
                </RaisedButton>
              );
            }
          })()
        }
      </div>
    );

    var description = (
      <div style={{"color": "#fff"}}>{this.props.screen.description}</div>
    );

    var overCard = (
      <ListItem
        primaryText={this.props.screen.title}
        secondaryText={description}
        leftAvatar={avatar}
        rightIconButton={rightIconBtn}
        disabled={true}
        innerDivStyle={styles.listInnerDiv}
        style={{"color": "#fff"}}
      />
    );

    return (
      <div>
        <CardMedia
          overlay={overCard}
          mediaStyle={styles.cover}
          onTouchTap={this._handleEdit}
        >
          <img src={this.props.screen.cover()} style={styles.img}/>
        </CardMedia>
        {
          (() => {
            if(this.props.screen.isOwner()){
              return (
                <div style={styles.editScreen}>
                  <i className="fa fa-gear"
                    style={styles.editIcon}
                    id="edit-screen" />
                </div>
              );
            }
          })()
        }
      </div>
    )
  }
});

// <IconButton
//   iconClassName="fa fa-gear"
//   iconStyle={styles.editIcon}
//   onTouchTap={this._handleEdit}
//   id='edit-screen' />
