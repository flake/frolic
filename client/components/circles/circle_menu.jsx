var {
  Dialog,
  List,
  ListItem,
  Checkbox,
  FlatButton,
  FontIcon
} = MUI;

CircleMenu = React.createClass({
  PropTypes: {
    circles: React.PropTypes.array,
    open: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      circles: [],
      open: false
    };
  },

  // mixins: [ReactMeteorData],
  //
  // getMeteorData: function(){
  //   var circles = [];
  //   var handle = Meteor.subscribe('cricles', this.props.userId);
  //   if(handle.ready()){
  //     console.log("circles handle ready ");
  //     circles = Circles.find({userId: this.props.userId}).fetch();
  //   }
  //   return {
  //     loading: ! handle.ready(),
  //     circles: circles
  //   };
  // },

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
    var states = {open : false};
    this.props.circles.map(function(circle, i){
        var check = circle.isMember(Session.get('circleMember'));
        var key = circle._id;
        var state = {};
        this.states[key] = check;
        console.log("initial check " + JSON.stringify(circle));
    }, this);
    return states;
  },

  // componentWillUpdate: function(nextProps, nextState){
  //   if(nextProps.open != this.props.open){
  //     this.setState({open: nextProps.open});
  //   }
  // },

  _handleNewCircle: function(){
    //open new circle
    Session.set('openCircleNew', true);
  },

  _handleDone: function(){
    // this.setState({open: false});
    Session.set('openCircleMenu', false);

    Meteor.call('removeMember', Session.get('circleMember'), function(){});
    $('input[name=circleTitle]:checked').map(function(){
      var member = {
        circleId: $(this).val(),
        memberId: Session.get('circleMember')
      };
      Meteor.call('addToCircle', member, function(){});
    }).get();
  },

  _selectedCircle: function(circleId){
    var state = {};
    state[circleId] = !this.state[circleId];
    this.setState(state);
    // var circleMember = {
    //   circleId: circleId,
    //   memberId: Session.get('circleMember')
    // };
    // Meteor.call('toggleMember', circleMember, function(){});
  },

  _handleCancel: function(){
    Session.set('openCircleMenu', false);
  },

  // getContent: function(){
  //   var styles = {};
  //
  //   {this.data.loading ? <Loading /> : this.getContent()}
  //
  //   return (
  //
  //   )
  // },

  render: function(){

    var styles = {
      circleMenuDialog: {
        zIndex: 189
      },
      circleTitle: {
        width: "calc(100% + 16px) !important"
      }
    };

    var actions = [
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={this._handleCancel} />,
      <FlatButton
        label="DONE"
        primary={true}
        onTouchTap={this._handleDone} />
    ];

    return (
      <Dialog
        modal={false}
        title="Your Circles"
        titleStyle={Styles.dialogTitle}
        actions={actions}
        style={styles.circleMenuDialog}
        bodyStyle={Styles.dialogBody}
        open={this.props.open} >
        <List>
          {
            this.props.circles.map(function(circle, i){
              return (
                <ListItem key={i}>
                  <Checkbox
                    checked={this.state[circle._id]}
                    label={circle.title}
                    name="circleTitle"
                    value={circle._id}
                    style={styles.circleTitle}
                    onCheck={this._selectedCircle.bind(this, circle._id)}
                    labelPosition='left' />
                </ListItem>
              )
            }, this)
          }
          <ListItem
            primaryText='Create a new circle'
            rightIcon={<FontIcon className="fa fa-plus" />}
            onTouchTap={this._handleNewCircle}
          />
        </List>
      </Dialog>
    )
  }
});



// if(this.state.open && this.data.loading){
//   return (
//     <Dialog
//       title="Your Circles"
//       open={this.state.open}>
//       <Loading />
//     </Dialog>
//   );
// }
