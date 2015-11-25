// var { IconButton } = MUI;
//
// var styles = {
//   navIcon: {
//     color: "#fff"
//   }
// };
//
// homeNav = (
//   <div zDepth={0}>
//     <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id="frolic-search">search</IconButton>
//     <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id="frolic-notify">notifications</IconButton>
//     <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id="frolic-videocam">videocam</IconButton>
//     <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id="navicon-right">menu</IconButton>
//   </div>
// );

//
// IconElemRight = React.createClass({
//   PropTypes : {
//     maticons : React.PropTypes.Array,
//     navIds : React.PropTypes.Array
//   },
//
//   getDefaultProps: function(){
//     return {
//       maticons: ['search', 'notifications', 'videocam'],
//       navIds: ['nav-search', 'nav-notify', 'nav-videocam']
//     };
//   },
//
//   //IMPORTANT SET CHILD CONTEXT
//   childContextTypes: {
//     muiTheme: React.PropTypes.object
//   },
//   getChildContext: function(){
//     return {
//       muiTheme: newTheme //Manager.getMuiTheme(MUI.Styles.LightRawTheme)
//     };
//   },
//   getInitialState: function(){
//     return { };
//   },
//
//   render: function(){
//     var styles = {
//       navIcon: {
//         color: "#fff"
//       }
//     };
//
//     return (
//       <div zDepth={0}>
//         <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id={this.props.navIds[0]}>{this.props.maticons[0]}</IconButton>
//         <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id={this.props.navIds[1]}>{this.props.maticons[1]}</IconButton>
//         <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id={this.props.navIds[2]}>{this.props.maticons[2]}</IconButton>
//         <IconButton iconClassName="material-icons" iconStyle={ styles.navIcon } id="navicon-right">menu</IconButton>
//       </div>
//     )
//   }
// });
