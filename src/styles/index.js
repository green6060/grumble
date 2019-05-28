// === This will contain both the JSS and the Styled Components with a global context ===\\
// === Using styled components because you cant ...spread two JSS files together and still have theme available === \\
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import colors from '../variables/colors'

export default theme => ({
  searchForm: {
    margin: '0px calc(50% - 300px)',
    marginTop: 60,
    '& .search-field': {

    }
  },

  foodTypeButton: {
    cursor: 'pointer',
    border: `1px solid #fff`,
    padding: '8px 12px',
    backgroundColor: theme.palette.secondary.light1,
    transition: 'background-color 0.2s',

    '&:hover': {
      backgroundColor: theme.palette.secondary.light2
    },

    '&.selected': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main
    }
  },

  scrollY: {
    overflowY: 'scroll'
  },

  scrollX: {
    overflowX: 'scroll'
  },

  tabsContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: 'none'
  },

  horizontalRadio: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  horizontalList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  hideOnSmallDown: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  hideOnSmallUp: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },

  whiteTextChildren: {
    '& *': {
      color: '#fff'
    }
  },

  whiteText: {
    color: '#fff'
  },

  greenText: {
    color: theme.palette.green.main
  },

  redText: {
    color: theme.palette.error.main
  },

  redLightText: {
    color: theme.palette.error.light
  },

  font32: {
    fontSize: 32
  },

  fontCenter: {
    textAlign: 'center'
  },

  imgContainer: {
    width: '100%',
    maxWidth: 200,

    '& > img': {
      width: '100%',
      height: 'auto'
    }
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  reactQuill: {
    marginTop: theme.spacing,
    minHeight: 200,

    '& .ql-container': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4
    },

    '& .ql-toolbar': {
      backgroundColor: theme.palette.secondary.light1,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4
    },

    '& .ql-container, & .ql-editor': {
      minHeight: 200
    }
  },

  cursorPointer: {
    cursor: 'pointer'
  },

  displayFlex: {
    display: 'flex',
    flexDirection: 'row'
  },

  vertCenter: {
    alignItems: 'center'
  },

  horizontalCenter: {
    justifyContent: 'center'
  },

  // Grid
  gridNoNegativeMargin: {
    margin: 0
  },

  firstOnSmallDown: {
    [theme.breakpoints.down('sm')]: {
      order: -1
    }
  },

  // Spacing and Sizing
  smallInput: {
    minWidth: 24,

    '& > div': {
      marginTop: 0
    },

    '& input': {
      padding: 4
    }
  },

  halfHeight: {
    height: '50%'
  },

  fullHeight: {
    height: '100%'
  },

  heightAuto: {
    height: 'auto'
  },

  noHeight: {
    height: 0
  },

  halfWidth: {
    width: '50%'
  },

  fullWidth: {
    width: '100%'
  },

  fullMaxWidth: {
    maxWidth: '100%'
  },

  halfMaxWidth: {
    maxWidth: '50%'
  },

  noMaxWidth: {
    maxWidth: 'none'
  },

  fullMinWidth: {
    minWidth: '100%'
  },

  halfMinWidth: {
    minWidth: '50%'
  },

  noMinWidth: {
    minWidth: 'none'
  },

  minWidth25: {
    minWidth: 25
  },

  minWidth50: {
    minWidth: 50
  },

  minWidth100: {
    minWidth: 100
  },

  minWidth200: {
    minWidth: 200
  },

  minWidth300: {
    minWidth: 300
  },

  minWidth400: {
    minWidth: 400
  },

  maxWidth25: {
    maxWidth: 25
  },

  maxWidth50: {
    maxWidth: 50
  },

  maxWidth100: {
    maxWidth: 100
  },

  maxWidth200: {
    maxWidth: 200
  },

  maxWidth300: {
    maxWidth: 300
  },

  maxWidth400: {
    maxWidth: 400
  },

  width25: {
    width: 25
  },

  width50: {
    width: 50
  },

  width100: {
    width: 100
  },

  width150: {
    width: 150
  },

  width200: {
    width: 200
  },

  width300: {
    width: 300
  },

  width400: {
    width: 400
  },

  noMargin: {
    margin: 0
  },

  noMarginTop: {
    marginTop: 0
  },

  noMarginRight: {
    marginRight: 0
  },

  noMarginBottom: {
    marginBottom: 0
  },

  noMarginLeft: {
    marginLeft: 0
  },

  margin1: {
    margin: theme.spacing
  },

  margin2: {
    margin: theme.spacing * 2
  },

  margin3: {
    margin: theme.spacing * 3
  },

  margin4: {
    margin: theme.spacing * 4
  },

  marginTop1: {
    marginTop: theme.spacing
  },

  marginTop2: {
    marginTop: theme.spacing * 2
  },

  marginTop3: {
    marginTop: theme.spacing * 3
  },

  marginTop4: {
    marginTop: theme.spacing * 4
  },

  marginTop5: {
    marginTop: theme.spacing * 5
  },

  marginRight1: {
    marginRight: theme.spacing
  },

  marginRight2: {
    marginRight: theme.spacing * 2
  },

  marginRight3: {
    marginRight: theme.spacing * 3
  },

  marginRight4: {
    marginRight: theme.spacing * 4
  },

  marginBottom1: {
    marginBottom: theme.spacing
  },

  marginBottom2: {
    marginBottom: theme.spacing * 2
  },

  marginBottom3: {
    marginBottom: theme.spacing * 3
  },

  marginBottom4: {
    marginBottom: theme.spacing * 4
  },

  marginLeft1: {
    marginLeft: theme.spacing
  },

  marginLeft2: {
    marginLeft: theme.spacing * 2
  },

  marginLeft3: {
    marginLeft: theme.spacing * 3
  },

  marginLeft4: {
    marginLeft: theme.spacing * 4
  },

  marginTopBottom1: {
    marginTop: theme.spacing,
    marginBottom: theme.spacing
  },

  marginTopBottom2: {
    marginTop: theme.spacing * 2,
    marginBottom: theme.spacing * 2
  },

  marginTopBottom3: {
    marginTop: theme.spacing * 3,
    marginBottom: theme.spacing * 3
  },

  marginTopBottom4: {
    marginTop: theme.spacing * 4,
    marginBottom: theme.spacing * 4
  },

  marginLeftRight1: {
    marginLeft: theme.spacing,
    marginRight: theme.spacing
  },

  marginLeftRight2: {
    marginLeft: theme.spacing * 2,
    marginRight: theme.spacing * 2
  },

  marginLeftRight3: {
    marginLeft: theme.spacing * 3,
    marginRight: theme.spacing * 3
  },

  marginLeftRight4: {
    marginLeft: theme.spacing * 4,
    marginRight: theme.spacing * 4
  },

  noPadding: {
    padding: 0
  },

  noPaddingTop: {
    paddingTop: 0
  },

  noPaddingRight: {
    paddingRight: 0
  },

  noPaddingBottom: {
    paddingBottom: 0
  },

  noPaddingLeft: {
    paddingLeft: 0
  },

  padding1: {
    padding: theme.spacing
  },

  padding2: {
    padding: theme.spacing * 2
  },

  padding3: {
    padding: theme.spacing * 3
  },

  padding4: {
    padding: theme.spacing * 4
  },

  paddingTop1: {
    paddingTop: theme.spacing
  },

  paddingTop2: {
    paddingTop: theme.spacing * 2
  },

  paddingTop3: {
    paddingTop: theme.spacing * 3
  },

  paddingTop4: {
    paddingTop: theme.spacing * 4
  },

  paddingRight1: {
    paddingRight: theme.spacing
  },

  paddingRight2: {
    paddingRight: theme.spacing * 2
  },

  paddingRight3: {
    paddingRight: theme.spacing * 3
  },

  paddingRight4: {
    paddingRight: theme.spacing * 4
  },

  paddingBottom1: {
    paddingBottom: theme.spacing
  },

  paddingBottom2: {
    paddingBottom: theme.spacing * 2
  },

  paddingBottom3: {
    paddingBottom: theme.spacing * 3
  },

  paddingBottom4: {
    paddingBottom: theme.spacing * 4
  },

  paddingLeft1: {
    paddingLeft: theme.spacing
  },

  paddingLeft2: {
    paddingLeft: theme.spacing * 2
  },

  paddingLeft3: {
    paddingLeft: theme.spacing * 3
  },

  paddingLeft4: {
    paddingLeft: theme.spacing * 4
  },

  paddingTopBottom1: {
    paddingTop: theme.spacing,
    paddingBottom: theme.spacing
  },

  paddingTopBottom2: {
    paddingTop: theme.spacing * 2,
    paddingBottom: theme.spacing * 2
  },

  paddingTopBottom3: {
    paddingTop: theme.spacing * 3,
    paddingBottom: theme.spacing * 3
  },

  paddingTopBottom4: {
    paddingTop: theme.spacing * 4,
    paddingBottom: theme.spacing * 4
  },

  paddingLeftRight1: {
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing
  },

  paddingLeftRight2: {
    paddingLeft: theme.spacing * 2,
    paddingRight: theme.spacing * 2
  },

  paddingLeftRight3: {
    paddingLeft: theme.spacing * 3,
    paddingRight: theme.spacing * 3
  },

  paddingLeftRight4: {
    paddingLeft: theme.spacing * 4,
    paddingRight: theme.spacing * 4
  },

  // Coloring
  greenButton: {
    backgroundColor: theme.palette.green.main,
    color: '#fff',

    '&:hover': {
      backgroundColor: theme.palette.green.dark
    }
  },

  redButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',

    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },

  grayCard: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 8,
    overflow: 'hidden',
    transition: 'box-shadow 0.2s'
  },

  blueCard: {
    position: 'relative',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    overflow: 'hidden'
  },

  darkBG: {
    backgroundColor: colors.secondaryDark3
  },

  whiteBG: {
    backgroundColor: '#fff'
  },

  darkerGrayBG: {
    backgroundColor: '#EBEAE9'
  },

  grayBG: {
    backgroundColor: theme.palette.secondary.light
  },

  greenBG: {
    backgroundColor: theme.palette.green.main
  },

  redBG: {
    backgroundColor: theme.palette.error.main
  },

  redLightBG: {
    backgroundColor: theme.palette.error.light
  },

  // Cards
  linkCard: {
    cursor: 'pointer',

    '&:hover': {
      boxShadow: theme.shadows[8]
    }
  },

  cardSelect: {
    position: 'absolute',
    top: 8,
    left: 4
  },

  cardMore: {
    position: 'absolute',
    top: -2,
    right: 8,
    cursor: 'pointer',
    fontSize: 32
  },

  cardClose: {
    position: 'absolute',
    top: 0,
    right: 0
  },

  cardEdit: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.light,

    '&::-webkit-scrollbar': {
      width: 4
    },

    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#888'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  },

  cardEditOpen: {
    display: 'initial'
  }
})

export const RedButton = styled(Button)`
  &&{
    color: #fff;
    background-color: ${colors.red};
    &:hover {
      background-color: ${colors.redDark};
    }
  }
`

export const GreenButton = styled(Button)`
  &&{
    color: #fff;
    background-color: ${colors.green};
    &:hover {
      background-color: ${colors.greenDark};
    }
  }
`

export const FlexVerticalCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`
