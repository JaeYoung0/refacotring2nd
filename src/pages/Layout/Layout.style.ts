import styled, { css } from 'styled-components'

export const Layout = styled.div`
  position: relative;
  display: flex;
  flex-flow: wrap column;
  min-height: 100vh;
  ${({ theme }) =>
    theme.desktop &&
    css`
      min-width: 1200px;
    `}
  ${({ theme }) =>
    (theme.tablet || theme.mobile) &&
    css`
      width: 100vw;
    `}
`

export const Main = styled.main`
  position: relative;
  width: 100%;
  flex-grow: 1;
`
