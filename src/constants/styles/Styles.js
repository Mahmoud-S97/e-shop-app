export const COLORS = {
  PRIMARY: '#0A1551',
  SECONDARY: 'rgba(218, 222, 243, 0.9)',
  BLACK: '#111111',
  WHITE: '#FFFFFF',
  GRAY: '#999999',
  LIGHT_GRAY: 'rgba(218, 222, 243, 0.3)',
  SILVER: '#bdc3c7',
  PINK: 'pink',
  GREEN: 'green',
  ORANGE: 'orange',
  BLUE: 'rgb(0, 153, 255)',
  GOLD: '#e1b12c'
};

export const GENERAL_STYLES = {
  scrollingView: {
    flexGrow: 1
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 70 // Based on the Main Header's Height!
  }
}