export default defineAppConfig({
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'gray'
    },

    button: {
      slots: {
        base: ['font-jf-open font-bold']
      }
    },
    card: {
      slots: {
        root: 'rounded-lg px-4 py-8',
        header: 'p-2 sm:px-6 border-0 text-3xl',
        body: 'p-2 text-lg',
        footer: 'p-2 sm:px-6'
      },
      variants: {
        variant: {
          solid: {
            root: 'bg-inverted text-inverted'
          },
          outline: {
            root: 'bg-default ring ring-default divide-y divide-default'
          },
          soft: {
            root: 'bg-white'
          },
          subtle: {
            root: 'bg-elevated/50 ring ring-default divide-y divide-default'
          }
        }
      },
      defaultVariants: {
        variant: 'soft'
      }
    }
  }
});
