var {
  Popover,
  Avatar,
  FontIcon
} = MUI;

FroPop = React.createClass({
  propTypes: {
    open: React.PropTypes.bool,
    anchor: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      open: false,
      anchor: null
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

  _closeModal: function(){
    Session.set('optsOpen', false);
  },

  render: function(){

    var styles = {
      optsBody: {
        padding: "16px"
      },
      modalIcon: {
        color: APP.primary,
        fontSize: "21px",
        padding: "8px 4px",
        width: "21px",
        height: "21px"
      },
      modalItem: {
        padding: "12px 8px 12px 48px"
      }
    };

    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchor} >
        <div>
          <Avatar icon={<FontIcon className="fa fa-video-camera" />} />
          <Avatar
            icon={<FontIcon className="fa fa-upload" />} />
        </div>
      </Popover>
    )
  }
});
