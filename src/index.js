import React from "react";
import PropTypes from "prop-types";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


class USAMap extends React.Component {

  

  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  stateClickHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
      return this.props.customize[state].clickHandler
    }
    return this.clickHandler;
  }

  buildPaths = () => {
    let paths = [];
    let dataStates = data();
    for (let stateKey in dataStates) {
        const path = (
          <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Tooltip with HTML</Typography>
              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
              {"It's very engaging. Right?"}
            </React.Fragment>
          }
        >
            <USAState key={stateKey} stateName={dataStates[stateKey].name} dimensions={dataStates[stateKey]["dimensions"]} state={stateKey} fill={this.fillStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} />
          </HtmlTooltip>
        )
        paths.push(path);
    };
    return paths;
  };

  render() {
    return (
      <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
        <g className="outlines">
          {this.buildPaths()}
          <g className="DC state">
            <path className="DC1" fill={this.fillStateColor("DC1")} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
            <circle className="DC2" onClick={this.clickHandler} data-name={"DC"} fill={this.fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1" />
          </g>
        </g>
      </svg>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  defaultFill: PropTypes.string,
  customize: PropTypes.object
};

USAMap.defaultProps = {
  onClick: () => {},
  width: 959,
  height: 593,
  defaultFill: "#D3D3D3",
  customize: {}
};

export default USAMap;
