import type { Theme } from '@mui/material/styles'

import { accordionClasses } from '@mui/material/Accordion'
import { typographyClasses } from '@mui/material/Typography'
import { accordionSummaryClasses } from '@mui/material/AccordionSummary'

export function accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          [`&.${accordionClasses.expanded}`]: {
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
          },
          [`&.${accordionClasses.disabled}`]: {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          [`&.${accordionSummaryClasses.disabled}`]: {
            opacity: 1,
            color: theme.palette.action.disabled,
            [`& .${typographyClasses.root}`]: {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  }
}
