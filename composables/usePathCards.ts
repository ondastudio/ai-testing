import iconProduct from '~/assets/svg/product-studio.svg'
import iconVenture  from '~/assets/svg/venture-studio.svg'

export interface PathCardData {
  id: 'product' | 'venture'
  icon: string
  thumb: string
  poster: string
  video: string
  headingHighlight: string  // part before the comma — highlighted on hover
  headingRest: string       // rest of the heading
  about: string
  whatWeDo: string
  outcomesLabel: string
  outcomesIntro: string
  outcomesList: string[]
  buttonLabel: string
  videoSide: 'left' | 'right' // position of video panel in expanded state
}

export function usePathCards() {
  const cards: PathCardData[] = [
    {
      id:               'product',
      icon:             iconProduct,
      thumb:            'https://www.figma.com/api/mcp/asset/3b858ba2-8246-4716-8dd2-4b794145d00c',
      poster:           'https://www.figma.com/api/mcp/asset/3b858ba2-8246-4716-8dd2-4b794145d00c',
      video:            'https://site-assets.subvisual.com/product-studio.mp4',
      headingHighlight: 'Product Studio',
      headingRest:      "Whatever you need, we'll build",
      about:            'A focused collaboration that can last for as long as the project needs us.',
      whatWeDo:         'Validate the business, test assumptions, and ship either a PoC or a finished product.',
      outcomesLabel:    'Outcomes',
      outcomesIntro:    'You leave with a repo, demo, architecture notes, a prioritized backlog, and a decision memo.',
      outcomesList:     ['Decision-ready plan', 'Working PoC', 'Clear next steps'],
      buttonLabel:      'Explore Product (Sandbox)',
      videoSide:        'right',
    },
    {
      id:               'venture',
      icon:             iconVenture,
      thumb:            'https://www.figma.com/api/mcp/asset/40f99106-7b13-46c9-a6fa-720674814546',
      poster:           'https://www.figma.com/api/mcp/asset/40f99106-7b13-46c9-a6fa-720674814546',
      video:            'https://site-assets.subvisual.com/venture-studio.mp4',
      headingHighlight: 'Venture Studio',
      headingRest:      'Bring the idea',
      about:            'Pitch us. We tailor capital, team, and equity to what moves fastest.',
      whatWeDo:         'We shape team, capital, and scope to move fastest. Founders first; corporates/newcos welcome.',
      outcomesLabel:    'Process and Outcomes',
      outcomesIntro:    'Pitch → Working session → Scope → Build & iterate → Raise/scale.',
      outcomesList:     ['Company-shaping support', 'Senior product & engineering', 'Access to our network'],
      buttonLabel:      'Explore Venture',
      videoSide:        'left',
    },
  ]

  return { cards }
}
