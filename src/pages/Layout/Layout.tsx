import * as S from './Layout.style'

interface Props {
  header?: { hide?: boolean; sticky?: boolean }
}
const Layout: React.FC<Props> = ({ header, children }) => {
  const { hide: hideHeader = false, sticky: stickyHeader = true } = header || {}

  return (
    <S.Layout>
      <S.Main>{children}</S.Main>
    </S.Layout>
  )
}

export default Layout
