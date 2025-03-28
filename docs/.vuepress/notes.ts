import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const modpackNotes = defineNoteConfig({
  dir: 'modpacks',
  link: '/modpacks',
  sidebar: [
    {
      text: '新手入门',
      collapsed: false,
      icon: 'carbon:idea',
      items: [
        '简介',
      ],
    }
  ]
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [modpackNotes],
})


