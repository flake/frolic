var {
  Card,
  CardText,
  RaisedButton,
  FontIcon,
  Avatar
} = MUI;

ProCard = React.createClass({
  propTypes: {
    user: React.PropTypes.object
  },
  getDefaultProps: function(){
    return {
      user: {}
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

  render: function(){

    var styles = {
      avatar: {
        top: "8px",
        left: "8px"
      },
      proCard: {
        textAlign: "center",
        paddingTop: "16px"
      },
      proText: {
        paddingTop: 0,
        paddingBottom: "8px"
      },
      proConnBtn: {
        height: "24px",
        minWidth: "80px",
        width: "80px",
        margin: "8px 0",
        borderRadius: "27px",
        backgroundColor: APP.primary
      },
      proConnIcon: {
        fontSize: "18px",
        color: "#fff",
        top: "3px"
      },
      proBtnLabel: {
        fontSize: "12px",
        padding: 0,
        paddingLeft: "2px"
      },
      proName: {
        fontWeight: "600",
        fontSize: "14px",
        color: "#444"
      },
      proLine: {
        fontWeight: "normal",
        fontSize: "12px",
        color: "#666"
      }
    };

    var avatar = (
      );

    return (
      <Card style={styles.proCard}>
        <Avatar
          src={""+this.props.user.avatar}
          size={56}
          style={styles.avatar}
        />
        <CardText style={styles.proText}>
          <div style={styles.proName}>
            {this.props.user.profile.name}
          </div>
          <div style={styles.proLine}>
            {this.props.user.profile.title}
          </div>

            <RaisedButton
              secondary={true}
              label="Circle"
              labelPosition="after"
              style={styles.proConnBtn}
              labelStyle={styles.proBtnLabel}
              className="pro-circle-btn">
              <FontIcon
                style={styles.proConnIcon}
                className="material-icons">person_add</FontIcon>
            </RaisedButton>

        </CardText>
      </Card>
    )
  }
});
