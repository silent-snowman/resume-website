import React, {Fragment, Component} from 'react'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from "@material-ui/core/styles";
import LoadingSpinner from './LoadingSpinner.jsx'

const styles = theme => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    marginBottom: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(2),
  },
  headerIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    fontSize: 36,
  },
  headerText: {
    color: theme.palette.text.primary,
    fontSize: 30,
  },
  content: {
    padding: theme.spacing(2, 5, 0, 5),
  },
  dateIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  dateRange: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  degree: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  degreeDivider: {
    margin: theme.spacing(2, 0, 2, 0),
  },
});

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false,
      credentials: []
    };
  }

  componentDidMount() {
    fetch("json/education.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loaded: true,
            credentials: result
          });
        },
        (error) => {
          this.setState({
            loaded: true,
            error: error.message
          });
        }
      )
  }

  render() {
    const { error, loaded, credentials } = this.state;
    var renderedEducation = <LoadingSpinner />;

    if (error) {
      renderedEducation = <Box>Error: {error}</Box>;
    } else if (loaded) {
      renderedEducation = credentials.map((credential, index) => (
        <Credential key={index} info={credential} isLast={index == credentials.length - 1} classes={this.props.classes} />
      ));
    }

    return (
      <Box className={this.props.classes.container}>
        <Box className={this.props.classes.header}>
          <Typography className={this.props.classes.headerText}>
            <FontAwesomeIcon className={this.props.classes.headerIcon} icon={faGraduationCap} />Education
          </Typography>
        </Box>
        <Box className={this.props.classes.content}>
          {renderedEducation}
        </Box>
      </Box>
    );
  }
}

class Credential extends Component {
  render() {
    return (
      <Box>
        <Typography variant="h5">{this.props.info.institution}</Typography>
        <Typography variant="body1" className={this.props.classes.dateRange}>
          <FontAwesomeIcon className={this.props.classes.dateIcon} icon={faCalendarAlt} />{this.props.info.startDate} - {this.props.info.endDate}
        </Typography>
        <Typography className={this.props.classes.degree}>{this.props.info.degree}</Typography>
        {!this.props.isLast ? <Divider className={this.props.classes.degreeDivider} /> : <Fragment />}
      </Box>
    );
  }
}

export default withStyles(styles)(Education);
