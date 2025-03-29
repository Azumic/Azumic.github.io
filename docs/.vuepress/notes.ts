import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const packLifey = defineNoteConfig({
  dir: 'packlifey',
  link: '/packlifey',
  sidebar: [
    {
      text: '主殿',
      collapsed: false,
      icon: 'carbon:idea',
      items: [
        '止步于此',
        '步入正堂',
      ],
    },
    {
      text: '浩瀚汲取',
      collapsed: false,
      icon: 'carbon:idea',
      prefix: 'modpacky',
      items: 'auto',
    },
  ]
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [packLifey],
})


