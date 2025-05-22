import type { NavbarVerticalProps } from '..'

type Props = NavbarVerticalProps & {
  isCollapse: boolean
}

export default function NavSectionVertical({ navConfig, isCollapse }: Props) {
  return (
    <div>
      <h1>NavSectionVertical</h1>
      <p>This is the NavSectionVertical component.</p>
    </div>
  )
}
