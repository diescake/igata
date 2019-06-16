import React, { FC } from 'react'
import { EnhanceFooter, EnhanceFooterProps } from '@/app/helpers/EnhanceFooter'
import words from '@/assets/strings'

const WrappedFooter: FC<EnhanceFooterProps> = (props: EnhanceFooterProps) => {
  if (!props.copyright) {
    return null
  }

  // eslint-disable-next-line
  const handleAuthorClick = () => alert(words.footer.followMe(props.copyright!))

  return (
    <>
      <button type="button" onClick={handleAuthorClick}>
        {words.footer.author}
      </button>
      <a href={`${words.footer.twitterBaseUrl}/${props.copyright}`}>{props.copyright}</a>
    </>
  )
}

export const Footer = EnhanceFooter(WrappedFooter)
