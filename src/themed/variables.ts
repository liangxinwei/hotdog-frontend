// eslint-disable-next-line
const Red = '#C41A1D'
const Yellow = '#AD5B00'
const Green = '#00795C'
const DeepGray = 'rgba(6, 12, 25, 0.65)'

export const Color = {
  Black: 'rgba(6, 12, 25, 0.85)',
  DeepGray,
  Gray: 'rgba(6, 12, 25, 0.45)',
  LightGray: 'rgba(6, 12, 25, 0.25)',
  White: '#ffffff',

  Theme: '#447AE6',
  ElTheme: '#669FFF',
  Red,
  ElRed: '#F7585B',
  Yellow,
  ElYellow: '#FCA700',
  Green,
  ElGreen: '#16C89E',
  Danger: Red,
  Error: Red,
  Warning: Yellow,
  Pending: Yellow,
  Success: Green,
  Passed: Green,
  Disable: DeepGray,
  Cancel: DeepGray,
}

export const BackgroundColor = {
  Theme: '#477CFF',
  LightTheme: '#ECF4FF',
  DisableTheme: '#C3DAFF',
  DeepTheme: '#2C57E9',
  PressTheme: '#3958C2',
  Input: '#F6F8FA',
  Base: '#f3f4f8',
  Default: '#F0F1F5',
  Glass: '#F9FAFC',
  White: '#ffffff',
  Alert: 'rgba(50, 56, 66, .06)',
  Modal: 'rgba(50, 56, 66, .3)',
  Backdrop: 'rgba(50, 56, 66, .6)',
  LightYellow: '#FFF5E3',
  DeepYellow: '#E79900',
  LightRed: '#FDEFEF',
  DeepRed: '#D84244',
  LightGreen: '#E3F8F3',
  DeepGreen: '#009F78',
  LightGray: '#E4E6EB',
}

export const BorderColor = {
  Deep: 'rgba(6, 12, 25, 0.85)',
  Light: 'rgba(50, 56, 66, .06)',
  Regular: 'rgba(50, 56, 66, .08)',
  Box: '#D3D5D8',
}

export const ZIndex = {
  Background: -1,
  Zero: 0,
  Regular: 1,
  Popup: 11,
  FullScreen: 111,
  AntModal: 1000,
  Modal: 1111,

  // 操作确认框、小对话框等，可能从 modal 上弹出
  Prompt: 1200,
}

export const BorderWidth = {
  Light: '1px',
  Regular: '1px',
}

export const DividerColor = {
  Default: '#D8D8D8',
}

export const BorderRadius = {
  Default: '6px',
  Light: '4px',
}

export const FontSize = {
  Nav: '16px',
  Default: '13px',
  H1: '24px',
  H2: '18px',
  H3: '16px',
  H4: '14px',
  T1: '14px',
  T2: '13px',
  T3: '12px',
}

export const FontWeight = {
  Shallow: 300,
  Regular: 400,
  Medium: 500,
  Bold: 600,
  SuperBold: 700,
}

export const Border = {
  Default: '1px solid rgba(50,56,66,.06)',
  Deep: '1px solid rgba(50,56,66,.1)',
}

export const BoxShadow = {
  Default: '0 3px 16px 0 rgba(50, 56, 66, 0.04)',
}

export const Transition = {
  Default: '0.3s all ease-in-out',
}

export const H1 = `
  font-size: ${FontSize.H1};
  font-weight: ${FontWeight.Bold};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Black};
`

export const H2 = `
  font-size: ${FontSize.H2};
  font-weight: ${FontWeight.Bold};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Black};
`

export const H3 = `
  font-size: ${FontSize.H3};
  font-weight: ${FontWeight.Bold};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Black};
`

export const H4 = `
  font-size: ${FontSize.H4};
  font-weight: ${FontWeight.Bold};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Black};
`

export const T3 = `
  font-size: ${FontSize.T3};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Gray};
`

export const Tip = `
  font-size: ${FontSize.T2};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Gray};
`

export const T1 = `
  font-size: ${FontSize.T1};
  line-height: 1.5;
  margin-bottom: 0;
  color: ${Color.Black};
`

export const InputPlaceholder = `
  ::placeholder {
    color: ${Color.LightGray};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${Color.LightGray};
  }

  ::-ms-input-placeholder {
    color: ${Color.LightGray};
  }
`

/**
 * 无边框的输入框
 * 悬浮和获取焦点时出现边框
 */
export const InputBorderNone = `
/* stylelint-disable-next-line declaration-no-important */
  width: 100% !important;
/* stylelint-disable-next-line declaration-no-important */
  color: ${Color.Black} !important;
/* stylelint-disable-next-line declaration-no-important */
  border: 1px solid ${Color.White} !important;
/* stylelint-disable-next-line declaration-no-important */
  outline: none !important;
/* stylelint-disable-next-line declaration-no-important */
  transition: border-color .3s !important;
/* stylelint-disable-next-line declaration-no-important */
  line-height: 36px !important;
/* stylelint-disable-next-line declaration-no-important */
  padding: 3px 8px !important;
/* stylelint-disable-next-line declaration-no-important */
  border-radius: 4px !important;
/* stylelint-disable-next-line declaration-no-important */
  resize: none !important;

  &:hover, &:focus {
/* stylelint-disable-next-line declaration-no-important */
    border-color: ${Color.Gray} !important;
/* stylelint-disable-next-line declaration-no-important */
    box-shadow: none !important;
  }

  ${InputPlaceholder};
`
