import styled from "styled-components";
import PileAreaContainer from "./containers/PileAreaContainer";

export const CompH5 = styled.h5`
  color: green;
  display: inline;
`;

export const PlayerH5 = styled.h5`
  color: purple;
  display: inline;
`;

export const TrumpH5 = styled.h5`
  color: red;
  display: inline;
`;

export const PileH3 = styled.h3`
  // color: #2e0854;
  // color: midnightblue;
  // color: black;
  display: inline;
`;

export const CompCont = styled.div`
  display: inline-flex;
  flex-direction: row;
  //   position: relative;
  // border: 2px solid palevioletred;
`;

export const PlayerCont = styled.div`
  display: inline-flex;
  flex-direction: row;
  // border: 2px solid palevioletred;
`;

export const AttackCont = styled.div`
  display: inline-flex;
  flex-direction: row;
  // border: 2px solid palevioletred;
`;

export const DefenseCont = styled.div`
  display: inline-flex;
  flex-direction: row;
  // border: 2px solid palevioletred;
`;

export const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 5em;
  height: 7em;
`;

export const Image = styled.img`
  width: 100%;
  float: left;
`;

export const TCard = styled.div`
  display: inline-block;
  position: left;
  width: 5em;
  height: 7em;
  transform: rotate(90deg);
`;

export const PCard = styled.div`
  display: inline-block;
  position: relative;
  width: 5em;
  height: 7em;
`;

export const PDiv = styled.div`
  position: relative;
  bottom: 115px;
  left: 29px;
`;

export const PileAreaDiv = styled.div`
  display: inline-block;
  position: fixed;
  //   top: 2:
  //   bottom: 20px
  // border: 2px solid palevioletred;
  height: 400px;
  width: 200px;
`;

export const PlayAreaDiv = styled.div`
  display: inline-block;
  position: relative;
  // border: 2px solid navy;
  height: 400px;
  width: 800px;
`;

export const GuidDiv = styled.div`
  display: inline-block;
  position: fixed;
  height: 300px;
  width: 200px;
  right: 1250px;
  //   bottom: 400px;
  border: 2px solid navy;
`;

export const CompAvaDiv = styled.div`
  display: inline-block;
  position: relative;
  right: 100px;
  border: 2px solid palevioletred;
`;

export const PlayerAvaDiv = styled.div`
  display: inline-block;
  position: relative;
  right: 100px;
  border: 2px solid palevioletred;
`;

export const PileAreaButton = styled.div`
  font-size: 0.9em;
  margin: 2em;
  padding: 0.4em;
  border: 2px solid navy;
  border-radius: 8px;
  background-color: LightBlue;
  color: Navy;
`;

export const NavButton = styled.button`
  font-size: 1em;
  margin: 2em;
  padding: 0.55em 3em;
  border: 2px solid navy;
  border-radius: 9px;
  background-color: LightBlue;
  color: Navy;
  position: relative;
  top: 11px;
`;

export const AppNameH1 = styled.h1`
  color: navy;
  display: inline;
  padding: 0.4em;
  font-size: 40px;
`;

export const AppNameDiv = styled.div`
  margin: 1em;
  padding: 1em;
  border: 2px solid sienna;
  border-radius: 8px;
  // background-color: LightSkyBlue;
  background-color: Lightcyan;
  color: navy;
  position: relative;
  bottom: 10px;
  right: 35px;
`;
